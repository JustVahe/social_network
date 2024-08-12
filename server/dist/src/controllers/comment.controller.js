import { CommentService } from "../services/comments.service.ts";
export class CommentController {
    constructor() {
        this.commentService = new CommentService();
    }
    async getCommentById(req, res) {
        const response = await this.commentService.getCommentById(req);
        return res.status(response.statusCode).json(response.data);
    }
    async postComment(req, res) {
        const response = await this.commentService.postComment(req);
        return res.status(response.statusCode).json(response.data);
    }
    async updateComment(req, res) {
        const response = await this.commentService.updateComment(req);
        return res.status(response.statusCode).json(response.data);
    }
    async deleteComment(req, res) {
        const response = await this.commentService.deleteComment(req);
        return res.status(response.statusCode).json(response.data);
    }
}
