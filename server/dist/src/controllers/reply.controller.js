import { ReplyService } from "../services/reply.service.ts";
export class ReplyController {
    constructor() {
        this.replyService = new ReplyService();
    }
    async getReplyById(req, res) {
        const response = await this.replyService.getReplyById(req);
        return res.status(response.statusCode).json(response.data);
    }
    async postReply(req, res) {
        const response = await this.replyService.postReply(req);
        return res.status(response.statusCode).json(response.data);
    }
    async updateReply(req, res) {
        const response = await this.replyService.updateReply(req);
        return res.status(response.statusCode).json(response.data);
    }
    async deleteReply(req, res) {
        const response = await this.replyService.deleteReply(req);
        return res.status(response.statusCode).json(response.data);
    }
}
