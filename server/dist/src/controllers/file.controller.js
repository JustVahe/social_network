import { FileService } from "../services/file.service.ts";
export class FileController {
    fileService;
    constructor() {
        this.fileService = new FileService();
    }
    async getFile(req, res) {
        const response = await this.fileService.getFile(req);
        return res.status(response.statusCode).json(response.data);
    }
    async uploadHeaderImage(req, res) {
        const response = await this.fileService.uploadHeaderImage(req);
        return res.status(response.statusCode).json(response.data);
    }
    async uploadAvatar(req, res) {
        const response = await this.fileService.uploadAvatar(req);
        return res.status(response.statusCode).json(response.data);
    }
    async uploadImagesForPost(req, res) {
        const response = await this.fileService.uploadImagesForPost(req);
        return res.status(response.statusCode).json(response.data);
    }
    async uploadPhotos(req, res) {
        const response = await this.fileService.uploadPhotos(req);
        return res.status(response.statusCode).json(response.data);
    }
    async uploadPhoto(req, res) {
        const response = await this.fileService.uploadPhoto(req);
        return res.status(response.statusCode).json(response.data);
    }
    async delete(req, res) {
        const response = await this.fileService.delete(req);
        return res.status(response.statusCode).json(response.data);
    }
}
