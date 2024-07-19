import { Request, Response } from "express";
import { UserService } from "../services/user.service";

export class UserController {

    authorizationService : UserService;

    constructor() {
        this.authorizationService = new UserService();
    }

    async dashboard (req : Request, res: Response) {
        const response = await this.authorizationService.dashboard(req);
        return res.status(response.statusCode).json(response);
    }
}