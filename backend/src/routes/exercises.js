import { randomUUID } from 'node:crypto';

import { Router } from 'express';
import { z } from 'zod';

import { pool } from '../db/pool.js';
import { requireAuth } from '../middleware/auth.js';
import { asyncHandler } from '../utils/helpers.js';
import { paginationSchema, validateBody } from '../utils/validators.js';

const router = Router();

const submitSchema = z.object({
    answer: z.string().min(1),
    time_spent_seconds: z.number().int().min(0).optional().default(0),
    hints_used: z.number().int().min(0).optional().default(0),
});

function parseBoolean(value, defaultValue = false) {
    if (value === undefined) {
        return defaultValue;
    }

    if (typeof value === 'boolean') {
        return value;
    }

    return ['true', '1', 'yes'].includes(String(value).toLowerCase());
}

router.use(requireAuth);

router.get(
    '/',
    asyncHandler(async (req, res) => {
        const pagination = paginationSchema.parse(req.query);
        const shuffle = parseBoolean(req.query.shuffle, true);
        const filters = [];
        const params = [];

        if (req.query.subject_id) {
            params.push(req.query.subject_id);
            filters.push(`e.subject_id = $${params.length}`);
        }

        if (req.user.role !== 'admin') {
            params.push(req.user.serie_code);
            filters.push(`s.serie_code = $${params.length}`);
        } else if (req.query.serie_code) {
            params.push(req.query.serie_code);
            filters.push(`s.serie_code = $${params.length}`);
        }

        if (req.query.chapter_id) {
            params.push(req.query.chapter_id);
            filters.push(`e.chapter_id = $${params.length}`);
        }

        if (req.query.type) {
            params.push(req.query.type);
            filters.push(`e.type = $${params.length}`);
        }

        if (req.query.difficulty) {
            params.push(Number(req.query.difficulty));
            filters.push(`e.difficulty = $${params.length}`);
        }

        if (req.query.is_annale !== undefined) {
            params.push(parseBoolean(req.query.is_annale));
            filters.push(`e.is_annale = $${params.length}`);
        }

        params.push(pagination.limit);
        params.push(pagination.offset);

        const whereClause = filters.length > 0 ? `WHERE ${filters.join(' AND ')}` : '';
        const orderClause = shuffle ? 'ORDER BY RANDOM()' : 'ORDER BY e.created_at DESC';

        const result = await pool.query(
            `
                SELECT
                    e.id,
                    e.chapter_id,
                    e.subject_id,
                    e.type,
                    e.difficulty,
                    e.title,
                    e.question_text,
                    e.options,
                    e.explanation,
                    e.hints,
                    e.is_annale,
                    e.annale_year,
                    e.annale_session,
                    e.estimated_time_minutes,
                    e.points,
                    e.ai_generated,
                    s.name AS subject_name,
                    s.serie_code,
                    c.title AS chapter_title
                FROM exercises e
                JOIN subjects s ON s.id = e.subject_id
                JOIN chapters c ON c.id = e.chapter_id
                ${whereClause}
                ${orderClause}
                LIMIT $${params.length - 1}
                OFFSET $${params.length}
            `,
            params,
        );

        res.json(result.rows);
    }),
);

