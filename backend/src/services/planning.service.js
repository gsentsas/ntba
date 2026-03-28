import { randomUUID } from 'node:crypto';

import { pool } from '../db/pool.js';

function getBacDate(reference = new Date()) {
    return new Date(Date.UTC(reference.getFullYear(), 5, 10, 0, 0, 0));
}

function eachDayBetween(startDate, endDate) {
    const days = [];
    const current = new Date(startDate);

    while (current <= endDate) {
        days.push(new Date(current));
        current.setUTCDate(current.getUTCDate() + 1);
    }

    return days;
}

function isWeekend(date) {
    const day = date.getUTCDay();
    return day === 0 || day === 6;
}

function getPhaseType(weekIndex) {
    if (weekIndex <= 2) {
        return { task_type: 'cours', titlePrefix: 'Cours ciblé', description: 'Comprendre les notions de base et revoir le cours.' };
    }

    if (weekIndex <= 5) {
        return { task_type: 'exercices', titlePrefix: 'Exercices types', description: 'Travailler les exercices classiques et annales.' };
    }

    return { task_type: 'revision', titlePrefix: 'Révision intensive', description: 'Réviser vite, consolider et préparer la simulation.' };
}

export async function generateAdaptivePlan(userId) {
    const client = await pool.connect();

    try {
        const userResult = await client.query(
            `
                SELECT id, prenom, nom, serie_code
                FROM users
                WHERE id = $1
            `,
            [userId],
        );

        if (userResult.rowCount === 0) {
            throw new Error('Utilisateur introuvable');
        }

        const user = userResult.rows[0];

        const [subjectsResult, performancesResult] = await Promise.all([
            client.query(
                `
                    SELECT id, name, coefficient
                    FROM subjects
                    WHERE serie_code = $1
                    ORDER BY order_index, name
                `,
                [user.serie_code],
            ),
            client.query(
                `
                    SELECT
                        subject_id,
                        AVG(CASE WHEN is_correct THEN 1 ELSE 0 END) * 20 AS average_score
                    FROM student_performances
                    WHERE user_id = $1
                      AND completed_at >= NOW() - INTERVAL '30 days'
                    GROUP BY subject_id
                `,
                [userId],
            ),
        ]);

        const subjectAverages = new Map(
            performancesResult.rows.map((row) => [row.subject_id, Number(row.average_score ?? 0)]),
        );

        const subjectPlans = subjectsResult.rows.map((subject) => {
            const average = subjectAverages.get(subject.id) ?? 0;
            const level = Math.max(0, Math.min(5, Math.floor(average / 4)));
            const priority = subject.coefficient * 3 + (5 - level) * 2;
            const minimumHours = Math.max(2, Math.ceil((subject.coefficient * (6 - level)) / 2));

            return {
                subject_id: subject.id,
                subject_name: subject.name,
                coefficient: subject.coefficient,
                average,
                level,
                priority,
                minimum_hours: minimumHours,
            };
        });

        const today = new Date();
        const startDate = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()));
        const bacDate = getBacDate(today);
        const days = eachDayBetween(startDate, bacDate);
        const daysLeft = Math.max(0, days.length - 1);

        const totalAvailableMinutes = days.reduce((sum, day) => sum + (isWeekend(day) ? 240 : 120), 0);
        const totalPriority = subjectPlans.reduce((sum, item) => sum + item.priority, 0) || 1;

        const scheduleOverview = subjectPlans.map((item) => {
            const proportionalMinutes = Math.round((item.priority / totalPriority) * totalAvailableMinutes);
            const minimumMinutes = item.minimum_hours * 60;

            return {
                ...item,
                allocated_minutes: Math.max(proportionalMinutes, minimumMinutes),
            };
        });

        const chaptersResult = await client.query(
            `
                SELECT id, subject_id, title, order_index
                FROM chapters
                WHERE subject_id = ANY($1::uuid[])
                ORDER BY subject_id, order_index, title
            `,
            [scheduleOverview.map((item) => item.subject_id)],
        );

        const chaptersBySubject = chaptersResult.rows.reduce((acc, chapter) => {
            if (!acc[chapter.subject_id]) {
                acc[chapter.subject_id] = [];
            }

            acc[chapter.subject_id].push(chapter);
            return acc;
        }, {});

        const planId = randomUUID();
        const tasks = [];
        const chapterCursor = new Map();

        for (const day of days) {
            const dateIso = day.toISOString().slice(0, 10);
            const weekIndex = Math.floor((tasks.length > 0 ? tasks[tasks.length - 1].dayIndex + 1 : 0) / 7) + 1;
            const phase = getPhaseType(weekIndex);
            const dailyMinutes = isWeekend(day) ? 240 : 120;
            const sortedSubjects = [...scheduleOverview].sort((a, b) => b.priority - a.priority);
            let allocated = 0;

            for (const subject of sortedSubjects) {
                if (allocated >= dailyMinutes) {
                    break;
                }

                const chapters = chaptersBySubject[subject.subject_id] ?? [];
                const cursor = chapterCursor.get(subject.subject_id) ?? 0;
                const chapter = chapters.length > 0 ? chapters[cursor % chapters.length] : null;
                chapterCursor.set(subject.subject_id, cursor + 1);

                const subjectDailyMinutes = Math.max(
                    30,
                    Math.min(dailyMinutes - allocated, Math.round((subject.allocated_minutes / Math.max(1, days.length)) / 10) * 10 || 30),
                );

                tasks.push({
                    id: randomUUID(),
                    plan_id: planId,
                    user_id: userId,
                    subject_id: subject.subject_id,
                    chapter_id: chapter?.id ?? null,
                    task_type: phase.task_type,
                    title: `${phase.titlePrefix} — ${subject.subject_name}`,
                    description: chapter ? `${phase.description} Chapitre ciblé : ${chapter.title}.` : phase.description,
                    estimated_minutes: subjectDailyMinutes,
                    scheduled_date: dateIso,
                    dayIndex: tasks.length,
                });

                allocated += subjectDailyMinutes;
            }
        }

        const lastThreeWeeksStart = Math.max(0, days.length - 21);
        days.slice(lastThreeWeeksStart).forEach((day) => {
            if (day.getUTCDay() === 6) {
                const dateIso = day.toISOString().slice(0, 10);
                const topSubject = [...scheduleOverview].sort((a, b) => b.coefficient - a.coefficient)[0];
                tasks.push({
                    id: randomUUID(),
                    plan_id: planId,
                    user_id: userId,
                    subject_id: topSubject?.subject_id ?? null,
                    chapter_id: null,
                    task_type: 'simulation',
                    title: `Simulation BAC complète — ${topSubject?.subject_name ?? user.serie_code}`,
                    description: 'Faire une simulation complète en conditions réelles le samedi.',
                    estimated_minutes: 180,
                    scheduled_date: dateIso,
                    dayIndex: tasks.length,
                });
            }
        });

        const planData = {
            generated_at: new Date().toISOString(),
            serie_code: user.serie_code,
            subjects: scheduleOverview,
            total_available_minutes: totalAvailableMinutes,
            tasks_count: tasks.length,
        };

        await client.query(
            `
                INSERT INTO revision_plans (id, user_id, plan_data, bac_date, is_active, generated_at)
                VALUES ($1, $2, $3::jsonb, $4, true, NOW())
            `,
            [planId, userId, JSON.stringify(planData), bacDate.toISOString().slice(0, 10)],
        );

        for (const task of tasks) {
            await client.query(
                `
                    INSERT INTO daily_tasks (
                        id, user_id, plan_id, subject_id, chapter_id, task_type, title,
                        description, estimated_minutes, scheduled_date, is_completed, created_at
                    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, false, NOW())
                `,
                [
                    task.id,
                    task.user_id,
                    task.plan_id,
                    task.subject_id,
                    task.chapter_id,
                    task.task_type,
                    task.title,
                    task.description,
                    task.estimated_minutes,
                    task.scheduled_date,
                ],
            );
        }

        return {
            plan_id: planId,
            days_left: daysLeft,
            tasks_created: tasks.length,
            schedule_overview: scheduleOverview,
        };
    } finally {
        client.release();
    }
}
