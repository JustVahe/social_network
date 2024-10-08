import { Router } from "express";
import { ReactionController } from "../controllers/reaction.controller.ts";
import { checkJWT } from "../middlewares/check.middleware.ts";

const reactionRouter = Router();
const reactionController = new ReactionController();

reactionRouter.get("/", checkJWT, reactionController.getReactions.bind(reactionController));
reactionRouter.get("/:id", checkJWT, reactionController.getReactionById.bind(reactionController));
reactionRouter.post("/", checkJWT, reactionController.createReaction.bind(reactionController));
reactionRouter.delete("/:id", checkJWT, reactionController.deleteReaction.bind(reactionController));

export default reactionRouter;