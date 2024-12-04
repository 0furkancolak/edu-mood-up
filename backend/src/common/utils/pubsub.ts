import { publisher, subscriber } from './redis';

export class PubSubManager {
    private subscribers: Map<string, Set<Function>>;

    constructor() {
        this.subscribers = new Map();
        this.initializeSubscriber();
    }

    private initializeSubscriber() {
        subscriber.on('message', (channel: string, message: string) => {
            const handlers = this.subscribers.get(channel);
            if (handlers) {
                handlers.forEach(handler => {
                    try {
                        const data = JSON.parse(message);
                        handler(data);
                    } catch (error) {
                        console.error(`Message processing error (${channel}):`, error);
                    }
                });
            }
        });
    }

    /**
     * Bir kanala mesaj yayınlama
     * @param channel Kanal adı
     * @param data Yayınlanacak veri
     */
    async publish(channel: string, data: any): Promise<void> {
        try {
            const message = JSON.stringify(data);
            await publisher.publish(channel, message);
        } catch (error) {
            console.error(`Publish error (${channel}):`, error);
            throw error;
        }
    }

    /**
     * Bir kanalı dinlemeye başlama
     * @param channel Kanal adı
     * @param handler Mesaj geldiğinde çalışacak fonksiyon
     */
    async subscribe(channel: string, handler: Function): Promise<void> {
        try {
            if (!this.subscribers.has(channel)) {
                this.subscribers.set(channel, new Set());
                await subscriber.subscribe(channel);
            }
            this.subscribers.get(channel)?.add(handler);
        } catch (error) {
            console.error(`Subscription error (${channel}):`, error);
            throw error;
        }
    }

    /**
     * Bir kanalı dinlemeyi bırakma
     * @param channel Kanal adı
     * @param handler Kaldırılacak handler (opsiyonel, verilmezse tüm handler'lar kaldırılır)
     */
    async unsubscribe(channel: string, handler?: Function): Promise<void> {
        try {
            if (handler) {
                this.subscribers.get(channel)?.delete(handler);
                if (this.subscribers.get(channel)?.size === 0) {
                    await subscriber.unsubscribe(channel);
                    this.subscribers.delete(channel);
                }
            } else {
                await subscriber.unsubscribe(channel);
                this.subscribers.delete(channel);
            }
        } catch (error) {
            console.error(`Unsubscription error (${channel}):`, error);
            throw error;
        }
    }

    /**
     * Pattern tabanlı kanal dinleme
     * @param pattern Kanal pattern'i (örn: "user:*")
     * @param handler Mesaj geldiğinde çalışacak fonksiyon
     */
    async psubscribe(pattern: string, handler: Function): Promise<void> {
        try {
            if (!this.subscribers.has(pattern)) {
                this.subscribers.set(pattern, new Set());
                await subscriber.psubscribe(pattern);
            }
            this.subscribers.get(pattern)?.add(handler);
        } catch (error) {
            console.error(`Pattern subscription error (${pattern}):`, error);
            throw error;
        }
    }

    /**
     * Pattern tabanlı kanal dinlemeyi bırakma
     * @param pattern Kanal pattern'i
     */
    async punsubscribe(pattern: string): Promise<void> {
        try {
            await subscriber.punsubscribe(pattern);
            this.subscribers.delete(pattern);
        } catch (error) {
            console.error(`Pattern unsubscription error (${pattern}):`, error);
            throw error;
        }
    }
}

export const pubSubManager = new PubSubManager(); 