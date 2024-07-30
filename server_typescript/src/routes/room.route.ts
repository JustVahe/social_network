import { Router } from "express";
import { RoomController } from "../controllers/room.controller.ts";
import { checkJWT } from "../middlewares/check.middleware.ts";

const roomRouter = Router();
const roomController = new RoomController();

roomRouter.get("/", checkJWT, roomController.getRooms.bind(roomController));
roomRouter.get("/:id", checkJWT, roomController.getRoom.bind(roomController));
roomRouter.post("/", checkJWT, roomController.createRoom.bind(roomController));
roomRouter.delete("/:id", checkJWT, roomController.deleteRoom.bind(roomController));


export default roomRouter;