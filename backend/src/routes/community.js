import { randomUUID } from 'node:crypto';

import { Router } from 'express';
import { z } from 'zod';

import { pool } from '../db/pool.js';
import { requireAuth } from '../middleware/auth.js';
import { asyncHandler } from '../utils/helpers.js';
import { paginationSchema, validateBody } from '../utils/validators.js';

const router = Router();

const createPostSchema = z.object({
    title: z.string().min(10).max(200),
    content: z.string().min(20).max(2000),
    subject_id: z.string().uuid().optional().nullable(),
    serie_code: z.string().min(1).max(10),
});

const replySchema = z.object({
    content: z.string().min(5).max(2000),
});

router.get(
    '/posts',
    requireAuth,
    asyncHandler(async (req, res) => {
        const pagination = paginationSchema.parse(req.query);
        const filters = ['fp.is_published = true'];
        const params = [];

        if (req.query.serie_code) {
            params.push(req.query.serie_code);
            filters.push(`fp.serie_code = $${params.length}`);
        }

        if (req.query.subject_id) {
            params.push(req.query.subject_id);
            filters.push(`fp.subject_id = $${params.length}`);
        }

        if (req.query.search) {
            params.push(`%${String(req.query.search)}%`);
            filters.push(`(fp.title ILIKE $${params.length} OR fp.content ILIKE $${params.length})`);
        }

        const sort = req.query.sort === 'popular' ? 'fp.likes_count DESC, fp.created_at DESC' : 'fp.created_at DESC';
        params.push(req.user.id, pagination.limit, pagination.offset);

        const result = await pool.query(
            `
                SELECT
                    fp.*,
                    u.prenom,
                    u.nom,
                    s.name AS subject_name,
                    EXISTS(
                        SELECT 1
                        FROM forum_likes fl
                        WHERE fl.user_id = $${params.length - 2}
                          AND fl.post_id = fp.id
                    ) AS liked_by_user
                FROM forum_posts fp
                JOIN users u ON u.id = fp.user_id
                LEFT JOIN subjects s ON s.id = fp.subject_id
                WHERE ${filters.join(' AND ')}
                ORDER BY ${sort}
                LIMIT $${params.length - 1}
                OFFSET $${params.length}
            `,
            params,
        );

        res.json(
            result.rows.map((row) => ({
                ...row,
                author_name: `${row.prenom} ${row.nom}`.trim(),
            })),
        );
    }),
);

router.post(
    '/posts',
    requireAuth,
    validateBody(createPostSchema),
    asyncHandler(async (req, res) => {
        const { title, content, subject_id: subjectId, serie_code: serieCode } = req.validatedBody;

        const result = await pool.query(
            `
                INSERT INTO forum_posts (
                    id, user_id, subject_id, serie_code, title, content, is_published, created_at
                ) VALUES ($1, $2, $3, $4, $5, $6, true, NOW())
                RETURNING *
            `,
            [randomUUID(), req.user.id, subjectId, serieCode, title, content],
        );

        res.status(201).json(result.rows[0]);
    }),
);

router.get(
    '/posts/:id',
    requireAuth,
    asyncHandler(async (req, res) => {
        const postResult = await pool.query(
            `
                UPDATE forum_posts
                SET views_count = views_count + 1
                WHERE id = $1
                RETURNING *
            `,
            [req.params.id],
        );

        if (postResult.rowCount === 0) {
            return res.status(404).json({ message: 'Post introuvable' });
        }

        const repliesResult = await pool.query(
            `
                SELECT
                    fr.*,
                    u.prenom,
                    u.nom
                FROM forum_replies fr
                LEFT JOIN users u ON u.id = fr.user_id
                WHERE fr.post_id = $1
                ORDER BY fr.is_best_answer DESC, fr.likes_count DESC, fr.created_at ASC
            `,
            [req.params.id],
        );

        return res.json({
            post: postResult.rows[0],
            replies: repliesResult.rows.map((row) => ({
                ...row,
                author_name: row.prenom && row.nom ? `${row.prenom} ${row.nom}`.trim() : null,
            })),
        });
    }),
);

router.post(
    '/posts/:id/replies',
    requireAuth,
    validateBody(replySchema),
    asyncHandler(async (req, res) => {
        const result = await pool.query(
            `
                INSERT INTO forum_replies (id, post_id, user_id, content, created_at)
                VALUES ($1, $2, $3, $4, NOW())
                RETURNING *
            `,
            [randomUUID(), req.params.id, req.user.id, req.validatedBody.content],
        );

        await pool.query('UPDATE forum_posts SET replies_count = replies_count + 1 WHERE id = $1', [req.params.id]);
        res.status(201).json(result.rows[0]);
    }),
);

router.post(
    '/posts/:id/like',
    requireAuth,
    asyncHandler(async (req, res) => {
        const existing = await pool.query('SELECT 1 FROM forum_likes WHERE user_id = $1 AND post_id = $2', [req.user.id, req.params.id]);

        if (existing.rowCount > 0) {
            await pool.query('DELETE FROM forum_likes WHERE user_id = $1 AND post_id = $2', [req.user.id, req.params.id]);
        } else {
            await pool.query('INSERT INTO forum_likes (user_id, post_id) VALUES ($1, $2)', [req.user.id, req.params.id]);
        }

        const countResult = await pool.query(
            `
                UPDATE forum_posts
                SET likes_count = (
                    SELECT COUNT(*)::int
                    FROM forum_likes
                    WHERE post_id = $1
                )
                WHERE id = $1
                RETURNING likes_count
            `,
            [req.params.id],
        );

        res.json({
            liked: existing.rowCount === 0,
            likes_count: countResult.rows[0]?.likes_count ?? 0,
        });
    }),
);

router.patch(
    '/posts/:id/resolve',
    requireAuth,
    asyncHandler(async (req, res) => {
        const postResult = await pool.query('SELECT user_id FROM forum_posts WHERE id = $1', [req.params.id]);

        if (postResult.rowCount === 0) {
            return res.status(404).json({ message: 'Post introuvable' });
        }

        if (postResult.rows[0].user_id !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Seul l’auteur ou un admin peut résoudre ce post' });
        }

        const result = await pool.query(
            'UPDATE forum_posts SET is_resolved = true WHERE id = $1 RETURNING id, is_resolved',
            [req.params.id],
        );

        res.json(result.rows[0]);
    }),
);

export default router;
