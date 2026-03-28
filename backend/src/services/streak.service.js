import { pool } from '../db/pool.js';

function toIsoDate(value) {
    return value ? new Date(value).toISOString().slice(0, 10) : null;
}

export async function updateUserStreak(userId) {
    const result = await pool.query(
        `
            SELECT id, streak_days, longest_streak, last_activity_date
            FROM users
            WHERE id = $1
        `,
        [userId],
    );

    if (result.rowCount === 0) {
        throw new Error('Utilisateur introuvable');
    }

    const user = result.rows[0];
    const today = new Date();
    const todayIso = toIsoDate(today);
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayIso = toIsoDate(yesterday);
    const lastActivity = toIsoDate(user.last_activity_date);

    let streakDays = user.streak_days ?? 0;

    if (lastActivity === todayIso) {
        streakDays = user.streak_days ?? 0;
    } else if (lastActivity === yesterdayIso) {
        streakDays += 1;
    } else {
        streakDays = 1;
    }

    const longestStreak = Math.max(user.longest_streak ?? 0, streakDays);

    const updated = await pool.query(
        `
            UPDATE users
            SET streak_days = $1,
                longest_streak = $2,
                last_activity_date = CURRENT_DATE,
                updated_at = NOW()
            WHERE id = $3
            RETURNING streak_days, longest_streak, last_activity_date
        `,
        [streakDays, longestStreak, userId],
    );

    return updated.rows[0];
}
