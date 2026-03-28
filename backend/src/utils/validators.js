import { z } from 'zod';

export const uuidSchema = z.string().uuid();

export const paginationSchema = z.object({
    limit: z.coerce.number().int().min(1).max(100).default(20),
    offset: z.coerce.number().int().min(0).default(0),
});

export const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    prenom: z.string().min(1).max(100),
    nom: z.string().min(1).max(100),
    serie_code: z.string().min(1).max(10),
    etablissement: z.string().max(200).optional().nullable(),
    ville: z.string().max(100).optional().nullable(),
});

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});

export const refreshSchema = z.object({
    refreshToken: z.string().min(1),
});

export const profileSchema = z.object({
    prenom: z.string().min(1).max(100).optional(),
    nom: z.string().min(1).max(100).optional(),
    etablissement: z.string().max(200).optional().nullable(),
    ville: z.string().max(100).optional().nullable(),
    serie_code: z.string().max(10).optional(),
    avatar_url: z.string().url().max(500).optional().nullable(),
});

export const pushSubscriptionSchema = z.object({
    push_subscription: z.union([z.string().min(1), z.record(z.any())]),
});

export function validateBody(schema) {
    return (req, res, next) => {
        const parsed = schema.safeParse(req.body);

        if (!parsed.success) {
            return res.status(400).json({
                message: 'Données invalides',
                errors: parsed.error.flatten(),
            });
        }

        req.validatedBody = parsed.data;
        return next();
    };
}
