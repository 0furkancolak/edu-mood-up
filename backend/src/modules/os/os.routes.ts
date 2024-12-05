import { Router } from "express";
import { osController } from "./os.module";
import { authenticateJWT } from "../../common/strategies/jwt.strategy";
import { isSuperAdminMiddleware } from "../../middlewares/auth.middleware";

const osRoutes = Router();

osRoutes.use(authenticateJWT, isSuperAdminMiddleware);

osRoutes.get("/cpu", osController.getCpuUsage);
osRoutes.get("/memory", osController.getMemoryInfo);
osRoutes.get("/disk", osController.getDiskInfo);
osRoutes.get("/system", osController.getSystemInfo);
osRoutes.get("/", osController.getMetrics);

export default osRoutes;
