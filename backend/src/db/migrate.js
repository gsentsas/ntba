import { readFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

import { pool, testDatabaseConnection } from './pool.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function migrate() {
    const schemaPath = path.join(__dirname, 'schema.sql');
    const sql = await readFile(schemaPath, 'utf8');

    console.log('Connexion PostgreSQL...');
    await testDatabaseConnection();
    console.log('Connexion PostgreSQL OK');

    console.log('Application du schéma...');
    await pool.query(sql);
    console.log('Migration terminée');
}

migrate()
    .catch((error) => {
        console.error('Échec migration:', error);
        process.exitCode = 1;
    })
    .finally(async () => {
        await pool.end();
    });
