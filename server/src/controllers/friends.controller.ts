import { Request, Response } from "express";
import { FriendsService } from "../services/friends.service.ts";

export class FriendsController {

    declare friendsService: FriendsService;

    constructor(){
        this.friendsService = new FriendsService();
    }

    async getFriends(req: Request, res: Response) {
        const response = await this.friendsService.getFriends(req);
        return res.status(response.statusCode as number).json(response.data);
    }

    async getFriendsByUserId(req: Request, res: Response) {
        const response = await this.friendsService.getFriendsByUserId(req);
        return res.status(response.statusCode as number).json(response.data);
    }

    async createFriendship(req: Request, res: Response) {
        const response = await this.friendsService.createFriendship(req);
        return res.status(response.statusCode as number).json(response.data);
    }

    async unfriend(req: Request, res: Response) {
        const response = await this.friendsService.unfriend(req);
        return res.status(response.statusCode as number).json(response.data);
    }
}