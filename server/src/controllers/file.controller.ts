import { Request, Response } from "express";
import { FileService } from "../services/file.service.ts";

export class FileController {

    fileService: FileService;

    constructor() {
        this.fileService = new FileService();
    }

    async getFile(req: Request, res: Response) {
        const response = await this.fileService.getFile(req);
        return res.status(response.statusCode as number).json(response.data);
    }

    async uploadHeaderImage(req: Request, res: Response) {
        const response = await this.fileService.uploadHeaderImage(req);
        return res.status(response.statusCode as number).json(response.data);
    }

    async uploadAvatar(req: Request, res: Response) {
        const response = await this.fileService.uploadAvatar(req);
        return res.status(response.statusCode as number).json(response.data);
    }

    async uploadImagesForPost(req: Request, res: Response) {
        const response = await this.fileService.uploadImagesForPost(req);
        return res.status(response.statusCode as number).json(response.data);
    }

    async uploadPhotos(req: Request, res: Response) {
        const response = await this.fileService.uploadPhotos(req);
        return res.status(response.statusCode as number).json(response.data);
    }

    async uploadPhoto(req: Request, res: Response) {
        const response = await this.fileService.uploadPhoto(req);
        return res.status(response.statusCode as number).json(response.data);
    }

    async delete(req: Request, res: Response) {
        const response = await this.fileService.delete(req);
        return res.status(response.statusCode as number).json(response.data);
    }
}