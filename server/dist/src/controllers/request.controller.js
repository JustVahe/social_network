import { RequestService } from "../services/requests.service.ts";
export class RequestController {
    constructor() {
        this.requestService = new RequestService();
    }
    async getRequests(req, res) {
        const response = await this.requestService.getRequests(req);
        return res.status(response.statusCode).json(response.data);
    }
    async getRequestsById(req, res) {
        const response = await this.requestService.getRequestsById(req);
        return res.status(response.statusCode).json(response.data);
    }
    async createFriendReguest(req, res) {
        const response = await this.requestService.createFriendReguest(req);
        return res.status(response.statusCode).json(response.data);
    }
    async updateFriendReguest(req, res) {
        const response = await this.requestService.updateFriendReguest(req);
        return res.status(response.statusCode).json(response.data);
    }
    async deleteFriendReguest(req, res) {
        const response = await this.requestService.deleteFriendReguest(req);
        return res.status(response.statusCode).json(response.data);
    }
}
