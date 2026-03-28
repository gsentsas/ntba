import jwt from 'jsonwebtoken';

export function getEnv(name, fallback = undefined) {
    const value = process.env[name] ?? fallback;

    if (value === undefined || value === null || value === '') {
        throw new Error(`Variable d'environnement manquante: ${name}`);
    }

    return value;
}

export function sanitizeUser(user) {
    if (!user) {
        return null;
    }

    const { password_hash, refresh_token_hash, ...safeUser } = user;
    return safeUser;
}

export function signAccessToken(user) {
    return jwt.sign(
        {
            sub: user.id,
            email: user.email,
            role: user.role,
            serie_code: user.serie_code,
        },
        getEnv('JWT_SECRET'),
        { expiresIn: process.env.JWT_EXPIRES_IN ?? '7d' },
    );
}

export function signRefreshToken(user) {
    return jwt.sign(
        {
            sub: user.id,
            type: 'refresh',
        },
        getEnv('JWT_SECRET'),
        { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN ?? '30d' },
    );
}

export function asyncHandler(handler) {
    return async (req, res, next) => {
        try {
            await handler(req, res, next);
        } catch (error) {
            next(error);
        }
    };
}

export function getDaysUntilBac(referenceDate = new Date()) {
    const year = referenceDate.getFullYear();
    const bacDate = new Date(Date.UTC(year, 5, 10, 0, 0, 0));
    const diffMs = bacDate.getTime() - referenceDate.getTime();

    return Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
}
