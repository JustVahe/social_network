import { FileFilterCallback } from "multer";
import { Request } from "express";

export const imageFilter = (req: Request, file: Express.Multer.File, callback: FileFilterCallback) => {
    const [type] = file.mimetype.split("/")
    if (type === "image") {
        callback(null,true);
    } else if (type !== "image") {
        return callback(null, false);
    }
}