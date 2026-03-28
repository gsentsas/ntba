/**
 * PM2 configuration — BAC Sénégal IA
 * Gère le backend Node.js Express sur le VPS Plesk
 *
 * Usage:
 *   pm2 start ecosystem.config.cjs
 *   pm2 save && pm2 startup
 */
module.exports = {
    apps: [
        {
            name: 'bac-api',
            script: 'src/index.js',
            cwd: './backend',
            instances: 1,
            exec_mode: 'fork',
            interpreter: 'node',
            interpreter_args: '--experimental-vm-modules',
            env: {
                NODE_ENV: 'production',
                PORT: 3001,
            },
            max_memory_restart: '256M',
            error_file: '../storage/logs/pm2-api-error.log',
            out_file: '../storage/logs/pm2-api-out.log',
            log_date_format: 'YYYY-MM-DD HH:mm:ss',
            restart_delay: 3000,
            max_restarts: 10,
            watch: false,
        },
    ],
};
