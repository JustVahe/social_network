import { Router } from "express";
import { MessageController } from "../controllers/message.controller.ts";
import { checkJWT } from "../middlewares/check.middleware.ts";

const messageRouter = Router();
const messageController = new MessageController();

messageRouter.get("/", checkJWT, messageController.getMessages.bind(messageController));
messageRouter.get("/:id", checkJWT, messageController.getMessage.bind(messageController));
messageRouter.post("/", checkJWT, messageController.postMessage.bind(messageController));

export default messageRouter;
