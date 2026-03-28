import { Router } from 'express';

import { pool } from '../db/pool.js';
import { requireAuth } from '../middleware/auth.js';
import { asyncHandler, getDaysUntilBac } from '../utils/helpers.js';

const router = Router();

router.get(
    '/global',
    requireAuth,
    asyncHandler(async (req, res) => {
        const result = await pool.query(
            `
                WITH perf AS (
                    SELECT
                        COUNT(*)::int AS total_exercises_done,
                        COUNT(*) FILTER (WHERE is_correct = true)::int AS total_correct,
                        COALESCE(ROUND(AVG(CASE WHEN is_correct THEN 1 ELSE 0 END) * 100, 2), 0) AS accuracy_rate
                    FROM student_performances
                    WHERE user_id = $1
                ),
                progress AS (
                    SELECT COALESCE(ROUND(AVG(completion_pct)), 0)::int AS overall_pct
                    FROM chapter_progress
                    WHERE user_id = $1
                ),
                weighted AS (
                    SELECT
                        COALESCE(
                            ROUND(
                                SUM(cp.simulated_grade * s.coefficient)::numeric / NULLIF(SUM(s.coefficient), 0),
                                2
                            ),
                            0
                        ) AS simulated_average
                    FROM chapter_progress cp
                    JOIN subjects s ON s.id = cp.subject_id
                    WHERE cp.user_id = $1
                )
                SELECT
                    perf.total_exercises_done,
                    perf.total_correct,
                    perf.accuracy_rate,
                    progress.overall_pct,
                    weighted.simulated_average
                FROM perf, progress, weighted
            `,
            [req.user.id],
        );

        const stats = result.rows[0];

        res.json({
            overall_pct: stats.overall_pct,
            simulated_average: Number(stats.simulated_average),
            total_exercises_done: stats.total_exercises_done,
            total_correct: stats.total_correct,
            accuracy_rate: Number(stats.accuracy_rate),
            streak_days: req.user.streak_days ?? 0,
            total_points: req.user.total_points ?? 0,
            days_until_bac: getDaysUntilBac(),
        });
    }),
);

router.get(
    '/subjects',
    requireAuth,
    asyncHandler(async (req, res) => {
        const result = await pool.query(
            `
                WITH chapter_counts AS (
                    SELECT subject_id, COUNT(*)::int AS chapters_total
                    FROM chapters
                    GROUP BY subject_id
                ),
                perf AS (
                    SELECT
                        subject_id,
                        COUNT(*)::int AS exercises_done,
                        COUNT(*) FILTER (WHERE is_correct = true)::int AS exercises_correct
                    FROM student_performances
                    WHERE user_id = $1
                    GROUP BY subject_id
                ),
                cp AS (
                    SELECT
                        subject_id,
                        COALESCE(ROUND(AVG(completion_pct)), 0)::int AS completion_pct,
                        COALESCE(ROUND(AVG(simulated_grade), 2), 0) AS simulated_grade,
                        COUNT(*) FILTER (WHERE completion_pct >= 100)::int AS chapters_done
                    FROM chapter_progress
                    WHERE user_id = $1
                    GROUP BY subject_id
                )
                SELECT
                    s.id,
                    s.name,
                    s.serie_code,
                    s.coefficient,
                    s.icon,
                    s.color,
                    COALESCE(cp.completion_pct, 0) AS completion_pct,
                    COALESCE(cp.simulated_grade, 0) AS simulated_grade,
                    COALESCE(perf.exercises_done, 0) AS exercises_done,
                    COALESCE(perf.exercises_correct, 0) AS exercises_correct,
                    COALESCE(cp.chapters_done, 0) AS chapters_done,
                    COALESCE(cc.chapters_total, 0) AS chapters_total
                FROM subjects s
                LEFT JOIN cp ON cp.subject_id = s.id
                LEFT JOIN perf ON perf.subject_id = s.id
                LEFT JOIN chapter_counts cc ON cc.subject_id = s.id
                WHERE s.serie_code = $2
                ORDER BY s.order_index, s.name
            `,
            [req.user.id, req.user.serie_code],
        );

        const subjects = [];

        for (const row of result.rows) {
            const weakResult = await pool.query(
                `
                    SELECT
                        c.title AS chapter_title,
                        ROUND((1 - AVG(CASE WHEN sp.is_correct THEN 1 ELSE 0 END)) * 100, 2) AS error_rate
                    FROM student_performances sp
                    JOIN chapters c ON c.id = sp.chapter_id
                    WHERE sp.user_id = $1
                      AND sp.subject_id = $2
                    GROUP BY c.title
                    ORDER BY error_rate DESC
                    LIMIT 2
                `,
                [req.user.id, row.id],
            );

            subjects.push({
                subject: {
                    id: row.id,
                    name: row.name,
                    serie_code: row.serie_code,
                    coefficient: row.coefficient,
                    icon: row.icon,
                    color: row.color,
                },
                completion_pct: row.completion_pct,
                simulated_grade: Number(row.simulated_grade),
                exercises_done: row.exercises_done,
                exercises_correct: row.exercises_correct,
                chapters_done: row.chapters_done,
                chapters_total: row.chapters_total,
                weak_chapters: weakResult.rows.map((item) => ({
                    chapter_title: item.chapter_title,
                    error_rate: Number(item.error_rate),
                })),
            });
        }

        res.json(subjects);
    }),
);

router.get(
    '/weekly-activity',
    requireAuth,
    asyncHandler(async (req, res) => {
        const result = await pool.query(
            `
                SELECT
                    completed_at::date AS date,
                    COUNT(*)::int AS exercises_done,
                    COALESCE(SUM(time_spent_seconds), 0)::int / 60 AS minutes_studied,
                    COALESCE(SUM(points_earned), 0)::int AS points_earned
                FROM student_performances
                WHERE user_id = $1
                  AND completed_at >= CURRENT_DATE - INTERVAL '6 days'
                GROUP BY completed_at::date
                ORDER BY date
            `,
            [req.user.id],
        );

        res.json(result.rows);
    }),
);

router.get(
    '/achievements',
    requireAuth,
    asyncHandler(async (req, res) => {
        const [perfResult, simulationResult] = await Promise.all([
            pool.query(
                `
                    SELECT COUNT(*)::int AS total_exercises_done
                    FROM student_performances
                    WHERE user_id = $1
                `,
                [req.user.id],
            ),
            pool.query(
                `
                    SELECT COUNT(*)::int AS simulations_done
                    FROM daily_tasks
                    WHERE user_id = $1
                      AND task_type = 'simulation'
                      AND is_completed = true
                `,
                [req.user.id],
            ),
        ]);

        const totalExercises = perfResult.rows[0].total_exercises_done;
        const simulationsDone = simulationResult.rows[0].simulations_done;
        const achievements = [];

        if (totalExercises >= 1) achievements.push('Premier exercice');
        if ((req.user.streak_days ?? 0) >= 7) achievements.push('Streak 7j');
        if ((req.user.streak_days ?? 0) >= 30) achievements.push('Streak 30j');
        if (totalExercises >= 100) achievements.push('100 exercices');
        if (simulationsDone >= 1) achievements.push('Première simulation');

        res.json(achievements);
    }),
);

export default router;
