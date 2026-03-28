import cron from 'node-cron';
import webPush from 'web-push';

import { pool } from '../db/pool.js';

let notificationsCronStarted = false;

function configureWebPush() {
    if (
        process.env.VAPID_PUBLIC_KEY &&
        process.env.VAPID_PRIVATE_KEY &&
        process.env.VAPID_EMAIL &&
        !process.env.VAPID_PUBLIC_KEY.includes('GENERER') &&
        !process.env.VAPID_PRIVATE_KEY.includes('GENERER')
    ) {
        webPush.setVapidDetails(process.env.VAPID_EMAIL, process.env.VAPID_PUBLIC_KEY, process.env.VAPID_PRIVATE_KEY);
        return true;
    }

    return false;
}

export async function sendPushNotification(subscription, payload) {
    if (!configureWebPush()) {
        return { delivered: false, reason: 'VAPID non configuré' };
    }

    try {
        await webPush.sendNotification(typeof subscription === 'string' ? JSON.parse(subscription) : subscription, JSON.stringify(payload));
        return { delivered: true };
    } catch (error) {
        return { delivered: false, reason: error.message };
    }
}

export function startNotificationCron() {
    if (notificationsCronStarted) {
        return;
    }

    notificationsCronStarted = true;

    cron.schedule('0 18 * * *', async () => {
        const result = await pool.query(
            `
                SELECT id, prenom, push_subscription
                FROM users
                WHERE push_subscription IS NOT NULL
            `,
        );

        for (const user of result.rows) {
            await sendPushNotification(user.push_subscription, {
                title: 'BAC Sénégal IA',
                body: `Bonsoir ${user.prenom}, pense à vérifier ton planning de révision.`,
            });
        }
    });
}
