import { existsSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';

import dotenv from 'dotenv';
import pg from 'pg';

const { Pool } = pg;

const envCandidates = [
    path.resolve(process.cwd(), '.env'),
    path.resolve(process.cwd(), 'backend/.env'),
];

for (const envPath of envCandidates) {
    if (existsSync(envPath)) {
        dotenv.config({ path: envPath, override: false });
    }
}

function buildDatabaseUrlFromLaravelEnv() {
    if ((process.env.DB_CONNECTION ?? '').toLowerCase() !== 'pgsql') {
        return null;
    }

    const host = process.env.DB_HOST;
    const port = process.env.DB_PORT ?? '5432';
    const database = process.env.DB_DATABASE;
    const user = process.env.DB_USERNAME;
    const password = process.env.DB_PASSWORD;

    if (!host || !database || !user) {
        return null;
    }

    const auth = password ? `${encodeURIComponent(user)}:${encodeURIComponent(password)}` : encodeURIComponent(user);
    return `postgresql://${auth}@${host}:${port}/${database}`;
}

const connectionString = process.env.DATABASE_URL ?? buildDatabaseUrlFromLaravelEnv();

if (!connectionString) {
    throw new Error(
        "Configuration PostgreSQL manquante. Définis DATABASE_URL ou DB_CONNECTION=pgsql avec DB_HOST/DB_PORT/DB_DATABASE/DB_USERNAME/DB_PASSWORD.",
    );
}

export const pool = new Pool({
    connectionString,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

pool.on('error', (error) => {
    console.error('Erreur PostgreSQL inattendue:', error);
});

export async function testDatabaseConnection() {
    const client = await pool.connect();

    try {
        await client.query('SELECT 1');
    } finally {
        client.release();
    }
}
