import rateLimit from 'express-rate-limit';

function keyGenerator(req) {
    return req.user?.id ?? req.ip;
}

export const defaultLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 120,
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator,
    message: { message: 'Trop de requêtes, réessaie dans une minute.' },
});

export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator,
    message: { message: 'Trop de tentatives de connexion, patiente un moment.' },
});

export const aiLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: (req) => (req.user?.is_premium ? 30 : 10),
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator,
    message: { message: 'Limite IA atteinte pour cette minute.' },
});
