import { config } from "../config/app.config";
import nodemailer from "nodemailer";

type Params = {
  to: string;
  subject: string;
  text: string;
  html: string;
  from?: string;
};

const mailer_sender = `no-reply <${config.MAILER_SENDER}>`;

const transporter = nodemailer.createTransport({
  host: config.SMTP_HOST,
  port: Number(config.SMTP_PORT),
  secure: config.SMTP_SECURE === "true",
  auth: {
    user: config.SMTP_USER,
    pass: config.SMTP_PASS,
  },
});

export const sendEmail = async ({
  to,
  from = mailer_sender,
  subject,
  text,
  html,
}: Params) => {
  const info = await transporter.sendMail({
    from,
    to: to,
    subject,
    text,
    html,
  });
  if (info.messageId) {
    return {
      data: info.messageId,
    };
  }
  return {
    error: info.response,
  };
};
