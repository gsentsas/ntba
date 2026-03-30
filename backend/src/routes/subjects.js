import { Router } from 'express';

import { pool } from '../db/pool.js';
import { requireAuth } from '../middleware/auth.js';
import { asyncHandler } from '../utils/helpers.js';

const router = Router();

router.get(
    '/series',
    asyncHandler(async (req, res) => {
        const result = await pool.query(
            `SELECT DISTINCT serie_code FROM subjects ORDER BY serie_code`,
        );
        res.json(result.rows.map((r) => r.serie_code));
    }),
);

router.use(requireAuth);

router.get(
    '/',
    asyncHandler(async (req, res) => {
        const requestedSerieCode = req.query.serie_code ?? req.query.serie ?? null;
        const serieCode =
            req.user.role === 'admin'
                ? requestedSerieCode
                : req.user.serie_code;
        const params = [];
        let whereClause = '';

        if (serieCode) {
            params.push(serieCode);
            whereClause = 'WHERE s.serie_code = $1';
        }

        const result = await pool.query(
            `
                SELECT
                    s.id,
                    s.serie_code,
                    s.name,
                    s.slug,
                    s.coefficient,
                    s.icon,
                    s.color,
                    s.description,
                    s.order_index,
                    COUNT(c.id)::int AS chapters_count
                FROM subjects s
                LEFT JOIN chapters c ON c.subject_id = s.id AND c.is_published = true
                ${whereClause}
                GROUP BY s.id
                ORDER BY s.serie_code, s.order_index, s.name
            `,
            params,
        );

        res.json(result.rows);
    }),
);

router.get(
    '/:id',
    asyncHandler(async (req, res) => {
        const params = [req.params.id];
        let extraWhere = '';

        if (req.user.role !== 'admin') {
            params.push(req.user.serie_code);
            extraWhere = ` AND serie_code = $${params.length}`;
        }

        const result = await pool.query(
            `
                SELECT id, serie_code, name, slug, coefficient, icon, color, description, order_index
                FROM subjects
                WHERE id = $1
                ${extraWhere}
            `,
            params,
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Matière introuvable' });
        }

        return res.json(result.rows[0]);
    }),
);

router.get(
    '/:id/chapters',
    asyncHandler(async (req, res) => {
        const params = [req.params.id];
        let extraJoinFilter = '';

        if (req.user.role !== 'admin') {
            params.push(req.user.serie_code);
            extraJoinFilter = ` AND s.serie_code = $${params.length}`;
        }

        const result = await pool.query(
            `
                SELECT c.id, c.subject_id, c.title, c.slug, c.order_index, c.summary, c.key_formulas, c.mnemonics, c.is_published, c.created_at
                FROM chapters c
                JOIN subjects s ON s.id = c.subject_id
                WHERE c.subject_id = $1 AND c.is_published = true
                ${extraJoinFilter}
                ORDER BY order_index, title
            `,
            params,
        );

        res.json(result.rows);
    }),
);

export default router;
