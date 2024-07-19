import { Router } from "express";
import { PostController } from "../controllers/post.controller";
import { checkJWT } from "../middlewares/check.middleware";

const postRouter = Router();
const postController = new PostController();

postRouter.get("/", checkJWT, postController.getPosts.bind(postController));
postRouter.post("/:id", checkJWT, postController.createPost.bind(postController));

export default postRouter;