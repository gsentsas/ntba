import { Router } from 'express';
import { z } from 'zod';

import { requireAuth } from '../middleware/auth.js';
import { aiLimiter } from '../middleware/rateLimit.js';
import {
    createAnswerCorrection,
    createPhotoCorrectionReport,
    createStudyPack,
    getStudentAgentContext,
} from '../services/internal-agent.service.js';
import { asyncHandler } from '../utils/helpers.js';
import { validateBody } from '../utils/validators.js';

const router = Router();

const contextQuerySchema = z.object({
    subject_id: z.string().uuid().optional(),
    chapter_id: z.string().uuid().optional(),
    serie_code: z.string().max(10).optional(),
});

const studyPackSchema = z.object({
    subject_id: z.string().uuid().optional().nullable(),
    chapter_id: z.string().uuid().optional().nullable(),
    serie_code: z.string().max(10).optional().nullable(),
    difficulty: z.number().int().min(1).max(5).optional().default(3),
    type: z.string().min(2).max(30).optional().default('qcm'),
    include_pdf: z.boolean().optional().default(true),
});

const answerCorrectionSchema = z.object({
    exercise_id: z.string().uuid(),
    answer: z.string().min(1).max(5000),
    serie_code: z.string().max(10).optional().nullable(),
    include_pdf: z.boolean().optional().default(true),
});

const photoCorrectionSchema = z.object({
    image_base64: z.string().min(20),
    media_type: z.string().min(5),
    subject_id: z.string().uuid().optional().nullable(),
    serie_code: z.string().max(10).optional().nullable(),
    include_pdf: z.boolean().optional().default(true),
});

function sendAgentError(res, error) {
    const message =
        error instanceof Error ? error.message : 'Erreur interne de l’agent';

    if (message.includes('introuvable')) {
        return res.status(404).json({ message });
    }

    if (message.includes('premium')) {
        return res.status(403).json({ message });
    }

    if (
        message.includes('Image trop volumineuse') ||
        message.includes('Aucune matière disponible') ||
        message.includes('Aucun chapitre disponible')
    ) {
        return res.status(400).json({ message });
    }

    return null;
}

router.use(requireAuth);
router.use(aiLimiter);

router.get(
    '/context',
    asyncHandler(async (req, res) => {
        const parsed = contextQuerySchema.safeParse(req.query);

        if (!parsed.success) {
            return res.status(400).json({
                message: 'Paramètres invalides',
                errors: parsed.error.flatten(),
            });
        }

        const query = parsed.data;
        try {
            const context = await getStudentAgentContext(req.user, {
                subjectId: query.subject_id ?? null,
                chapterId: query.chapter_id ?? null,
                serieCode: query.serie_code ?? null,
            });

            return res.json(context);
        } catch (error) {
            if (sendAgentError(res, error)) {
                return;
            }
            throw error;
        }
    }),
);

router.post(
    '/study-pack',
    validateBody(studyPackSchema),
    asyncHandler(async (req, res) => {
        try {
            const result = await createStudyPack(req.user, {
                subjectId: req.validatedBody.subject_id ?? null,
                chapterId: req.validatedBody.chapter_id ?? null,
                serieCode: req.validatedBody.serie_code ?? null,
                difficulty: req.validatedBody.difficulty,
                type: req.validatedBody.type,
                includePdf: req.validatedBody.include_pdf,
            });

            return res.json(result);
        } catch (error) {
            if (sendAgentError(res, error)) {
                return;
            }
            throw error;
        }
    }),
);

router.post(
    '/correct-answer',
    validateBody(answerCorrectionSchema),
    asyncHandler(async (req, res) => {
        try {
            const result = await createAnswerCorrection(req.user, {
                exerciseId: req.validatedBody.exercise_id,
                answer: req.validatedBody.answer,
                serieCode: req.validatedBody.serie_code ?? null,
                includePdf: req.validatedBody.include_pdf,
            });

            return res.json(result);
        } catch (error) {
            if (sendAgentError(res, error)) {
                return;
            }
            throw error;
        }
    }),
);

router.post(
    '/correct-photo-report',
    validateBody(photoCorrectionSchema),
    asyncHandler(async (req, res) => {
        try {
            const result = await createPhotoCorrectionReport(req.user, {
                imageBase64: req.validatedBody.image_base64,
                mediaType: req.validatedBody.media_type,
                subjectId: req.validatedBody.subject_id ?? null,
                serieCode: req.validatedBody.serie_code ?? null,
                includePdf: req.validatedBody.include_pdf,
            });

            return res.json(result);
        } catch (error) {
            if (sendAgentError(res, error)) {
                return;
            }
            throw error;
        }
    }),
);

export default router;
