import { Router } from "express";
import { AuthorizationController } from "../controllers/authorization.controller";

const authRouter = Router();
const authController = new AuthorizationController();

authRouter.post("/login", authController.login.bind(authController));
authRouter.post("/register", authController.register.bind(authController));
authRouter.post("/refresh", authController.refreshToken.bind(authController));

export default authRouter;