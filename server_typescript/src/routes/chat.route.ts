import { Router } from "express";
import { ChatController } from "../controllers/chat.controller.ts";
import { checkJWT } from "../middlewares/check.middleware.ts";
import { uploadChatAvatar } from "../middlewares/file.middleware.ts";

const chatRouter = Router();
const chatController = new ChatController();

chatRouter.get("/:id", checkJWT, chatController.getChat.bind(chatController));
chatRouter.post("/", checkJWT, chatController.createChat.bind(chatController));
chatRouter.put("/:id", checkJWT, chatController.updateChat.bind(chatController));
chatRouter.put("/:id", checkJWT, uploadChatAvatar, chatController.updateChatAvatar.bind(chatController));
chatRouter.put("/:id", checkJWT, chatController.deleteChat.bind(chatController));

export default chatRouter;