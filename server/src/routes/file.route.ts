import { Router } from "express"
import { FileController } from "../controllers/file.controller.ts";
import { uploadAvatar, uploadHeader, uploadPhoto, uploadPhotos, uploadPost } from "../middlewares/file.middleware.ts";
import { checkJWT } from "../middlewares/check.middleware.ts";

const fileRouter = Router();
const fileController = new FileController();

fileRouter.get("/:user_id", checkJWT, fileController.getFile.bind(fileController));
fileRouter.put("/:user_id/header", checkJWT, uploadHeader, fileController.uploadHeaderImage.bind(fileController));
fileRouter.put("/:user_id/avatar", checkJWT, uploadAvatar, fileController.uploadAvatar.bind(fileController));
fileRouter.post("/:user_id/post", checkJWT, uploadPost, fileController.uploadImagesForPost.bind(fileController));
fileRouter.post("/:user_id", checkJWT, uploadPhotos, fileController.uploadPhotos.bind(fileController));
fileRouter.put("/:id", checkJWT, uploadPhoto, fileController.uploadPhoto.bind(fileController));
fileRouter.delete("/:id", checkJWT, fileController.delete.bind(fileController));

export default fileRouter;