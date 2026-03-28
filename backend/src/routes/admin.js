import { randomUUID } from 'node:crypto';

import { Router } from 'express';
import { z } from 'zod';

import { pool } from '../db/pool.js';
import { requireAdmin } from '../middleware/admin.js';
import { requireAuth } from '../middleware/auth.js';
import { getCache, setCache } from '../services/cache.service.js';
import { asyncHandler } from '../utils/helpers.js';
import { paginationSchema, validateBody } from '../utils/validators.js';

const router = Router();

const adminExerciseSchema = z.object({
    chapter_id: z.string().uuid(),
    subject_id: z.string().uuid(),
    type: z.enum(['qcm', 'calcul', 'dissertation', 'vrai_faux', 'oral']),
    difficulty: z.number().int().min(1).max(5),
    title: z.string().min(5).max(300),
    question_text: z.string().min(10),
    options: z.array(z.any()).optional().nullable(),
    correct_answer: z.string().min(1).optional().nullable(),
    explanation: z.string().min(10),
    hints: z.array(z.string()).default([]),
    is_annale: z.boolean().default(false),
    annale_year: z.number().int().optional().nullable(),
    annale_session: z.string().max(50).optional().nullable(),
    estimated_time_minutes: z.number().int().min(1).max(180).default(5),
    points: z.number().int().min(1).max(100).default(10),
});

const adminUserUpdateSchema = z.object({
    role: z.enum(['eleve', 'professeur', 'admin']).optional(),
    is_premium: z.boolean().optional(),
    premium_expires_at: z.string().datetime().optional().nullable(),
});

router.use(requireAuth, requireAdmin);

router.get(
    '/stats',
    asyncHandler(async (_req, res) => {
        const cacheKey = 'admin:stats';
        const cached = await getCache(cacheKey);

        if (cached) {
            return res.json(cached);
        }

        const [usersStats, exercisesStats, sessionsStats, revenueStats, seriesDistribution, hardestChapters, dailyActiveUsers] = await Promise.all([
            pool.query(
                `
                    SELECT
                        COUNT(*)::int AS total_users,
                        COUNT(*) FILTER (WHERE created_at::date = CURRENT_DATE)::int AS new_users_today,
                        COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '7 days')::int AS new_users_week,
                        COUNT(*) FILTER (WHERE is_premium = true)::int AS premium_users,
                        COUNT(*) FILTER (WHERE last_activity_date = CURRENT_DATE)::int AS active_today
                    FROM users
                `,
            ),
            pool.query(
                `
                    SELECT COUNT(*)::int AS total_exercises
                    FROM exercises
                    WHERE is_published = true
                `,
            ),
            pool.query(
                `
                    SELECT
                        COUNT(*)::int AS total_ai_sessions,
                        COALESCE(SUM(total_tokens_used), 0)::int AS total_ai_tokens
                    FROM ai_sessions
                `,
            ),
            pool.query(
                `
                    SELECT COALESCE(SUM(amount) FILTER (WHERE status = 'confirmed'), 0)::int AS premium_revenue_xof
                    FROM payments
                `,
            ),
            pool.query(
                `
                    SELECT
                        serie_code AS code,
                        COUNT(*)::int AS count,
                        ROUND(COUNT(*) * 100.0 / NULLIF((SELECT COUNT(*) FROM users), 0), 2) AS pct
                    FROM users
                    GROUP BY serie_code
                    ORDER BY count DESC
                `,
            ),
            pool.query(
                `
                    SELECT
                        c.title,
                        s.name AS subject,
                        ROUND((1 - AVG(CASE WHEN sp.is_correct THEN 1 ELSE 0 END)) * 100, 2) AS error_rate,
                        COUNT(*)::int AS attempts
                    FROM student_performances sp
                    JOIN chapters c ON c.id = sp.chapter_id
                    JOIN subjects s ON s.id = sp.subject_id
                    GROUP BY c.title, s.name
                    ORDER BY error_rate DESC NULLS LAST, attempts DESC
                    LIMIT 10
                `,
            ),
            pool.query(
                `
                    SELECT
                        completed_at::date AS date,
                        COUNT(DISTINCT user_id)::int AS count
                    FROM student_performances
                    WHERE completed_at >= CURRENT_DATE - INTERVAL '29 days'
                    GROUP BY completed_at::date
                    ORDER BY date
                `,
            ),
        ]);

        const payload = {
            ...usersStats.rows[0],
            ...exercisesStats.rows[0],
            ...sessionsStats.rows[0],
            ...revenueStats.rows[0],
            series_distribution: seriesDistribution.rows.map((row) => ({ ...row, pct: Number(row.pct) })),
            hardest_chapters: hardestChapters.rows.map((row) => ({ ...row, error_rate: Number(row.error_rate) })),
            daily_active_users: dailyActiveUsers.rows.map((row) => ({ ...row, count: Number(row.count) })),
        };

        await setCache(cacheKey, payload, 300);

        return res.json(payload);
    }),
);

