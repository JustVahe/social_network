import { Request, Response } from "express";
import { ReplyService } from "../services/reply.service.ts";

export class ReplyController {

    declare replyService : ReplyService;

    constructor(){
        this.replyService = new ReplyService();
    }

    async getReplyById(req: Request, res: Response) {
        const response = await this.replyService.getReplyById(req);
        return res.status(response.statusCode as number).json(response.data);
    }

    async postReply(req: Request, res: Response) {
        const response = await this.replyService.postReply(req);
        return res.status(response.statusCode as number).json(response.data);
    }

    async updateReply(req: Request, res: Response) {
        const response = await this.replyService.updateReply(req);
        return res.status(response.statusCode as number).json(response.data);
    }

    async deleteReply(req: Request, res: Response) {
        const response = await this.replyService.deleteReply(req);
        return res.status(response.statusCode as number).json(response.data);
    }
}