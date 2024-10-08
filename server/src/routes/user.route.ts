import { Router } from "express";
import { UserController } from "../controllers/user.controller.ts";
import { checkJWT } from "../middlewares/check.middleware.ts";

const userRouter = Router();
const userController = new UserController();

userRouter.get("/dashboard", checkJWT ,userController.dashboard.bind(userController));
userRouter.get("/", checkJWT, userController.getUserByQueries.bind(userController));
userRouter.get("/:id", checkJWT, userController.getUserById.bind(userController));
userRouter.put("/:id", checkJWT, userController.updateUser.bind(userController));

export default userRouter;
