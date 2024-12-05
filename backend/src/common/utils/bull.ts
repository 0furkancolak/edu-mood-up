import Queue from "bull";
import { config } from "../../config/app.config";
import { ExpressAdapter } from "@bull-board/express";
import { createBullBoard } from "@bull-board/api";
import { BullAdapter } from "@bull-board/api/bullAdapter";
import express from "express";
import path from "path";
import basicAuth from "express-basic-auth";
import { sendEmail } from "../../mailers/mailer";

export const emailQueue = new Queue("emailQueue", {
    redis: {
        host: config.REDIS.HOST,
        port: config.REDIS.PORT,
        password: config.REDIS.PASSWORD,
        db: config.REDIS.DB,
    },
});


export function initBullBoard() {
    emailQueue.process(async (job, done) => {
        try {
            await sendEmail(job.data);
            done(null, job.data);
        } catch (error) {
            done(error as Error);
        }
    });
}

const basicAuthMiddleware = basicAuth({
    users: { [config.BULL_BOARD_USERNAME as string]: config.BULL_BOARD_PASSWORD as string },
    challenge: true,
});

const BASE_PATH = config.BASE_PATH;

const serverAdapter = new ExpressAdapter();

const { addQueue, removeQueue, setQueues, replaceQueues } = createBullBoard({
    queues: [new BullAdapter(emailQueue)],
    serverAdapter: serverAdapter,
});

serverAdapter.setBasePath(`${BASE_PATH}/admin/queues`);

const uiBasePath = path.dirname(require.resolve('@bull-board/ui/package.json'));
const staticPath = path.join(uiBasePath, 'build');

const router = express.Router();

router.use('/', express.static(staticPath, {
    index: false,
    setHeaders: (res) => {
        res.set('Content-Security-Policy', "default-src 'self' 'unsafe-inline' 'unsafe-eval' data: http: https:;");
    }
}));

router.use('/', basicAuthMiddleware,
    (req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        next();
    }, serverAdapter.getRouter());

export { router as emailQueueAdapter };
