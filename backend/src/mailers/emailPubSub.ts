import { pubSubManager } from '@/common/utils/pubsub';
import { sendEmail } from './mailer';
import { passwordResetTemplate, verifyEmailTemplate } from './templates/template';

export enum EmailEventType {
    WELCOME = 'email:welcome',
    PASSWORD_RESET = 'email:password-reset',
    VERIFICATION = 'email:verification',
    NOTIFICATION = 'email:notification',
    BULK = 'email:bulk',
    MARKETING = 'email:marketing'
}

export interface EmailEvent {
    template: string;
    data: any;
    options: {
        to: string | string[];
        subject: string;
        from?: string;
        attachments?: any[];
        cc?: string[];
        bcc?: string[];
    };
}

class EmailEventManager {
    constructor() {
        this.initializeSubscribers();
    }

    private async initializeSubscribers() {
        // Tüm email tipleri için genel bir subscriber
        for (const eventType of Object.values(EmailEventType)) {
            await pubSubManager.subscribe(eventType, async (event: EmailEvent) => {
                try {
                    const { template, data, options } = event;
                    const { html, text } = await this.renderTemplate(template, data);
                    
                    await sendEmail({
                        ...options,
                        text,
                        html
                    });
                } catch (error) {
                    console.error(`Email gönderim hatası (${eventType}):`, error);
                }
            });
        }
    }

    private async renderTemplate(template: string, data: any) {
        // Template'e göre render işlemi
        switch (template) {
            case 'password-reset':
                return passwordResetTemplate(data.lang, data.url, data.brandColor);
            case 'verify-email':
                return verifyEmailTemplate(data.url, data.brandColor);
            default:
                return {
                    text: JSON.stringify(data),
                    html: `<pre>${JSON.stringify(data, null, 2)}</pre>`
                };
        }
    }

    /**
     * Email gönderme
     * @param type Email tipi
     * @param event Email verisi
     */
    async sendEmail(type: EmailEventType, event: EmailEvent) {
        try {
            await pubSubManager.publish(type, event);
        } catch (error) {
            console.error(`Email event yayınlama hatası (${type}):`, error);
            throw error;
        }
    }

    /**
     * Toplu email gönderme
     * @param events Email olayları dizisi
     */
    async sendBulkEmail(events: { type: EmailEventType, event: EmailEvent }[]) {
        try {
            await Promise.all(
                events.map(({ type, event }) => this.sendEmail(type, event))
            );
        } catch (error) {
            console.error('Toplu email gönderim hatası:', error);
            throw error;
        }
    }
}

export const emailEventManager = new EmailEventManager(); 