import { Router } from 'express';
import { z } from 'zod';

import { pool } from '../db/pool.js';
import { requireAuth } from '../middleware/auth.js';
import { generateAdaptivePlan } from '../services/planning.service.js';
import { asyncHandler } from '../utils/helpers.js';
import { validateBody } from '../utils/validators.js';

const router = Router();

const completeTaskSchema = z.object({});

function getMonday(date) {
    const copy = new Date(date);
    const day = copy.getDay();
    const diff = copy.getDate() - day + (day === 0 ? -6 : 1);
    copy.setDate(diff);
    copy.setHours(0, 0, 0, 0);
    return copy;
}

router.get(
    '/today',
    requireAuth,
    asyncHandler(async (req, res) => {
        const result = await pool.query(
            `
                SELECT
                    dt.*,
                    s.name AS subject_name,
                    c.title AS chapter_title
                FROM daily_tasks dt
                LEFT JOIN subjects s ON s.id = dt.subject_id
                LEFT JOIN chapters c ON c.id = dt.chapter_id
                WHERE dt.user_id = $1
                  AND dt.scheduled_date = CURRENT_DATE
                ORDER BY dt.created_at
            `,
            [req.user.id],
        );

        const stats = result.rows.reduce(
            (acc, row) => {
                acc.total += 1;
                acc.completed += row.is_completed ? 1 : 0;
                acc.minutes_remaining += row.is_completed ? 0 : row.estimated_minutes;
                return acc;
            },
            { total: 0, completed: 0, minutes_remaining: 0 },
        );

        res.json({
            tasks: result.rows,
            stats: {
                completed_ratio: `${stats.completed}/${stats.total}`,
                minutes_remaining: stats.minutes_remaining,
                total: stats.total,
                completed: stats.completed,
            },
        });
    }),
);

router.get(
    '/week',
    requireAuth,
    asyncHandler(async (req, res) => {
        const startDate = req.query.start_date ? new Date(String(req.query.start_date)) : getMonday(new Date());
        const startIso = new Date(startDate).toISOString().slice(0, 10);
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + 6);
        const endIso = endDate.toISOString().slice(0, 10);

        const result = await pool.query(
            `
                SELECT
                    dt.*,
                    s.name AS subject_name,
                    c.title AS chapter_title
                FROM daily_tasks dt
                LEFT JOIN subjects s ON s.id = dt.subject_id
                LEFT JOIN chapters c ON c.id = dt.chapter_id
                WHERE dt.user_id = $1
                  AND dt.scheduled_date BETWEEN $2 AND $3
                ORDER BY dt.scheduled_date, dt.created_at
            `,
            [req.user.id, startIso, endIso],
        );

        const grouped = result.rows.reduce((acc, row) => {
            if (!acc[row.scheduled_date]) {
                acc[row.scheduled_date] = [];
            }
            acc[row.scheduled_date].push(row);
            return acc;
        }, {});

        res.json(grouped);
    }),
);

router.post(
    '/generate',
    requireAuth,
    asyncHandler(async (req, res) => {
        await pool.query('UPDATE revision_plans SET is_active = false WHERE user_id = $1 AND is_active = true', [req.user.id]);
        await pool.query('DELETE FROM daily_tasks WHERE user_id = $1 AND is_completed = false', [req.user.id]);

        const plan = await generateAdaptivePlan(req.user.id);
        res.json(plan);
    }),
);

router.patch(
    '/tasks/:id/complete',
    requireAuth,
    validateBody(completeTaskSchema),
    asyncHandler(async (req, res) => {
        const taskResult = await pool.query(
            `
                UPDATE daily_tasks
                SET is_completed = true,
                    completed_at = NOW()
                WHERE id = $1
                  AND user_id = $2
                  AND is_completed = false
                RETURNING *
            `,
            [req.params.id, req.user.id],
        );

        if (taskResult.rowCount === 0) {
            return res.status(404).json({ message: 'Tâche introuvable ou déjà complétée' });
        }

        const todayResult = await pool.query(
            `
                SELECT
                    COUNT(*)::int AS total,
                    COUNT(*) FILTER (WHERE is_completed = true)::int AS completed
                FROM daily_tasks
                WHERE user_id = $1
                  AND scheduled_date = CURRENT_DATE
            `,
            [req.user.id],
        );

        const total = todayResult.rows[0].total;
        const completed = todayResult.rows[0].completed;
        const allDoneToday = total > 0 && total === completed;
        const pointsEarned = 5 + (allDoneToday ? 20 : 0);

        await pool.query('UPDATE users SET total_points = total_points + $1, updated_at = NOW() WHERE id = $2', [
            pointsEarned,
            req.user.id,
        ]);

        return res.json({
            success: true,
            points_earned: pointsEarned,
            all_done_today: allDoneToday,
        });
    }),
);

router.delete(
    '/tasks/:id',
    requireAuth,
    asyncHandler(async (req, res) => {
        const result = await pool.query('DELETE FROM daily_tasks WHERE id = $1 AND user_id = $2 RETURNING id', [
            req.params.id,
            req.user.id,
        ]);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Tâche introuvable' });
        }

        return res.json({ success: true });
    }),
);

export default router;
