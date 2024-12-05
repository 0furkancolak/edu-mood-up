import { Router } from "express";
import { fileController } from "./file.module";
import { authenticateJWT } from "../../common/strategies/jwt.strategy";
import multer from "multer";
import { isAdminMiddleware, isSuperAdminMiddleware } from "../../middlewares/auth.middleware";

const fileRoutes = Router();
const upload = multer({ storage: multer.memoryStorage() });

fileRoutes.post("/upload", authenticateJWT, upload.array('files', 30), fileController.upload);

fileRoutes.post("/delete", authenticateJWT, isAdminMiddleware, fileController.deleteFiles);

fileRoutes.get("/list", authenticateJWT, isSuperAdminMiddleware, fileController.getAllFiles);

fileRoutes.get("/:category/:fileName", authenticateJWT, fileController.getFile);

export default fileRoutes;
