import inertia from '@inertiajs/vite';
import { wayfinder } from '@laravel/vite-plugin-wayfinder';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite';

export default defineConfig({
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:3001',
                changeOrigin: true,
            },
        },
    },
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx', 'resources/js/main.tsx'],
            refresh: true,
        }),
        inertia(),
        react({
            babel: {
                plugins: ['babel-plugin-react-compiler'],
            },
        }),
        tailwindcss(),
        wayfinder({
            formVariants: true,
        }),
        VitePWA({
            registerType: 'autoUpdate',
            manifest: false, // On utilise notre manifest.json dans public/
            scope: '/bac/',  // Scope de l'app pour le Service Worker
            workbox: {
                globPatterns: ['**/*.{js,css,woff2}'],
                navigateFallback: null,  // Pas d'index.html statique — Laravel sert les pages
                runtimeCaching: [
                    {
                        urlPattern: /^https:\/\/fonts\.bunny\.net\/.*/i,
                        handler: 'CacheFirst',
                        options: { cacheName: 'bunny-fonts', expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 } },
                    },
                    {
                        urlPattern: /\/api\/(subjects|chapters|exercises|progress)/,
                        handler: 'NetworkFirst',
                        options: { cacheName: 'api-data', expiration: { maxEntries: 50, maxAgeSeconds: 60 * 60 * 2 } },
                    },
                ],
            },
            devOptions: { enabled: false },
        }),
    ],
});
