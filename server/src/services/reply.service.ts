import { Request } from "express";
import { Reply } from "../../models/index.ts";
import { BaseService } from "./base.service.ts";

export class ReplyService extends BaseService {

    async getReplyById(req: Request): Promise<any> {

        try {

            const { id } = req.params;

            const reply = await Reply.findOne({
                include: ["user", "comment"],
                where: { id }
            });

            return this.response({ data: reply });

        } catch (error) {
            const serviceError = error as Error;
            console.error(serviceError);
            return this.serverErrorResponse(serviceError);
        }
    }

    async postReply(req: Request): Promise<any> {

        try {

            const { user_id, comment_id, message } = req.body;
            const newReply = await Reply.create({
                user_id, comment_id, message
            });

            return this.response({ data: newReply });

        } catch (error) {
            const serviceError = error as Error;
            console.error(serviceError);
            return this.serverErrorResponse(serviceError);
        }
    }

    async updateReply(req: Request): Promise<any> {

        try {

            const { id } = req.params;
            const { message } = req.body;
            const reply = await Reply.findOne({
                where: { id }
            });

            if (!reply) return this.response({ status: false, statusCode: 404, data: "Reply not found" });
            reply.message = message;

            await reply.save();
            return this.response({ data: reply });

        } catch (error) {
            const serviceError = error as Error;
            console.error(serviceError);
            return this.serverErrorResponse(serviceError);
        }
    }

    async deleteReply(req: Request): Promise<any> {

        try {

            const { id } = req.params;
            const reply = await Reply.findOne({
                where: { id }
            });

            if (!reply) return this.response({ status: false, statusCode: 404, data: "Reply not found" });
            reply.destroy();

            return this.response({ data: "Reply id successfully deleted" });

        } catch (error) {
            const serviceError = error as Error;
            console.error(serviceError);
            return this.serverErrorResponse(serviceError);
        }
    }
}