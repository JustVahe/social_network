import { Router } from "express";
import { FriendsController } from "../controllers/friends.controller.ts";
import { checkJWT } from "../middlewares/check.middleware.ts";

const friendsRouter = Router();
const friendsController = new FriendsController();

friendsRouter.get("/", checkJWT, friendsController.getFriends.bind(friendsController));
friendsRouter.get("/:id", checkJWT, friendsController.getFriendsByUserId.bind(friendsController));
friendsRouter.post("/:id", checkJWT, friendsController.createFriendship.bind(friendsController));
friendsRouter.delete("/:id", checkJWT, friendsController.unfriend.bind(friendsController));

export default friendsRouter;