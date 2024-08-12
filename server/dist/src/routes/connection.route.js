import { Router } from "express";
import { ConnectionController } from "../controllers/connection.controller.ts";
import { checkJWT } from "../middlewares/check.middleware.ts";
const connectionRouter = Router();
const connectionController = new ConnectionController();
connectionRouter.post("/", checkJWT, connectionController.createConnection.bind(connectionController));
connectionRouter.delete("/:id", checkJWT, connectionController.deleteConnection.bind(connectionController));
export default connectionRouter;
