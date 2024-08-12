import { FriendsService } from "../services/friends.service.ts";
export class FriendsController {
    constructor() {
        this.friendsService = new FriendsService();
    }
    async getFriends(req, res) {
        const response = await this.friendsService.getFriends(req);
        return res.status(response.statusCode).json(response.data);
    }
    async getFriendsByUserId(req, res) {
        const response = await this.friendsService.getFriendsByUserId(req);
        return res.status(response.statusCode).json(response.data);
    }
    async createFriendship(req, res) {
        const response = await this.friendsService.createFriendship(req);
        return res.status(response.statusCode).json(response.data);
    }
    async unfriend(req, res) {
        const response = await this.friendsService.unfriend(req);
        return res.status(response.statusCode).json(response.data);
    }
}
