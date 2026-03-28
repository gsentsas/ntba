import { Router } from 'express';

import { pool } from '../db/pool.js';
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

router.get(
    '/',
    asyncHandler(async (req, res) => {
        const serieCode = req.query.serie_code ?? req.query.serie ?? null;
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
        const result = await pool.query(
            `
                SELECT id, serie_code, name, slug, coefficient, icon, color, description, order_index
                FROM subjects
                WHERE id = $1
            `,
            [req.params.id],
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
        const result = await pool.query(
            `
                SELECT id, subject_id, title, slug, order_index, summary, key_formulas, mnemonics, is_published, created_at
                FROM chapters
                WHERE subject_id = $1 AND is_published = true
                ORDER BY order_index, title
            `,
            [req.params.id],
        );

        res.json(result.rows);
    }),
);

export default router;
