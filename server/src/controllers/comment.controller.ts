import { Request, Response } from "express";
import { CommentService } from "../services/comments.service.ts";

export class CommentController {

    declare commentService : CommentService;

    constructor(){
        this.commentService = new CommentService();
    }

    async getCommentById(req: Request, res: Response) {
        const response = await this.commentService.getCommentById(req);
        return res.status(response.statusCode as number).json(response.data);
    }

    async postComment(req: Request, res: Response) {
        const response = await this.commentService.postComment(req);
        return res.status(response.statusCode as number).json(response.data);
    }

    async updateComment(req: Request, res: Response) {
        const response = await this.commentService.updateComment(req);
        return res.status(response.statusCode as number).json(response.data);
    }

    async deleteComment(req: Request, res: Response) {
        const response = await this.commentService.deleteComment(req);
        return res.status(response.statusCode as number).json(response.data);
    }
}