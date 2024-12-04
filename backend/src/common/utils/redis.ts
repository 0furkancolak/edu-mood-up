import Redis from 'ioredis';
import { config } from '../../config/app.config';

export const redis = new Redis({
    host: config.REDIS.HOST,
    port: config.REDIS.PORT,
    password: config.REDIS.PASSWORD,
    db: config.REDIS.DB
});

export const publisher = redis.duplicate();
export const subscriber = redis.duplicate();

redis.on('error', (error) => {
    console.error('Redis Connection Error:', error);
});

publisher.on('error', (error) => {
    console.error('Redis Publisher Error:', error);
});

subscriber.on('error', (error) => {
    console.error('Redis Subscriber Error:', error);
});

redis.on('connect', () => {
    console.log('Redis connected successfully');
}); 