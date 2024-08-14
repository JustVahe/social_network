import multer, { memoryStorage } from "multer";
import { imageFilter } from "../utils/functions/fileFilter.ts";
import { NextFunction, Request, Response } from "express";
import sharp from "sharp";

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

export const imageCompressMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    if(!req.file) return next();

    try {

        const buffer = await sharp(req.file.buffer)
            .resize(600)
            .webp({quality: 90})
            .toBuffer();
        
        req.file.buffer = buffer;
        req.file.mimetype = 'image/webp';
        req.file.originalname = req.file.originalname.replace(/\.\w+$/, '.webp');

        next();
    } catch (error) {
        const fileError = error as Error;
        return res.status(500).json("File Processing Error :" + fileError.message);
    }

}

export const avatarCompressMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    if(!req.file) return next();

    try {

        const buffer = await sharp(req.file.buffer)
            .resize(200)
            .webp({quality: 80})
            .toBuffer();
        
        req.file.buffer = buffer;
        req.file.mimetype = 'image/webp';
        req.file.originalname = req.file.originalname.replace(/\.\w+$/, '.webp');

        next();
    } catch (error) {
        const fileError = error as Error;
        return res.status(500).json("File Processing Error :" + fileError.message);
    }

}