router.get(
    '/users',
    asyncHandler(async (req, res) => {
        const page = Number(req.query.page ?? 1);
        const pagination = paginationSchema.parse({
            limit: req.query.limit ?? 20,
            offset: (page - 1) * Number(req.query.limit ?? 20),
        });

        const filters = [];
        const params = [];

        if (req.query.search) {
            params.push(`%${String(req.query.search)}%`);
            filters.push(`(email ILIKE $${params.length} OR prenom ILIKE $${params.length} OR nom ILIKE $${params.length})`);
        }

        if (req.query.serie) {
            params.push(req.query.serie);
            filters.push(`serie_code = $${params.length}`);
        }

        if (req.query.role) {
            params.push(req.query.role);
            filters.push(`role = $${params.length}`);
        }

        if (req.query.is_premium !== undefined) {
            params.push(String(req.query.is_premium) === 'true');
            filters.push(`is_premium = $${params.length}`);
        }

        params.push(pagination.limit, pagination.offset);
        const whereClause = filters.length > 0 ? `WHERE ${filters.join(' AND ')}` : '';

        const result = await pool.query(
            `
                SELECT id, email, prenom, nom, serie_code, role, is_premium, premium_expires_at, created_at
                FROM users
                ${whereClause}
                ORDER BY created_at DESC
                LIMIT $${params.length - 1}
                OFFSET $${params.length}
            `,
            params,
        );

        res.json({ page, limit: pagination.limit, data: result.rows });
    }),
);

router.patch(
    '/users/:id',
    validateBody(adminUserUpdateSchema),
    asyncHandler(async (req, res) => {
        const entries = Object.entries(req.validatedBody).filter(([, value]) => value !== undefined);

        if (entries.length === 0) {
            return res.status(400).json({ message: 'Aucune modification fournie' });
        }

        const setClauses = entries.map(([key], index) => `${key} = $${index + 1}`);
        const values = entries.map(([, value]) => value);

        const result = await pool.query(
            `
                UPDATE users
                SET ${setClauses.join(', ')}, updated_at = NOW()
                WHERE id = $${entries.length + 1}
                RETURNING id, email, role, is_premium, premium_expires_at
            `,
            [...values, req.params.id],
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Utilisateur introuvable' });
        }

        res.json(result.rows[0]);
    }),
);

router.get(
    '/exercises',
    asyncHandler(async (req, res) => {
        const page = Number(req.query.page ?? 1);
        const pagination = paginationSchema.parse({
            limit: req.query.limit ?? 20,
            offset: (page - 1) * Number(req.query.limit ?? 20),
        });

        const filters = [];
        const params = [];

        if (req.query.subject_id) {
            params.push(req.query.subject_id);
            filters.push(`e.subject_id = $${params.length}`);
        }

        if (req.query.type) {
            params.push(req.query.type);
            filters.push(`e.type = $${params.length}`);
        }

        if (req.query.difficulty) {
            params.push(Number(req.query.difficulty));
            filters.push(`e.difficulty = $${params.length}`);
        }

        if (req.query.annale !== undefined) {
            params.push(String(req.query.annale) === 'true');
            filters.push(`e.is_annale = $${params.length}`);
        }

        params.push(pagination.limit, pagination.offset);
        const whereClause = filters.length > 0 ? `WHERE ${filters.join(' AND ')}` : '';

        const result = await pool.query(
            `
                SELECT e.*, s.name AS subject_name, c.title AS chapter_title
                FROM exercises e
                JOIN subjects s ON s.id = e.subject_id
                JOIN chapters c ON c.id = e.chapter_id
                ${whereClause}
                ORDER BY e.created_at DESC
                LIMIT $${params.length - 1}
                OFFSET $${params.length}
            `,
            params,
        );

        res.json({ page, limit: pagination.limit, data: result.rows });
    }),
);

router.post(
    '/exercises',
    validateBody(adminExerciseSchema),
    asyncHandler(async (req, res) => {
        const body = req.validatedBody;
        const result = await pool.query(
            `
                INSERT INTO exercises (
                    id, chapter_id, subject_id, type, difficulty, title, question_text, options, correct_answer,
                    explanation, hints, is_annale, annale_year, annale_session, estimated_time_minutes, points,
                    ai_generated, created_by, is_published, created_at
                ) VALUES (
                    $1, $2, $3, $4, $5, $6, $7, $8::jsonb, $9, $10, $11::jsonb, $12, $13, $14, $15, $16,
                    false, $17, true, NOW()
                )
                RETURNING *
            `,
            [
                randomUUID(),
                body.chapter_id,
                body.subject_id,
                body.type,
                body.difficulty,
                body.title,
                body.question_text,
                JSON.stringify(body.options ?? []),
                body.correct_answer,
                body.explanation,
                JSON.stringify(body.hints),
                body.is_annale,
                body.annale_year,
                body.annale_session,
                body.estimated_time_minutes,
                body.points,
                req.user.id,
            ],
        );

        res.status(201).json(result.rows[0]);
    }),
);

