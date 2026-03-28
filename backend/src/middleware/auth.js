import jwt from 'jsonwebtoken';

import { pool } from '../db/pool.js';
import { getEnv, sanitizeUser } from '../utils/helpers.js';

export async function requireAuth(req, res, next) {
    const authHeader = req.headers.authorization ?? '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

    if (!token) {
        return res.status(401).json({ message: 'Authentification requise' });
    }

    try {
        const payload = jwt.verify(token, getEnv('JWT_SECRET'));
        const result = await pool.query(
            'SELECT id, email, prenom, nom, serie_code, role, is_premium, total_points, created_at, updated_at FROM users WHERE id = $1',
            [payload.sub],
        );

        if (result.rowCount === 0) {
            return res.status(401).json({ message: 'Utilisateur introuvable' });
        }

        req.user = sanitizeUser(result.rows[0]);
        return next();
    } catch (_error) {
        return res.status(401).json({ message: 'Jeton invalide ou expiré' });
    }
}
