import { getEnv } from "../common/utils/get-env";

const appConfig = () => ({
  NODE_ENV: getEnv("NODE_ENV", "development"),
  CORS_ORIGIN: getEnv("CORS_ORIGIN", "http://localhost:3000"),
  APP_ORIGIN: getEnv("APP_ORIGIN", "http://localhost:8000"),
  PORT: getEnv("PORT", "8000"),
  BASE_PATH: getEnv("BASE_PATH", "/api/v1"),
  JWT: {
    SECRET: getEnv("JWT_SECRET"),
    EXPIRES_IN: getEnv("JWT_EXPIRES_IN", "15m"),
    REFRESH_SECRET: getEnv("JWT_REFRESH_SECRET"),
    REFRESH_EXPIRES_IN: getEnv("JWT_REFRESH_EXPIRES_IN", "30d"),
  },
  SMTP_HOST: getEnv("SMTP_HOST"),
  SMTP_PORT: getEnv("SMTP_PORT", "465"),
  SMTP_SECURE: getEnv("SMTP_SECURE", "true"),
  SMTP_USER: getEnv("SMTP_USER"),
  SMTP_PASS: getEnv("SMTP_PASS"),
  MAILER_SENDER: getEnv("MAILER_SENDER"),
  MAILER_SENDER_EMAIL: getEnv("MAILER_SENDER_EMAIL"),
  BULL_BOARD_USERNAME: getEnv("BULL_BOARD_USERNAME", "admin"),
  BULL_BOARD_PASSWORD: getEnv("BULL_BOARD_PASSWORD", "admin123"),
  REDIS: {
    HOST: getEnv("REDIS_HOST", "localhost"),
    PORT: parseInt(getEnv("REDIS_PORT", "6379")),
    PASSWORD: getEnv("REDIS_PASSWORD", "root"),
    DB: parseInt(getEnv("REDIS_DB", "0")),
    CACHE_TTL: parseInt(getEnv("REDIS_CACHE_TTL", "3600")),
  }
});

export const config = appConfig();