router.patch(
    '/exercises/:id',
    validateBody(adminExerciseSchema.partial()),
    asyncHandler(async (req, res) => {
        const entries = Object.entries(req.validatedBody).filter(([, value]) => value !== undefined);

        if (entries.length === 0) {
            return res.status(400).json({ message: 'Aucune modification fournie' });
        }

        const values = [];
        const setClauses = entries.map(([key, value], index) => {
            const paramIndex = index + 1;

            if (key === 'options' || key === 'hints') {
                values.push(JSON.stringify(value));

                return `${key} = $${paramIndex}::jsonb`;
            }

            values.push(value);

            return `${key} = $${paramIndex}`;
        });

        const result = await pool.query(
            `
                UPDATE exercises
                SET ${setClauses.join(', ')}
                WHERE id = $${entries.length + 1}
                RETURNING *
            `,
            [...values, req.params.id],
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Exercice introuvable' });
        }

        res.json(result.rows[0]);
    }),
);

router.delete(
    '/exercises/:id',
    asyncHandler(async (req, res) => {
        const result = await pool.query(
            'UPDATE exercises SET is_published = false WHERE id = $1 RETURNING id, is_published',
            [req.params.id],
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Exercice introuvable' });
        }

        res.json(result.rows[0]);
    }),
);

const importAnnaleSchema = z.object({
    subject_id: z.string().uuid(),
    chapter_id: z.string().uuid(),
    year: z.number().int().min(1970).max(2100),
    session: z.string().max(50).optional().nullable(),
    exercises: z.array(z.object({
        type: z.enum(['qcm', 'calcul', 'dissertation', 'vrai_faux', 'oral']),
        difficulty: z.number().int().min(1).max(5).default(3),
        title: z.string().min(3).max(300),
        question_text: z.string().min(10),
        options: z.array(z.any()).optional().nullable(),
        correct_answer: z.string().optional().nullable(),
        explanation: z.string().min(5),
        hints: z.array(z.string()).default([]),
        estimated_time_minutes: z.number().int().min(1).max(180).default(5),
        points: z.number().int().min(1).max(100).default(10),
    })).min(1).max(50),
});

router.post(
    '/import-annale',
    validateBody(importAnnaleSchema),
    asyncHandler(async (req, res) => {
        const { subject_id, chapter_id, year, session, exercises } = req.validatedBody;
        let inserted = 0;
        const errors = [];
        const exercises_preview = [];

        const client = await pool.connect();
        try {
            await client.query('BEGIN');
            for (const ex of exercises) {
                try {
                    const result = await client.query(
                        `INSERT INTO exercises (
                            id, chapter_id, subject_id, type, difficulty, title, question_text,
                            options, correct_answer, explanation, hints, is_annale, annale_year,
                            annale_session, estimated_time_minutes, points, ai_generated,
                            created_by, is_published, created_at
                        ) VALUES (
                            $1, $2, $3, $4, $5, $6, $7, $8::jsonb, $9, $10, $11::jsonb,
                            true, $12, $13, $14, $15, false, $16, true, NOW()
                        ) RETURNING id, title, type`,
                        [
                            randomUUID(), chapter_id, subject_id, ex.type, ex.difficulty,
                            ex.title, ex.question_text, JSON.stringify(ex.options ?? []),
                            ex.correct_answer ?? null, ex.explanation, JSON.stringify(ex.hints ?? []),
                            year, session ?? null, ex.estimated_time_minutes, ex.points, req.user.id,
                        ],
                    );
                    inserted += 1;
                    if (exercises_preview.length < 5) exercises_preview.push(result.rows[0]);
                } catch (err) {
                    errors.push({ title: ex.title, error: err.message });
                }
            }
            await client.query('COMMIT');
        } catch (err) {
            await client.query('ROLLBACK');
            throw err;
        } finally {
            client.release();
        }

        res.json({ inserted, failed: errors.length, exercises_preview, errors });
    }),
);

router.get(
    '/forum',
    asyncHandler(async (_req, res) => {
        const result = await pool.query('SELECT * FROM forum_posts ORDER BY created_at DESC');
        res.json(result.rows);
    }),
);

router.patch(
    '/forum/posts/:id',
    asyncHandler(async (req, res) => {
        const isPinned = req.body?.is_pinned;
        const isPublished = req.body?.is_published;

        const result = await pool.query(
            `
                UPDATE forum_posts
                SET is_pinned = COALESCE($1, is_pinned),
                    is_published = COALESCE($2, is_published)
                WHERE id = $3
                RETURNING id, is_pinned, is_published
            `,
            [isPinned, isPublished, req.params.id],
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Post introuvable' });
        }

        res.json(result.rows[0]);
    }),
);

export default router;
