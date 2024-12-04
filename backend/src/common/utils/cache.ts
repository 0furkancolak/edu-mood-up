import { redis } from './redis';
import { config } from '../../config/app.config';

export class CacheManager {
    private defaultTTL: number;

    constructor() {
        this.defaultTTL = config.REDIS.CACHE_TTL;
    }

    /**
     * Cache'e veri kaydetme
     * @param key Cache anahtarı
     * @param data Kaydedilecek veri
     * @param ttl Saniye cinsinden yaşam süresi (opsiyonel)
     */
    async set(key: string, data: any, ttl?: number): Promise<void> {
        try {
            const serializedData = JSON.stringify(data);
            if (ttl) {
                await redis.setex(key, ttl, serializedData);
            } else {
                await redis.setex(key, this.defaultTTL, serializedData);
            }
        } catch (error) {
            console.error('Cache set error:', error);
            throw error;
        }
    }

    /**
     * Cache'den veri okuma
     * @param key Cache anahtarı
     */
    async get<T>(key: string): Promise<T | null> {
        try {
            const data = await redis.get(key);
            if (!data) return null;
            return JSON.parse(data) as T;
        } catch (error) {
            console.error('Cache read error:', error);
            throw error;
        }
    }

    /**
     * Cache'den veri silme
     * @param key Cache anahtarı
     */
    async delete(key: string): Promise<void> {
        try {
            await redis.del(key);
        } catch (error) {
            console.error('Cache delete error:', error);
            throw error;
        }
    }

    /**
     * Belirli bir pattern'e uyan tüm cache'leri silme
     * @param pattern Silinecek cache pattern'i (örn: "user:*")
     */
    async deletePattern(pattern: string): Promise<void> {
        try {
            const keys = await redis.keys(pattern);
            if (keys.length > 0) {
                await redis.del(...keys);
            }
        } catch (error) {
            console.error('Cache pattern delete error:', error);
            throw error;
        }
    }

    /**
     * Cache'de bir key'in varlığını kontrol etme
     * @param key Cache anahtarı
     */
    async exists(key: string): Promise<boolean> {
        try {
            const result = await redis.exists(key);
            return result === 1;
        } catch (error) {
            console.error('Cache check error:', error);
            throw error;
        }
    }

    /**
     * Cache'deki bir değerin süresini uzatma
     * @param key Cache anahtarı
     * @param ttl Yeni TTL süresi (saniye)
     */
    async extendTTL(key: string, ttl: number): Promise<void> {
        try {
            await redis.expire(key, ttl);
        } catch (error) {
            console.error('Cache TTL extend error:', error);
            throw error;
        }
    }
}

export const cacheManager = new CacheManager(); 