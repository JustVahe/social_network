import { Router } from "express";
import { checkJWT } from "../middlewares/check.middleware.ts";
import { CommentController } from "../controllers/comment.controller.ts";

const commentRouter = Router();
const commentController = new CommentController();

commentRouter.get("/:id", checkJWT, commentController.getCommentById.bind(commentController));
commentRouter.post("/", checkJWT, commentController.postComment.bind(commentController));
commentRouter.put("/:id", checkJWT, commentController.updateComment.bind(commentController));
commentRouter.delete("/:id", checkJWT, commentController.deleteComment.bind(commentController));

export default commentRouter;