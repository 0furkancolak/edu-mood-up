import { Router } from "express";
import { authController } from "./auth.module";
import { authenticateJWT } from "../../common/strategies/jwt.strategy";
import { isAdminMiddleware, isSuperAdminMiddleware, isUserMiddleware } from "../../middlewares/auth.middleware";

const authRoutes = Router();

authRoutes.post("/register", authController.register);
authRoutes.post("/login", authController.login);
authRoutes.post("/verify/email", authController.verifyEmail);
authRoutes.post("/password/forgot", authController.forgotPassword);
authRoutes.post("/password/reset", authController.resetPassword);
authRoutes.post("/logout", authenticateJWT, isUserMiddleware, authController.logout);

authRoutes.get("/refresh", authController.refreshToken);

export default authRoutes;
