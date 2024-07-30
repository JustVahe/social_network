import { Router } from "express";
import { UserController } from "../controllers/user.controller.ts";
import { checkJWT } from "../middlewares/check.middleware.ts";

const userRouter = Router();
const userController = new UserController();

userRouter.get("/dashboard", checkJWT ,userController.dashboard.bind(userController));

export default userRouter;
