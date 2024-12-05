import { logger } from "../common/utils/logger";
import { config } from "../config/app.config";
import nodemailer from "nodemailer";
import { emailQueue } from "../common/utils/bull";

interface EmailOptions {
  to: string | string[];
  subject: string;
  text: string;
  html: string;
  from?: string;
  attachments?: any[];
  cc?: string[];
  bcc?: string[];
}

const mailer_sender = `${config.MAILER_SENDER} <${config.MAILER_SENDER_EMAIL}>`;

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: config.SMTP_HOST,
  port: Number(config.SMTP_PORT),
  secure: config.SMTP_SECURE === "true",
  auth: {
    user: config.SMTP_USER,
    pass: config.SMTP_PASS,
  },
});

export const sendEmail = async (options: EmailOptions) => {
  try {
    const info = await transporter.sendMail({
      from: options.from || mailer_sender,
      to: Array.isArray(options.to) ? options.to.join(',') : options.to,
      cc: options.cc?.join(','),
      bcc: options.bcc?.join(','),
      subject: options.subject,
      text: options.text,
      html: options.html,
      attachments: options.attachments
    });

    if (info.messageId) {
      return {
        data: info.messageId,
      };
    }
    return {
      error: info.response,
    };
  } catch (error: any) {
    logger.error('Email sending error:', error);
    console.error('Email sending error:', error);
    return {
      error: error.message
    };
  }
};

export const sendEmailWithQueue = async (options: EmailOptions) => {
  await emailQueue.add(options);
};