import { BaseService } from "./base.service.ts";
import { Reaction } from "../../models/index.ts";
export class ReactionService extends BaseService {
    async getReactions(req) {
        try {
            const { post_id, type, user_id } = req.query;
            if (post_id && user_id) {
                const reactions = await Reaction.findOne({
                    where: { post_id, user_id }
                });
                return this.response({ data: reactions });
            }
            else if (post_id && type) {
                const reactions = await Reaction.findAll({
                    where: { post_id, type }
                });
                return this.response({ data: reactions });
            }
            return this.response({ status: false, statusCode: 400, data: "Query parameters are required" });
        }
        catch (error) {
            const serviceError = error;
            console.error(serviceError);
            return this.serverErrorResponse(serviceError);
        }
    }
    async getReactionById(req) {
        try {
            const { id } = req.params;
            if (id) {
                const reaction = await Reaction.findOne({
                    where: { id }
                });
                return this.response({ data: reaction });
            }
            else {
                return this.response({ status: false, statusCode: 400, data: "Reaction id is required" });
            }
        }
        catch (error) {
            const serviceError = error;
            console.error(serviceError);
            return this.serverErrorResponse(serviceError);
        }
    }
    async createReaction(req) {
        try {
            const { post_id, type } = req.query;
            const { user_id } = req.body;
            if (post_id && type && user_id) {
                const reaction = await Reaction.create({ post_id, type, user_id });
                return this.response({ data: reaction });
            }
            else {
                return this.response({ status: false, statusCode: 400, data: "Query parameters are required" });
            }
        }
        catch (error) {
            const serviceError = error;
            console.error(serviceError);
            return this.serverErrorResponse(serviceError);
        }
    }
    async deleteReaction(req) {
        try {
            const { id } = req.params;
            if (id) {
                const reaction = await Reaction.findOne({
                    where: { id }
                });
                if (!reaction)
                    return this.response({ status: false, statusCode: 404, data: "Reaction wasnt found" });
                reaction.destroy();
                return this.response({ data: "OK" });
            }
            else {
                return this.response({ status: false, statusCode: 400, data: "Reaction id is required" });
            }
        }
        catch (error) {
            const serviceError = error;
            console.error(serviceError);
            return this.serverErrorResponse(serviceError);
        }
    }
}
