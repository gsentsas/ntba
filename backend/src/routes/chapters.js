import { Router } from 'express';

import { pool } from '../db/pool.js';
import { requireAuth } from '../middleware/auth.js';
import { asyncHandler } from '../utils/helpers.js';

const router = Router();

router.get(
    '/',
    asyncHandler(async (req, res) => {
        const { subject_id: subjectId } = req.query;
        const params = [];
        let whereClause = 'WHERE c.is_published = true';

        if (subjectId) {
            params.push(subjectId);
            whereClause += ` AND c.subject_id = $${params.length}`;
        }

        const result = await pool.query(
            `
                SELECT
                    c.id,
                    c.subject_id,
                    c.title,
                    c.slug,
                    c.order_index,
                    c.summary,
                    c.key_formulas,
                    c.mnemonics,
                    c.is_published,
                    c.created_at,
                    s.name AS subject_name,
                    s.serie_code
                FROM chapters c
                JOIN subjects s ON s.id = c.subject_id
                ${whereClause}
                ORDER BY s.name, c.order_index, c.title
            `,
            params,
        );

        res.json(result.rows);
    }),
);

router.get(
    '/:id',
    asyncHandler(async (req, res) => {
        const result = await pool.query(
            `
                SELECT
                    c.id,
                    c.subject_id,
                    c.title,
                    c.slug,
                    c.order_index,
                    c.course_content,
                    c.summary,
                    c.key_formulas,
                    c.mnemonics,
                    c.is_published,
                    c.created_at,
                    s.name AS subject_name,
                    s.serie_code,
                    s.coefficient
                FROM chapters c
                JOIN subjects s ON s.id = c.subject_id
                WHERE c.id = $1
            `,
            [req.params.id],
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Chapitre introuvable' });
        }

        return res.json(result.rows[0]);
    }),
);

// PATCH /api/chapters/:id — admin seulement (mise à jour cours + résumé)
router.patch(
    '/:id',
    requireAuth,
    asyncHandler(async (req, res) => {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Accès réservé aux administrateurs' });
        }

        const { course_content, summary, key_formulas, mnemonics, is_published } = req.body;
        const updates = [];
        const params = [];

        if (course_content !== undefined) { params.push(course_content); updates.push(`course_content = $${params.length}`); }
        if (summary !== undefined) { params.push(summary); updates.push(`summary = $${params.length}`); }
        if (key_formulas !== undefined) { params.push(JSON.stringify(key_formulas)); updates.push(`key_formulas = $${params.length}::jsonb`); }
        if (mnemonics !== undefined) { params.push(JSON.stringify(mnemonics)); updates.push(`mnemonics = $${params.length}::jsonb`); }
        if (is_published !== undefined) { params.push(Boolean(is_published)); updates.push(`is_published = $${params.length}`); }

        if (updates.length === 0) {
            return res.status(400).json({ message: 'Aucune donnée à mettre à jour' });
        }

        params.push(req.params.id);
        const result = await pool.query(
            `UPDATE chapters SET ${updates.join(', ')} WHERE id = $${params.length} RETURNING id, title, course_content, summary, is_published`,
            params,
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Chapitre introuvable' });
        }

        return res.json(result.rows[0]);
    }),
);

export default router;
