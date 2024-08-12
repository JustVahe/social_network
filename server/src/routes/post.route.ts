import { Router } from "express";
import { PostController } from "../controllers/post.controller.ts";
import { checkJWT } from "../middlewares/check.middleware.ts";

const postRouter = Router();
const postController = new PostController();

postRouter.get("/", checkJWT, postController.getPosts.bind(postController));
postRouter.post("/:user_id", checkJWT, postController.createPost.bind(postController));
postRouter.get("/:id",  checkJWT, postController.getPostById.bind(postController));
postRouter.put("/:id",  checkJWT, postController.updatePost.bind(postController));
postRouter.delete("/:id",  checkJWT, postController.deletePost.bind(postController));

export default postRouter;