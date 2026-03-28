import { randomUUID } from 'node:crypto';

import { Router } from 'express';
import { z } from 'zod';

import { pool } from '../db/pool.js';
import { requireAuth } from '../middleware/auth.js';
import { aiLimiter } from '../middleware/rateLimit.js';
import {
    correctStudentWork,
    generateChapterSummary,
    generateExercise,
    generateSimulationSubject,
    streamTutorResponse,
} from '../services/claude.service.js';
import { asyncHandler } from '../utils/helpers.js';
import { validateBody } from '../utils/validators.js';

const router = Router();

function isApiCreditError(error) {
    return error?.status === 400 && (
        error?.error?.error?.message?.toLowerCase().includes('credit') ||
        error?.error?.error?.message?.toLowerCase().includes('balance')
    );
}

function handleAiError(error, res) {
    if (error?.status === 401 || error?.status === 403 || isApiCreditError(error)) {
        return res.status(503).json({ message: "Service IA indisponible — solde Anthropic insuffisant. Rechargez le compte sur console.anthropic.com." });
    }
    if (error?.status === 429) {
        return res.status(429).json({ message: "Trop de requêtes IA — réessaie dans quelques secondes." });
    }
    return null;
}

const chatSchema = z.object({
    message: z.string().min(1).max(5000),
    session_id: z.string().uuid().optional().nullable(),
    subject_id: z.string().uuid().optional().nullable(),
    chapter_id: z.string().uuid().optional().nullable(),
});

const generateExerciseSchema = z.object({
    subject_id: z.string().uuid(),
    chapter_id: z.string().uuid(),
    difficulty: z.number().int().min(1).max(5),
    type: z.string().min(2).max(30),
});

const summarySchema = z.object({
    chapter_id: z.string().uuid(),
});

const correctPhotoSchema = z.object({
    image_base64: z.string().min(20),
    media_type: z.string().min(5),
    subject_id: z.string().uuid().optional().nullable(),
});

const simulateSchema = z.object({
    subject_id: z.string().uuid(),
});

router.post(
    '/chat',
    requireAuth,
    aiLimiter,
    validateBody(chatSchema),
    asyncHandler(async (req, res) => {
        const { message, session_id: sessionIdInput, subject_id: subjectId, chapter_id: chapterId } = req.validatedBody;

        let sessionId = sessionIdInput;
        let sessionRecord;

        if (sessionId) {
            const existing = await pool.query('SELECT * FROM ai_sessions WHERE id = $1 AND user_id = $2', [sessionId, req.user.id]);
            sessionRecord = existing.rows[0] ?? null;
        }

        if (!sessionRecord) {
            sessionId = randomUUID();
            sessionRecord = {
                id: sessionId,
                messages: [],
                total_tokens_used: 0,
            };
            await pool.query(
                `
                    INSERT INTO ai_sessions (id, user_id, subject_id, chapter_id, messages, total_tokens_used)
                    VALUES ($1, $2, $3, $4, '[]'::jsonb, 0)
                `,
                [sessionId, req.user.id, subjectId, chapterId],
            );
        }

        const [subjectResult, chapterResult] = await Promise.all([
            subjectId ? pool.query('SELECT * FROM subjects WHERE id = $1', [subjectId]) : Promise.resolve({ rows: [] }),
            chapterId ? pool.query('SELECT * FROM chapters WHERE id = $1', [chapterId]) : Promise.resolve({ rows: [] }),
        ]);

        const history = Array.isArray(sessionRecord.messages) ? sessionRecord.messages.slice(-10) : [];
        const fullHistory = [...history, { role: 'user', content: message }];

        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');

        let assistantMessage = '';

        const result = await streamTutorResponse(
            message,
            history,
            {
                user: req.user,
                subject: subjectResult.rows[0] ?? null,
                chapter: chapterResult.rows[0] ?? null,
            },
            (text) => {
                assistantMessage += text;
                res.write(`data: ${JSON.stringify({ text })}\n\n`);
            },
        );

        const messagesToSave = [...fullHistory, { role: 'assistant', content: assistantMessage }];

        await pool.query(
            `
                UPDATE ai_sessions
                SET messages = $1::jsonb,
                    total_tokens_used = COALESCE(total_tokens_used, 0) + $2 + $3,
                    subject_id = COALESCE($4, subject_id),
                    chapter_id = COALESCE($5, chapter_id),
                    last_message_at = NOW()
                WHERE id = $6
            `,
            [JSON.stringify(messagesToSave.slice(-20)), result.inputTokens, result.outputTokens, subjectId, chapterId, sessionId],
        );

        await pool.query('UPDATE users SET total_points = total_points + 2, updated_at = NOW() WHERE id = $1', [req.user.id]);

        res.write(`data: ${JSON.stringify({ done: true, session_id: sessionId })}\n\n`);
        res.end();
    }),
);

