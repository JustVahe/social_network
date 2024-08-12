import { BaseService } from "./base.service.ts";
import Comment from "../../models/comment.ts";
export class CommentService extends BaseService {
    async getCommentById(req) {
        try {
            const { id } = req.params;
            const comment = await Comment.findOne({
                include: ["replies", "user", "post"],
                where: { id }
            });
            return this.response({ data: comment });
        }
        catch (error) {
            const serviceError = error;
            console.error(serviceError);
            return this.serverErrorResponse(serviceError);
        }
    }
    async postComment(req) {
        try {
            const { user_id, post_id, message } = req.body;
            const newComment = await Comment.create({
                user_id, post_id, message
            });
            return this.response({ data: newComment });
        }
        catch (error) {
            const serviceError = error;
            console.error(serviceError);
            return this.serverErrorResponse(serviceError);
        }
    }
    async updateComment(req) {
        try {
            const { id } = req.params;
            const { message } = req.body;
            const comment = await Comment.findOne({
                where: { id }
            });
            if (!comment)
                return this.response({ status: false, statusCode: 404, data: "Comment not found" });
            comment.message = message;
            await comment.save();
            return this.response({ data: comment });
        }
        catch (error) {
            const serviceError = error;
            console.error(serviceError);
            return this.serverErrorResponse(serviceError);
        }
    }
    async deleteComment(req) {
        try {
            const { id } = req.params;
            const comment = await Comment.findOne({
                where: { id }
            });
            if (!comment)
                return this.response({ status: false, statusCode: 404, data: "Comment not found" });
            comment.destroy();
            return this.response({ data: "Comment id successfully deleted" });
        }
        catch (error) {
            const serviceError = error;
            console.error(serviceError);
            return this.serverErrorResponse(serviceError);
        }
    }
}
