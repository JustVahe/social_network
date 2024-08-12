import { AuthorizationService } from "../services/authorization.service.ts";
export class AuthorizationController {
    authorizationService;
    constructor() {
        this.authorizationService = new AuthorizationService();
    }
    async login(req, res) {
        const response = await this.authorizationService.login(req);
        return res.status(response.statusCode).json(response.data);
    }
    async register(req, res) {
        const response = await this.authorizationService.register(req);
        return res.status(response.statusCode).json(response.data);
    }
    async refreshToken(req, res) {
        const response = await this.authorizationService.refreshToken(req);
        return res.status(response.statusCode).json(response.data);
    }
}
