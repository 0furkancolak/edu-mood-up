import "dotenv/config";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import { config } from "./config/app.config";
import { errorHandler } from "./middlewares/errorHandler";
import { HTTPSTATUS } from "./config/http.config";
import { asyncHandler } from "./middlewares/asyncHandler";
import authRoutes from "./modules/auth/auth.routes";
import passport from "./middlewares/passport";
import sessionRoutes from "./modules/session/session.routes";
import { authenticateJWT } from "./common/strategies/jwt.strategy";
import db from "./database/db";
import fileRoutes from "./modules/file/file.routes";
import { redis } from "./common/utils/redis";
import { pubSubManager } from "./common/utils/pubsub";

const app = express();
const BASE_PATH = config.BASE_PATH;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: config.APP_ORIGIN,
    credentials: true,
  })
);

app.use(cookieParser());
app.use(passport.initialize());

app.get(
  "/",
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.status(HTTPSTATUS.OK).json({
      message: "API is running!!!",
    });
  })
);

app.use(`${BASE_PATH}/auth`, authRoutes);
app.use(`${BASE_PATH}/session`, authenticateJWT, sessionRoutes);
app.use(`${BASE_PATH}/file`, fileRoutes);

app.use(errorHandler);

const startServer = async () => {
  try {
    await redis.ping();
    console.log('Redis connection successful');

    await db.$connect();
    console.log('Database connection successful');

    app.listen(config.PORT, () => {
      console.log(`Server listening on port ${config.PORT} in ${config.NODE_ENV}`);
    });

    await pubSubManager.subscribe('system:notifications', (data: any) => {
      console.log('System notification received:', data);
    });

  } catch (error) {
    console.error('Server startup error:', error);
    process.exit(1);
  }
};

startServer();
