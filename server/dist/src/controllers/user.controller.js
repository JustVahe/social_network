import { UserService } from "../services/user.service.ts";
export class UserController {
    authorizationService;
    constructor() {
        this.authorizationService = new UserService();
    }
    async dashboard(req, res) {
        const response = await this.authorizationService.dashboard(req);
        return res.status(response.statusCode).json(response.data);
    }
    async getUserByQueries(req, res) {
        const response = await this.authorizationService.getUserByQueries(req);
        return res.status(response.statusCode).json(response.data);
    }
    async getUserById(req, res) {
        const response = await this.authorizationService.getUserById(req);
        return res.status(response.statusCode).json(response.data);
    }
    async updateUser(req, res) {
        const response = await this.authorizationService.updateUser(req);
        return res.status(response.statusCode).json(response.data);
    }
}
