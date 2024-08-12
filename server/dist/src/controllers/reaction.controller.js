import { ReactionService } from "../services/reaction.service.ts";
export class ReactionController {
    constructor() {
        this.reactionService = new ReactionService();
    }
    async getReactions(req, res) {
        const response = await this.reactionService.getReactions(req);
        return res.status(response.statusCode).json(response.data);
    }
    async getReactionById(req, res) {
        const response = await this.reactionService.getReactionById(req);
        return res.status(response.statusCode).json(response.data);
    }
    async createReaction(req, res) {
        const response = await this.reactionService.createReaction(req);
        return res.status(response.statusCode).json(response.data);
    }
    async deleteReaction(req, res) {
        const response = await this.reactionService.deleteReaction(req);
        return res.status(response.statusCode).json(response.data);
    }
}
