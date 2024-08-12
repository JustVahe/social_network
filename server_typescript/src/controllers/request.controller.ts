import { Request, Response } from "express";
import { RequestService } from "../services/requests.service.ts";

export class RequestController {

    declare requestService : RequestService;

    constructor() {
        this.requestService = new RequestService();
    }

    async getRequests(req: Request, res: Response) {
        const response = await this.requestService.getRequests(req);
        return res.status(response.statusCode as number).json(response.data);
    }

    async getRequestsById(req: Request, res: Response) {
        const response = await this.requestService.getRequestsById(req);
        return res.status(response.statusCode as number).json(response.data);
    }

    async createFriendReguest(req: Request, res: Response) {
        const response = await this.requestService.createFriendReguest(req);
        return res.status(response.statusCode as number).json(response.data);
    }

    async updateFriendReguest(req: Request, res: Response) {
        const response = await this.requestService.updateFriendReguest(req);
        return res.status(response.statusCode as number).json(response.data);
    }

    async deleteFriendReguest(req: Request, res: Response) {
        const response = await this.requestService.deleteFriendReguest(req);
        return res.status(response.statusCode as number).json(response.data);
    }
}