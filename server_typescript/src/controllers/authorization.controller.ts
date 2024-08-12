import { Response, Request } from "express";
import { AuthorizationService } from "../services/authorization.service.ts";

export class AuthorizationController {

    authorizationService: AuthorizationService;

    constructor() {
        this.authorizationService = new AuthorizationService();
    }

    async login(req: Request, res: Response) {
        const response = await this.authorizationService.login(req);
        return res.status(response.statusCode as number).json(response.data);
    }

    async register(req: Request, res: Response) {
        const response = await this.authorizationService.register(req);
        return res.status(response.statusCode as number).json(response.data);
    }

    async refreshToken(req: Request, res: Response) {
        const response = await this.authorizationService.refreshToken(req);
        return res.status(response.statusCode as number).json(response.data);
    }

}