router.get(
    '/annales',
    asyncHandler(async (req, res) => {
        const pagination = paginationSchema.parse(req.query);
        const filters = ['e.is_annale = true'];
        const params = [];

        if (req.user.role !== 'admin') {
            params.push(req.user.serie_code);
            filters.push(`s.serie_code = $${params.length}`);
        } else if (req.query.serie_code) {
            params.push(req.query.serie_code);
            filters.push(`s.serie_code = $${params.length}`);
        }

        if (req.query.subject_id) {
            params.push(req.query.subject_id);
            filters.push(`e.subject_id = $${params.length}`);
        }

        if (req.query.year) {
            params.push(Number(req.query.year));
            filters.push(`e.annale_year = $${params.length}`);
        }

        params.push(pagination.limit);
        params.push(pagination.offset);

        const result = await pool.query(
            `
                SELECT
                    e.id,
                    e.title,
                    e.question_text,
                    e.options,
                    e.explanation,
                    e.annale_year,
                    e.annale_session,
                    e.difficulty,
                    e.estimated_time_minutes,
                    e.pdf_url,
                    e.corrige_url,
                    s.id AS subject_id,
                    s.name AS subject_name,
                    s.icon AS subject_icon,
                    s.serie_code,
                    c.id AS chapter_id,
                    c.title AS chapter_title
                FROM exercises e
                JOIN subjects s ON s.id = e.subject_id
                JOIN chapters c ON c.id = e.chapter_id
                WHERE ${filters.join(' AND ')}
                ORDER BY e.annale_year DESC, s.name ASC, e.annale_session ASC
                LIMIT $${params.length - 1}
                OFFSET $${params.length}
            `,
            params,
        );

        const grouped = Object.values(
            result.rows.reduce((acc, row) => {
                const key = `${row.annale_year}:${row.subject_id}`;

                if (!acc[key]) {
                    acc[key] = {
                        year: row.annale_year,
                        subject: {
                            id: row.subject_id,
                            name: row.subject_name,
                            icon: row.subject_icon,
                            serie_code: row.serie_code,
                        },
                        exercises: [],
                    };
                }

                acc[key].exercises.push(row);
                return acc;
            }, {}),
        );

        res.json(grouped);
    }),
);

router.get(
    '/:id',
    asyncHandler(async (req, res) => {
        const params = [req.params.id];
        let extraWhere = '';

        if (req.user.role !== 'admin') {
            params.push(req.user.serie_code);
            extraWhere = ` AND s.serie_code = $${params.length}`;
        }

        const result = await pool.query(
            `
                SELECT
                    e.id,
                    e.chapter_id,
                    e.subject_id,
                    e.type,
                    e.difficulty,
                    e.title,
                    e.question_text,
                    e.options,
                    e.explanation,
                    e.hints,
                    e.is_annale,
                    e.annale_year,
                    e.annale_session,
                    e.estimated_time_minutes,
                    e.points,
                    s.name AS subject_name,
                    c.title AS chapter_title
                FROM exercises e
                JOIN subjects s ON s.id = e.subject_id
                JOIN chapters c ON c.id = e.chapter_id
                WHERE e.id = $1
                ${extraWhere}
            `,
            params,
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Exercice introuvable' });
        }

        return res.json(result.rows[0]);
    }),
);

router.get(
    '/:id/hint',
    asyncHandler(async (req, res) => {
        const params = [req.params.id];
        let extraWhere = '';

        if (req.user.role !== 'admin') {
            params.push(req.user.serie_code);
            extraWhere = ` AND s.serie_code = $${params.length}`;
        }

        const result = await pool.query(
            `
                SELECT e.hints
                FROM exercises e
                JOIN subjects s ON s.id = e.subject_id
                WHERE e.id = $1
                ${extraWhere}
            `,
            params,
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Exercice introuvable' });
        }

        const hints = result.rows[0].hints ?? [];
        const hintsUsed = Number(req.query.hints_used ?? 0);
        const nextHint = hints[hintsUsed] ?? null;

        return res.json({
            hint: nextHint,
            remaining: Math.max(0, hints.length - hintsUsed - (nextHint ? 1 : 0)),
        });
    }),
);

