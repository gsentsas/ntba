import bcrypt from 'bcryptjs';
import { Router } from 'express';
import jwt from 'jsonwebtoken';

import { pool } from '../db/pool.js';
import { requireAuth } from '../middleware/auth.js';
import {
    asyncHandler,
    getDaysUntilBac,
    getEnv,
    sanitizeUser,
    signAccessToken,
    signRefreshToken,
} from '../utils/helpers.js';
import {
    loginSchema,
    profileSchema,
    pushSubscriptionSchema,
    refreshSchema,
    registerSchema,
    validateBody,
} from '../utils/validators.js';

const router = Router();

function serializePushSubscription(value) {
    if (typeof value === 'string') {
        return value;
    }

    return JSON.stringify(value);
}

function toDateOnlyString(value) {
    if (!value) {
        return null;
    }

    if (value instanceof Date) {
        return value.toISOString().slice(0, 10);
    }

    return String(value).slice(0, 10);
}

async function buildUserStats(userId) {
    const [{ rows: exercisesRows }, { rows: completionRows }, { rows: simulatedRows }, { rows: todayRows }] = await Promise.all([
        pool.query(
            `
                SELECT COUNT(*)::int AS total_exercises_done
                FROM student_performances
                WHERE user_id = $1
            `,
            [userId],
        ),
        pool.query(
            `
                SELECT COALESCE(ROUND(AVG(completion_pct)), 0)::int AS global_completion_pct
                FROM chapter_progress
                WHERE user_id = $1
            `,
            [userId],
        ),
        pool.query(
            `
                WITH subject_stats AS (
                    SELECT
                        cp.subject_id,
                        MAX(cp.simulated_grade) AS simulated_grade
                    FROM chapter_progress cp
                    WHERE cp.user_id = $1
                    GROUP BY cp.subject_id
                )
                SELECT
                    COALESCE(
                        ROUND(
                            SUM(ss.simulated_grade * s.coefficient)::numeric
                            / NULLIF(SUM(s.coefficient), 0),
                            2
                        ),
                        0
                    ) AS simulated_average
                FROM subject_stats ss
                JOIN subjects s ON s.id = ss.subject_id
            `,
            [userId],
        ),
        pool.query(
            `
                SELECT
                    COUNT(*)::int AS today_tasks_count,
                    COUNT(*) FILTER (WHERE is_completed = true)::int AS today_tasks_done
                FROM daily_tasks
                WHERE user_id = $1
                  AND scheduled_date = CURRENT_DATE
            `,
            [userId],
        ),
    ]);

    return {
        total_exercises_done: exercisesRows[0]?.total_exercises_done ?? 0,
        global_completion_pct: completionRows[0]?.global_completion_pct ?? 0,
        simulated_average: Number(simulatedRows[0]?.simulated_average ?? 0),
        days_until_bac: getDaysUntilBac(),
        today_tasks_count: todayRows[0]?.today_tasks_count ?? 0,
        today_tasks_done: todayRows[0]?.today_tasks_done ?? 0,
    };
}

router.post(
    '/register',
    validateBody(registerSchema),
    asyncHandler(async (req, res) => {
        const { email, password, prenom, nom, serie_code, etablissement, ville } = req.validatedBody;
        const normalizedEmail = email.trim().toLowerCase();

        const existingUser = await pool.query('SELECT id FROM users WHERE email = $1', [normalizedEmail]);

        if (existingUser.rowCount > 0) {
            return res.status(409).json({ message: 'Cet email existe déjà' });
        }

        const passwordHash = await bcrypt.hash(password, 12);

        const userResult = await pool.query(
            `
                INSERT INTO users (
                    email,
                    password_hash,
                    prenom,
                    nom,
                    serie_code,
                    etablissement,
                    ville,
                    role,
                    last_activity_date,
                    streak_days,
                    longest_streak
                )
                VALUES ($1, $2, $3, $4, $5, $6, $7, 'eleve', CURRENT_DATE, 1, 1)
                    RETURNING
                    id,
                    email,
                    prenom,
                    nom,
                    serie_code,
                    etablissement,
                    ville,
                    role,
                    avatar_url,
                    streak_days,
                    longest_streak,
                    last_activity_date,
                    total_points,
                    is_premium,
                    created_at,
                    updated_at
            `,
            [normalizedEmail, passwordHash, prenom, nom, serie_code, etablissement ?? null, ville ?? null],
        );

        const user = userResult.rows[0];
        const token = signAccessToken(user);
        const refreshToken = signRefreshToken(user);
        const refreshTokenHash = await bcrypt.hash(refreshToken, 12);

        await pool.query('UPDATE users SET refresh_token_hash = $1 WHERE id = $2', [refreshTokenHash, user.id]);

        return res.status(201).json({
            token,
            refreshToken,
            user: sanitizeUser(user),
        });
    }),
);

