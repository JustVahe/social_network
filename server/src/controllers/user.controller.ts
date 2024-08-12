import { Request, Response } from "express";
import { UserService } from "../services/user.service.ts";

export class UserController {

    authorizationService: UserService;

    constructor() {
        this.authorizationService = new UserService();
    }

    async dashboard(req: Request, res: Response) {
        const response = await this.authorizationService.dashboard(req);
        return res.status(response.statusCode as number).json(response.data);
    }

    async getUserByQueries(req: Request, res: Response) {
        const response = await this.authorizationService.getUserByQueries(req);
        return res.status(response.statusCode as number).json(response.data);
    }

    async getUserById(req: Request, res: Response) {
        const response = await this.authorizationService.getUserById(req);
        return res.status(response.statusCode as number).json(response.data);
    }

    async updateUser(req: Request, res: Response) {
        const response = await this.authorizationService.updateUser(req);
        return res.status(response.statusCode as number).json(response.data);
    }
}