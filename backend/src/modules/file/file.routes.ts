import { Router } from "express";
import { fileController } from "./file.module";
import { authenticateJWT } from "../../common/strategies/jwt.strategy";
import multer from "multer";

const fileRoutes = Router();
const upload = multer({ storage: multer.memoryStorage() });

fileRoutes.post("/upload", authenticateJWT, upload.array('files', 30), fileController.upload);

fileRoutes.post("/delete", authenticateJWT, fileController.deleteFiles);

fileRoutes.get("/list", authenticateJWT, fileController.getAllFiles);

fileRoutes.get("/:category/:fileName", authenticateJWT, fileController.getFile);

export default fileRoutes;
