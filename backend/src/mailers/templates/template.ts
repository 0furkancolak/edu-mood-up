import PasswordReset from "../emails/password-reset";
import VerifyEmail from "../emails/verify-email";
import { Language } from "../utils/i18n";
import renderEmailToHtml from "../utils/renderEmail";

export const verifyEmailTemplate = async (
  url: string,
  brandColor: string = "#2563EB"
) => {
  const emailHtml = await renderEmailToHtml(VerifyEmail({ url, brandColor }));
  return {
    subject: "Confirm your EduMoodUp account",
    text: `Please verify your email address by clicking the following link: ${url}`,
    html: emailHtml,
  };
};

export const passwordResetTemplate = async (
  lang: Language,
  url: string,
  brandColor: string = "#2563EB"
) => {
  const emailHtml = await renderEmailToHtml(PasswordReset({ lang, url, brandColor }));
  return {
    subject: "Reset Your Password",
    text: `To reset your password, please click the following link: ${url}`,
    html: emailHtml,
  };
};
