import { BaseService } from "./base.service.ts";
import { Post } from "../../models/index.ts";
export class PostService extends BaseService {
    async getPosts(req) {
        try {
            const requestQuery = req.query;
            const { user_id, limit, offset } = requestQuery;
            if (user_id) {
                const posts = await Post.findAll({
                    where: { user_id },
                    include: {
                        all: true,
                        nested: true
                    },
                    order: [['updatedAt', 'DESC']]
                });
                return this.response({ data: posts });
            }
            if (limit && offset) {
                const posts = await Post.findAll({
                    include: {
                        all: true,
                        nested: true
                    },
                    limit,
                    offset,
                    order: [['updatedAt', 'DESC']]
                });
                return this.response({ data: posts });
            }
            return this.response({
                status: false,
                statusCode: 400,
                data: "Bad Request : No parameters provided"
            });
        }
        catch (error) {
            const serviceError = error;
            console.error(serviceError);
            return this.serverErrorResponse(serviceError);
        }
    }
    async getPostById(req) {
        try {
            const { id } = req.params;
            const thisPost = await Post.findOne({
                where: { id },
                include: {
                    all: true,
                    nested: true
                },
                order: [['updatedAt', 'DESC']]
            });
            return this.response({ data: thisPost });
        }
        catch (error) {
            const serviceError = error;
            console.error(serviceError);
            return this.serverErrorResponse(serviceError);
        }
    }
    async createPost(req) {
        try {
            const { user_id } = req.params;
            const { message } = req.body;
            const post = await Post.create({ user_id, message });
            const newPost = await Post.findByPk(post.id, {
                include: {
                    all: true,
                    nested: true
                }
            });
            if (!newPost)
                return this.response({ status: false, statusCode: 500, data: "Post wasn't created" });
            return this.response({ data: newPost });
        }
        catch (error) {
            const serviceError = error;
            console.error(serviceError);
            return this.serverErrorResponse(serviceError);
        }
    }
    async deletePost(req) {
        try {
            const { id } = req.params;
            const post = await Post.findByPk(id);
            if (!post)
                return this.response({ status: false, statusCode: 404, data: "Post wasn't found" });
            await post.destroy();
            return this.response({ data: "Post successfully deleted" });
        }
        catch (error) {
            const serviceError = error;
            console.error(serviceError);
            return this.serverErrorResponse(serviceError);
        }
    }
    async updatePost(req) {
        try {
            const { id } = req.params;
            const { message } = req.body;
            const post = await Post.findByPk(id);
            if (!post)
                return this.response({ status: false, statusCode: 404, data: "Post wasn't found" });
            post.message = message;
            await post.save();
            const newPost = await Post.findByPk(id, {
                include: {
                    all: true,
                    nested: true
                }
            });
            if (!newPost)
                return this.response({ status: false, statusCode: 500, data: "Post wasn't found" });
            return this.response({ data: newPost });
        }
        catch (error) {
            const serviceError = error;
            console.error(serviceError);
            return this.serverErrorResponse(serviceError);
        }
    }
}
