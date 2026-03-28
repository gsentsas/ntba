import Redis from 'ioredis';

let redisClient;
const memoryCache = new Map();

function getRedis() {
    if (redisClient) {
        return redisClient;
    }

    if (!process.env.REDIS_URL) {
        return null;
    }

    redisClient = new Redis(process.env.REDIS_URL, {
        maxRetriesPerRequest: 1,
        lazyConnect: true,
    });

    redisClient.on('error', () => {});
    return redisClient;
}

export async function getCache(key) {
    const redis = getRedis();

    if (redis) {
        try {
            await redis.connect();
            const value = await redis.get(key);
            if (value !== null) {
                return JSON.parse(value);
            }
        } catch (_error) {}
    }

    const entry = memoryCache.get(key);
    if (!entry || entry.expiresAt < Date.now()) {
        memoryCache.delete(key);
        return null;
    }

    return entry.value;
}

export async function setCache(key, value, ttlSeconds) {
    const redis = getRedis();

    if (redis) {
        try {
            await redis.set(key, JSON.stringify(value), 'EX', ttlSeconds);
            return;
        } catch (_error) {}
    }

    memoryCache.set(key, {
        value,
        expiresAt: Date.now() + ttlSeconds * 1000,
    });
}

export async function deleteCache(key) {
    const redis = getRedis();

    if (redis) {
        try {
            await redis.del(key);
        } catch (_error) {}
    }

    memoryCache.delete(key);
}
