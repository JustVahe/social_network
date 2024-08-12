import { Router } from "express";
import { RequestController } from "../controllers/request.controller.ts";
import { checkJWT } from "../middlewares/check.middleware.ts";

const requestRouter = Router();
const requestController = new RequestController();

requestRouter.get("/", checkJWT, requestController.getRequests.bind(requestController));
requestRouter.get("/:id", checkJWT, requestController.getRequestsById.bind(requestController));
requestRouter.post("/", checkJWT, requestController.createFriendReguest.bind(requestController));
requestRouter.put("/:id", checkJWT, requestController.updateFriendReguest.bind(requestController));
requestRouter.delete("/:id", checkJWT, requestController.deleteFriendReguest.bind(requestController));

export default requestRouter;