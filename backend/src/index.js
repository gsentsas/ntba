import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import path from 'node:path';
import process from 'node:process';

import { testDatabaseConnection } from './db/pool.js';
import { authLimiter, defaultLimiter } from './middleware/rateLimit.js';
import adminRoutes from './routes/admin.js';
import aiRoutes from './routes/ai.js';
import authRoutes from './routes/auth.js';
import chaptersRoutes from './routes/chapters.js';
import communityRoutes from './routes/community.js';
import exercisesRoutes from './routes/exercises.js';
import paymentsRoutes from './routes/payments.js';
import planningRoutes from './routes/planning.js';
import progressRoutes from './routes/progress.js';
import subjectsRoutes from './routes/subjects.js';
import { startNotificationCron } from './services/notification.service.js';
import { getDaysUntilBac } from './utils/helpers.js';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const app = express();
const PORT = Number(process.env.PORT ?? 3001);
const FRONTEND_URL = process.env.FRONTEND_URL ?? 'http://localhost:5173';

// Origines autorisées : FRONTEND_URL + localhost 5173 et 8000 en dev
const ALLOWED_ORIGINS = [
    FRONTEND_URL,
    'http://localhost:5173',
    'http://localhost:8000',
    'http://127.0.0.1:8000',
];

app.disable('x-powered-by');
app.use(
    helmet({
        contentSecurityPolicy: false,
    }),
);
app.use(
    cors({
        origin: (origin, callback) => {
            // Autoriser les requêtes sans origin (curl, Postman, mobile)
            if (!origin || ALLOWED_ORIGINS.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error(`CORS bloqué pour : ${origin}`));
            }
        },
        credentials: true,
    }),
);
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(defaultLimiter);

app.get('/health', async (_req, res) => {
    try {
        await testDatabaseConnection();
        res.json({ status: 'ok', days_until_bac: getDaysUntilBac() });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Connexion base de données indisponible',
            detail: error.message,
        });
    }
});

app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/subjects', subjectsRoutes);
app.use('/api/chapters', chaptersRoutes);
app.use('/api/exercises', exercisesRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/planning', planningRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/community', communityRoutes);
app.use('/api/payments', paymentsRoutes);
app.use('/api/admin', adminRoutes);

app.use((req, res) => {
    res.status(404).json({ message: `Route introuvable: ${req.method} ${req.originalUrl}` });
});

app.use((error, _req, res, _next) => {
    console.error('Erreur serveur:', error);
    res.status(500).json({
        message: 'Erreur serveur interne',
    });
});

app.listen(PORT, () => {
    startNotificationCron();
    console.log(`BAC Sénégal IA API démarrée sur http://localhost:${PORT}`);
});
