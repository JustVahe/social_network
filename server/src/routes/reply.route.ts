import { Router } from "express";
import { checkJWT } from "../middlewares/check.middleware.ts";
import { ReplyController } from "../controllers/reply.controller.ts";

const replyRouter = Router();
const replyController = new ReplyController();

replyRouter.get("/:id", checkJWT, replyController.getReplyById.bind(replyController));
replyRouter.post("/", checkJWT, replyController.postReply.bind(replyController));
replyRouter.put("/:id", checkJWT, replyController.updateReply.bind(replyController));
replyRouter.delete("/:id", checkJWT, replyController.deleteReply.bind(replyController));

export default replyRouter;