import { Router } from "express"
import { FileController } from "../controllers/file.controller.ts";
import { avatarCompressMiddleware, imageCompressMiddleware, uploadAvatar, uploadHeader, uploadPhoto, uploadPhotos, uploadPost } from "../middlewares/file.middleware.ts";
import { checkJWT } from "../middlewares/check.middleware.ts";

const fileRouter = Router();
const fileController = new FileController();

fileRouter.get("/:user_id", checkJWT, fileController.getFile.bind(fileController));
fileRouter.put("/:user_id/header", checkJWT, uploadHeader, imageCompressMiddleware, fileController.uploadHeaderImage.bind(fileController));
fileRouter.put("/:user_id/avatar", checkJWT, uploadAvatar, avatarCompressMiddleware, fileController.uploadAvatar.bind(fileController));
fileRouter.post("/:user_id/post", checkJWT, uploadPost, imageCompressMiddleware, fileController.uploadImagesForPost.bind(fileController));
fileRouter.post("/:user_id", checkJWT, uploadPhotos, imageCompressMiddleware, fileController.uploadPhotos.bind(fileController));
fileRouter.put("/:id", checkJWT, uploadPhoto, imageCompressMiddleware, fileController.uploadPhoto.bind(fileController));
fileRouter.delete("/:id", checkJWT, fileController.delete.bind(fileController));

export default fileRouter;
