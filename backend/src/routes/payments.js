import { randomUUID, createHmac } from 'node:crypto';

import { Router } from 'express';
import { z } from 'zod';

import { pool } from '../db/pool.js';
import { requireAuth } from '../middleware/auth.js';
import { asyncHandler } from '../utils/helpers.js';
import { validateBody } from '../utils/validators.js';

const router = Router();

const PLANS = {
    '1month':  { label: '1 mois',  amount: 1500, days: 30 },
    '3months': { label: '3 mois',  amount: 3500, days: 90 },
    '1year':   { label: '1 an',    amount: 5000, days: 365 },
};

const initiateSchema = z.object({
    plan:     z.enum(['1month', '3months', '1year']),
    provider: z.enum(['wave', 'orange_money']),
    phone:    z.string().min(9).max(15).optional(),
});

router.post(
    '/initiate',
    requireAuth,
    validateBody(initiateSchema),
    asyncHandler(async (req, res) => {
        const { plan, provider, phone } = req.validatedBody;
        const planInfo = PLANS[plan];
        const paymentId = randomUUID();

        await pool.query(
            "INSERT INTO payments (id, user_id, provider, amount, currency, status, metadata) VALUES ($1, $2, $3, $4, 'XOF', 'pending', $5::jsonb)",
            [paymentId, req.user.id, provider, planInfo.amount, JSON.stringify({ plan, days: planInfo.days, phone: phone ?? null })],
        );

        if (provider === 'wave') {
            const waveApiKey = process.env.WAVE_API_KEY;
            if (waveApiKey && !waveApiKey.includes('OPTIONNEL')) {
                try {
                    const waveRes = await fetch('https://api.wave.com/v1/checkout/sessions', {
                        method: 'POST',
                        headers: { Authorization: `Bearer ${waveApiKey}`, 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            amount: planInfo.amount, currency: 'XOF',
                            error_url: `${process.env.FRONTEND_URL}/bac/premium?status=error`,
                            success_url: `${process.env.FRONTEND_URL}/bac/premium?status=success&payment_id=${paymentId}`,
                            client_reference: paymentId,
                        }),
                    });
                    if (waveRes.ok) {
                        const waveData = await waveRes.json();
                        await pool.query('UPDATE payments SET provider_reference = $1 WHERE id = $2', [waveData.id, paymentId]);
                        return res.json({ payment_id: paymentId, provider: 'wave', wave_launch_url: waveData.wave_launch_url, amount: planInfo.amount, plan: planInfo.label });
                    }
                } catch (_e) { /* Fallback démo */ }
            }
            return res.json({
                payment_id: paymentId, provider: 'wave',
                wave_launch_url: `wave://pay?amount=${planInfo.amount}&merchant=BacSenegalIA&ref=${paymentId}`,
                demo_mode: true, message: 'Mode démo — configurez WAVE_API_KEY pour activer Wave',
                amount: planInfo.amount, plan: planInfo.label,
            });
        }

        if (provider === 'orange_money') {
            if (!phone) return res.status(400).json({ message: 'Numéro de téléphone requis pour Orange Money' });
            const omCode = process.env.ORANGE_MONEY_MERCHANT_CODE;
            return res.json({
                payment_id: paymentId, provider: 'orange_money',
                ussd_code: `*144*4*${omCode ?? '123456'}*${planInfo.amount}#`,
                instructions: [
                    `Composez *144*4*${omCode ?? '123456'}*${planInfo.amount}# sur votre téléphone`,
                    'Entrez votre PIN Orange Money',
                    `Confirmez le paiement de ${planInfo.amount} XOF a BAC Senegal IA`,
                    'Votre acces Premium sera active dans les 5 minutes',
                ],
                amount: planInfo.amount, plan: planInfo.label, reference: paymentId, demo_mode: !omCode,
            });
        }

        return res.status(400).json({ message: 'Fournisseur non supporte' });
    }),
);

router.post(
    '/webhook/wave',
    asyncHandler(async (req, res) => {
        const waveApiKey = process.env.WAVE_API_KEY;
        const signature = req.headers['wave-signature'];
        if (waveApiKey && signature) {
            const expected = createHmac('sha256', waveApiKey).update(JSON.stringify(req.body)).digest('hex');
            if (signature !== expected) return res.status(401).json({ message: 'Signature invalide' });
        }
        const { client_reference: paymentId, payment_status } = req.body;
        if (!paymentId) return res.status(400).json({ message: 'Reference paiement manquante' });
        if (payment_status === 'succeeded') { await activatePremium(paymentId); }
        else if (payment_status === 'failed' || payment_status === 'cancelled') {
            await pool.query("UPDATE payments SET status = 'failed' WHERE id = $1", [paymentId]);
        }
        return res.json({ received: true });
    }),
);

router.post(
    '/confirm/:id',
    requireAuth,
    asyncHandler(async (req, res) => {
        if (req.user.role !== 'admin' && process.env.NODE_ENV === 'production') {
            return res.status(403).json({ message: 'Confirmation manuelle non autorisee en production' });
        }
        const result = await activatePremium(req.params.id);
        return res.json(result);
    }),
);

router.get(
    '/history',
    requireAuth,
    asyncHandler(async (req, res) => {
        const result = await pool.query(
            'SELECT id, provider, amount, currency, status, metadata, created_at, confirmed_at FROM payments WHERE user_id = $1 ORDER BY created_at DESC LIMIT 20',
            [req.user.id],
        );
        return res.json(result.rows);
    }),
);

router.get(
    '/status/:id',
    requireAuth,
    asyncHandler(async (req, res) => {
        const r = await pool.query(
            'SELECT id, provider, amount, status, created_at, confirmed_at FROM payments WHERE id = $1 AND user_id = $2',
            [req.params.id, req.user.id],
        );
        if (r.rowCount === 0) return res.status(404).json({ message: 'Paiement introuvable' });
        return res.json(r.rows[0]);
    }),
);

async function activatePremium(paymentId) {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const pr = await client.query("SELECT * FROM payments WHERE id = $1 AND status != 'completed'", [paymentId]);
        if (pr.rowCount === 0) return { success: false, message: 'Paiement introuvable ou deja traite' };
        const payment = pr.rows[0];
        const daysToAdd = (payment.metadata ?? {}).days ?? 30;
        await client.query("UPDATE payments SET status = 'completed', confirmed_at = NOW() WHERE id = $1", [paymentId]);
        await client.query(
            "UPDATE users SET is_premium = true, premium_expires_at = GREATEST(COALESCE(premium_expires_at, NOW()), NOW()) + ($1 || ' days')::interval, updated_at = NOW() WHERE id = $2",
            [String(daysToAdd), payment.user_id],
        );
        await client.query('COMMIT');
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + daysToAdd);
        return { success: true, premium_expires_at: expiresAt.toISOString(), days_added: daysToAdd };
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
}

export default router;
