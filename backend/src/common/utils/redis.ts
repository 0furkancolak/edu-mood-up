import Redis from 'ioredis';
import { config } from '../../config/app.config';
import { logger } from './logger';

export const redis = new Redis({
    host: config.REDIS.HOST,
    port: config.REDIS.PORT,
    password: config.REDIS.PASSWORD,
    db: config.REDIS.DB
});


redis.on('error', (error) => {
    logger.error('Redis Connection Error:', error);
    console.error('Redis Connection Error:', error);
});

redis.on('connect', () => {
    console.log('Redis connected successfully');
}); 