router.post(
    '/generate-exercise',
    requireAuth,
    aiLimiter,
    validateBody(generateExerciseSchema),
    asyncHandler(async (req, res) => {
        const { subject_id: subjectId, chapter_id: chapterId, difficulty, type } = req.validatedBody;

        const [subjectResult, chapterResult] = await Promise.all([
            pool.query('SELECT * FROM subjects WHERE id = $1', [subjectId]),
            pool.query('SELECT * FROM chapters WHERE id = $1', [chapterId]),
        ]);

        if (subjectResult.rowCount === 0 || chapterResult.rowCount === 0) {
            return res.status(404).json({ message: 'Sujet ou chapitre introuvable' });
        }

        let exercise;
        try {
            exercise = await generateExercise(chapterResult.rows[0], difficulty, type);
        } catch (error) {
            if (handleAiError(error, res)) return;
            // Fallback DB : retourner un exercice existant du même chapitre
            const existing = await pool.query(
                `SELECT * FROM exercises WHERE chapter_id = $1 AND is_published = true ORDER BY RANDOM() LIMIT 1`,
                [chapterId],
            );
            if (existing.rowCount > 0) return res.json(existing.rows[0]);
            throw error;
        }
        const inserted = await pool.query(
            `
                INSERT INTO exercises (
                    id, chapter_id, subject_id, type, difficulty, title, question_text, options, correct_answer,
                    explanation, hints, estimated_time_minutes, points, ai_generated, created_by, is_published, created_at
                ) VALUES (
                    $1, $2, $3, $4, $5, $6, $7, $8::jsonb, $9, $10, $11::jsonb, $12, $13, true, $14, true, NOW()
                )
                RETURNING *
            `,
            [
                randomUUID(),
                chapterId,
                subjectId,
                type,
                difficulty,
                exercise.title,
                exercise.question_text,
                JSON.stringify(exercise.options),
                exercise.correct_answer,
                exercise.explanation,
                JSON.stringify(exercise.hints),
                exercise.estimated_time_minutes,
                exercise.points,
                req.user.id,
            ],
        );

        res.json(inserted.rows[0]);
    }),
);

router.post(
    '/summary',
    requireAuth,
    aiLimiter,
    validateBody(summarySchema),
    asyncHandler(async (req, res) => {
        const chapterResult = await pool.query(
            `
                SELECT c.*, s.name AS subject_name, s.serie_code
                FROM chapters c
                JOIN subjects s ON s.id = c.subject_id
                WHERE c.id = $1
            `,
            [req.validatedBody.chapter_id],
        );

        if (chapterResult.rowCount === 0) {
            return res.status(404).json({ message: 'Chapitre introuvable' });
        }

        const row = chapterResult.rows[0];
        const summary = await generateChapterSummary(row, { name: row.subject_name, serie_code: row.serie_code });
        res.json({ summary });
    }),
);

router.post(
    '/correct-photo',
    requireAuth,
    aiLimiter,
    validateBody(correctPhotoSchema),
    asyncHandler(async (req, res) => {
        const { image_base64: imageBase64, media_type: mediaType, subject_id: subjectId } = req.validatedBody;

        const imageSizeBytes = Buffer.byteLength(imageBase64, 'base64');
        if (imageSizeBytes > 5 * 1024 * 1024) {
            return res.status(400).json({ message: 'Image trop volumineuse (max 5MB)' });
        }

        if (!req.user.is_premium) {
            const usageResult = await pool.query(
                `
                    SELECT COUNT(*)::int AS daily_count
                    FROM ai_sessions
                    WHERE user_id = $1
                      AND created_at::date = CURRENT_DATE
                `,
                [req.user.id],
            );

            if ((usageResult.rows[0]?.daily_count ?? 0) >= 3) {
                return res.status(403).json({ message: 'Correction photo réservée au premium après 3 essais gratuits par jour' });
            }
        }

        const subjectResult = subjectId ? await pool.query('SELECT * FROM subjects WHERE id = $1', [subjectId]) : { rows: [] };
        try {
            const result = await correctStudentWork(imageBase64, mediaType, subjectResult.rows[0] ?? null);
            res.json(result);
        } catch (error) {
            if (handleAiError(error, res)) return;
            throw error;
        }
    }),
);

router.post(
    '/simulate',
    requireAuth,
    aiLimiter,
    validateBody(simulateSchema),
    asyncHandler(async (req, res) => {
        if (!req.user.is_premium) {
            return res.status(403).json({ message: 'Simulation complète réservée aux utilisateurs premium' });
        }

        const subjectResult = await pool.query('SELECT * FROM subjects WHERE id = $1', [req.validatedBody.subject_id]);

        if (subjectResult.rowCount === 0) {
            return res.status(404).json({ message: 'Matière introuvable' });
        }

        const subject = subjectResult.rows[0];
        try {
            const simulation = await generateSimulationSubject(subject, req.user.serie_code, new Date().getFullYear());
            res.json(simulation);
        } catch (error) {
            if (handleAiError(error, res)) return;
            throw error;
        }
    }),
);

export default router;