router.post(
    '/:id/submit',
    validateBody(submitSchema),
    asyncHandler(async (req, res) => {
        const params = [req.params.id];
        let extraWhere = '';

        if (req.user.role !== 'admin') {
            params.push(req.user.serie_code);
            extraWhere = ` AND s.serie_code = $${params.length}`;
        }

        const exerciseResult = await pool.query(
            `
                SELECT e.id, e.chapter_id, e.subject_id, e.type, e.correct_answer, e.explanation, e.points
                FROM exercises e
                JOIN subjects s ON s.id = e.subject_id
                WHERE e.id = $1
                ${extraWhere}
            `,
            params,
        );

        if (exerciseResult.rowCount === 0) {
            return res.status(404).json({ message: 'Exercice introuvable' });
        }

        const exercise = exerciseResult.rows[0];
        const { answer, time_spent_seconds: timeSpentSeconds, hints_used: hintsUsed } = req.validatedBody;

        const attemptsResult = await pool.query(
            'SELECT COUNT(*)::int AS attempts FROM student_performances WHERE user_id = $1 AND exercise_id = $2',
            [req.user.id, exercise.id],
        );

        const attempts = (attemptsResult.rows[0]?.attempts ?? 0) + 1;
        const normalizedAnswer = String(answer).trim().toLowerCase();
        const normalizedCorrect = String(exercise.correct_answer ?? '').trim().toLowerCase();

        let isCorrect = false;

        if (exercise.type === 'qcm') {
            isCorrect = normalizedAnswer === normalizedCorrect;
        } else if (exercise.type === 'vrai_faux') {
            isCorrect = normalizedAnswer === normalizedCorrect;
        } else {
            isCorrect = true;
        }

        let pointsEarned = 0;

        if (isCorrect) {
            pointsEarned = attempts === 1 ? exercise.points : Math.round(exercise.points * 0.5);
            pointsEarned = Math.max(0, pointsEarned - hintsUsed * 2);
        }

        const client = await pool.connect();

        try {
            await client.query('BEGIN');

            await client.query(
                `
                    INSERT INTO student_performances (
                        id, user_id, exercise_id, subject_id, chapter_id, is_correct, attempts,
                        time_spent_seconds, answer_given, hints_used, points_earned, completed_at
                    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, NOW())
                `,
                [
                    randomUUID(),
                    req.user.id,
                    exercise.id,
                    exercise.subject_id,
                    exercise.chapter_id,
                    isCorrect,
                    attempts,
                    timeSpentSeconds,
                    answer,
                    hintsUsed,
                    pointsEarned,
                ],
            );

            const progressStatsResult = await client.query(
                `
                    SELECT
                        COUNT(*)::int AS exercises_done,
                        COUNT(*) FILTER (WHERE is_correct = true)::int AS exercises_correct
                    FROM student_performances
                    WHERE user_id = $1 AND chapter_id = $2
                `,
                [req.user.id, exercise.chapter_id],
            );

            const chapterExercisesResult = await client.query(
                'SELECT COUNT(*)::int AS chapter_total FROM exercises WHERE chapter_id = $1',
                [exercise.chapter_id],
            );

            const exercisesDone = progressStatsResult.rows[0].exercises_done;
            const exercisesCorrect = progressStatsResult.rows[0].exercises_correct;
            const chapterTotal = Math.max(1, chapterExercisesResult.rows[0].chapter_total);
            const completionPct = Math.min(100, Math.round((exercisesDone / chapterTotal) * 100));
            const simulatedGrade = Number(((exercisesCorrect / Math.max(1, exercisesDone)) * 20).toFixed(2));

            await client.query(
                `
                    INSERT INTO chapter_progress (
                        id, user_id, chapter_id, subject_id, exercises_done, exercises_correct,
                        completion_pct, simulated_grade, last_studied_at
                    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW())
                    ON CONFLICT (user_id, chapter_id)
                    DO UPDATE SET
                        exercises_done = EXCLUDED.exercises_done,
                        exercises_correct = EXCLUDED.exercises_correct,
                        completion_pct = EXCLUDED.completion_pct,
                        simulated_grade = EXCLUDED.simulated_grade,
                        last_studied_at = NOW()
                `,
                [
                    randomUUID(),
                    req.user.id,
                    exercise.chapter_id,
                    exercise.subject_id,
                    exercisesDone,
                    exercisesCorrect,
                    completionPct,
                    simulatedGrade,
                ],
            );

            await client.query('UPDATE users SET total_points = total_points + $1, updated_at = NOW() WHERE id = $2', [
                pointsEarned,
                req.user.id,
            ]);

            await client.query('COMMIT');
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }

        return res.json({
            is_correct: isCorrect,
            points_earned: pointsEarned,
            correct_answer: exercise.correct_answer,
            explanation: exercise.explanation,
        });
    }),
);

export default router;