router.post(
    '/login',
    validateBody(loginSchema),
    asyncHandler(async (req, res) => {
        const { email, password } = req.validatedBody;
        const normalizedEmail = email.trim().toLowerCase();

        const userResult = await pool.query('SELECT * FROM users WHERE email = $1', [normalizedEmail]);

        if (userResult.rowCount === 0) {
            return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
        }

        const user = userResult.rows[0];
        const passwordOk = await bcrypt.compare(password, user.password_hash ?? '');

        if (!passwordOk) {
            return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
        }

        const today = new Date();
        const todayIso = today.toISOString().slice(0, 10);

        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayIso = yesterday.toISOString().slice(0, 10);

        let streakDays = user.streak_days ?? 0;
        let longestStreak = user.longest_streak ?? 0;
        const lastActivityDate = toDateOnlyString(user.last_activity_date);

        if (lastActivityDate === todayIso) {
            streakDays = user.streak_days ?? 0;
        } else if (lastActivityDate === yesterdayIso) {
            streakDays = (user.streak_days ?? 0) + 1;
        } else {
            streakDays = 1;
        }

        if (streakDays > longestStreak) {
            longestStreak = streakDays;
        }

        const updatedUserResult = await pool.query(
            `
                UPDATE users
                SET streak_days = $1,
                    longest_streak = $2,
                    last_activity_date = CURRENT_DATE,
                    updated_at = NOW()
                WHERE id = $3
                    RETURNING
                    id,
                    email,
                    prenom,
                    nom,
                    serie_code,
                    role,
                    avatar_url,
                    streak_days,
                    longest_streak,
                    last_activity_date,
                    total_points,
                    is_premium,
                    created_at,
                    updated_at
            `,
            [streakDays, longestStreak, user.id],
        );

        const updatedUser = updatedUserResult.rows[0];
        const token = signAccessToken(updatedUser);
        const refreshToken = signRefreshToken(updatedUser);
        const refreshTokenHash = await bcrypt.hash(refreshToken, 12);

        await pool.query('UPDATE users SET refresh_token_hash = $1 WHERE id = $2', [refreshTokenHash, updatedUser.id]);

        return res.json({
            token,
            refreshToken,
            user: sanitizeUser(updatedUser),
        });
    }),
);

router.post(
    '/refresh',
    validateBody(refreshSchema),
    asyncHandler(async (req, res) => {
        const { refreshToken } = req.validatedBody;

        let payload;

        try {
            payload = jwt.verify(refreshToken, getEnv('JWT_SECRET'));
        } catch {
            return res.status(401).json({ message: 'Refresh token invalide' });
        }

        if (!payload || typeof payload === 'string' || payload.type !== 'refresh') {
            return res.status(401).json({ message: 'Refresh token invalide' });
        }

        const userResult = await pool.query(
            `
                SELECT
                    id,
                    email,
                    prenom,
                    nom,
                    serie_code,
                    role,
                    avatar_url,
                    streak_days,
                    longest_streak,
                    last_activity_date,
                    total_points,
                    is_premium,
                    created_at,
                    updated_at,
                    refresh_token_hash
                FROM users
                WHERE id = $1
            `,
            [payload.sub],
        );

        if (userResult.rowCount === 0) {
            return res.status(401).json({ message: 'Utilisateur introuvable' });
        }

        const user = userResult.rows[0];
        const refreshOk = user.refresh_token_hash ? await bcrypt.compare(refreshToken, user.refresh_token_hash) : false;

        if (!refreshOk) {
            return res.status(401).json({ message: 'Refresh token invalide' });
        }

        const token = signAccessToken(user);

        return res.json({ token });
    }),
);

router.get(
    '/me',
    requireAuth,
    asyncHandler(async (req, res) => {
        const userResult = await pool.query(
            `
                SELECT
                    id,
                    email,
                    prenom,
                    nom,
                    serie_code,
                    etablissement,
                    ville,
                    region,
                    role,
                    avatar_url,
                    streak_days,
                    longest_streak,
                    last_activity_date,
                    total_points,
                    is_premium,
                    premium_expires_at,
                    push_subscription,
                    created_at,
                    updated_at
                FROM users
                WHERE id = $1
            `,
            [req.user.id],
        );

        if (userResult.rowCount === 0) {
            return res.status(404).json({ message: 'Utilisateur introuvable' });
        }

        const user = sanitizeUser(userResult.rows[0]);
        const stats = await buildUserStats(req.user.id);

        return res.json({
            user,
            stats,
        });
    }),
);

router.patch(
    '/profile',
    requireAuth,
    validateBody(profileSchema),
    asyncHandler(async (req, res) => {
        const fields = req.validatedBody;
        const entries = Object.entries(fields).filter(([, value]) => value !== undefined);

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
                    RETURNING
                    id,
                    email,
                    prenom,
                    nom,
                    serie_code,
                    etablissement,
                    ville,
                    region,
                    role,
                    avatar_url,
                    streak_days,
                    longest_streak,
                    last_activity_date,
                    total_points,
                    is_premium,
                    premium_expires_at,
                    push_subscription,
                    created_at,
                    updated_at
            `,
            [...values, req.user.id],
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Utilisateur introuvable' });
        }

        return res.json({ user: sanitizeUser(result.rows[0]) });
    }),
);

router.post(
    '/push-subscribe',
    requireAuth,
    validateBody(pushSubscriptionSchema),
    asyncHandler(async (req, res) => {
        const serialized = serializePushSubscription(req.validatedBody.push_subscription);

        await pool.query(
            'UPDATE users SET push_subscription = $1, updated_at = NOW() WHERE id = $2',
            [serialized, req.user.id],
        );

        return res.json({ success: true });
    }),
);

export default router;
