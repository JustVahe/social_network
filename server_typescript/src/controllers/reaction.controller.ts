import { Request, Response } from "express";
import { ReactionService } from "../services/reaction.service.ts";

export class ReactionController {

    declare reactionService : ReactionService;

    constructor(){
        this.reactionService = new ReactionService();
    }

    async getReactions(req:Request, res: Response) {
        const response = await this.reactionService.getReactions(req);
        return res.status(response.statusCode as number).json(response.data);
    }

    async getReactionById(req:Request, res: Response) {
        const response = await this.reactionService.getReactionById(req);
        return res.status(response.statusCode as number).json(response.data);
    }

    async createReaction(req:Request, res: Response) {
        const response = await this.reactionService.createReaction(req);
        return res.status(response.statusCode as number).json(response.data);
    }

    async deleteReaction(req:Request, res: Response) {
        const response = await this.reactionService.deleteReaction(req);
        return res.status(response.statusCode as number).json(response.data);
    }
}