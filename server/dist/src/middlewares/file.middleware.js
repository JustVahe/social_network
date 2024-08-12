import multer, { memoryStorage } from "multer";
import { imageFilter } from "../utils/functions/fileFilter.ts";
export const uploadHeader = multer({
    storage: memoryStorage(),
    fileFilter: imageFilter
}).single('file');
export const uploadAvatar = multer({
    storage: memoryStorage(),
    fileFilter: imageFilter
}).single('file');
export const uploadPost = multer({
    storage: memoryStorage(),
    fileFilter: imageFilter
}).array("files", 10);
export const uploadPhotos = multer({
    storage: memoryStorage(),
    fileFilter: imageFilter
}).array("files", 10);
export const uploadPhoto = multer({
    storage: memoryStorage(),
    fileFilter: imageFilter
}).single("file");
export const uploadChatAvatar = multer({
    storage: multer.memoryStorage(),
    fileFilter: imageFilter
}).single("file");
