import { Request } from "express";
import { BaseService } from "./base.service";
import { IPost } from "../utils/types/types";

const { Post } = require("../../models/index");

export class PostService extends BaseService {

    async getPosts(req: Request) {

        try {

            const { user_id, limit, offset } = req.query;

            if (user_id) {
                const posts: IPost[] = await Post.findAll({
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
                const posts: IPost[] = await Post.findAll({
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
                message: "Bad Request : No parameters provided"
            });

        } catch (error: unknown) {
            const serviceError = error as Error;
            console.error(serviceError);
            return this.serverErrorResponse(serviceError);
        }

    }

    async createPost(req: Request) {

        try {

            const { user_id } = req.params;
            const { message } = req.body;

            const post: IPost = await Post.create({ user_id, message });
            const newPost: IPost = await Post.findByPk(post.id, {
                include: {
                    all: true,
                    nested:true
                }
            });

            return this.response({ data: newPost });

        } catch (error: unknown) {
            const serviceError = error as Error;
            console.error(serviceError);
            return this.serverErrorResponse(serviceError);
        }
    }

    async deletePost(req: Request) {

        try {
            const { id } = req.params;
            const post = await Post.findByPk(id);
            await post.destroy();
            return this.response({ message: "Post successfully deleted" });
        } catch (error: unknown) {
            const serviceError = error as Error;
            console.error(serviceError);
            return this.serverErrorResponse(serviceError);
        }
    }

    async updatePost(req: Request) {

        try {

            const { id } = req.params;
            const { message } = req.body;

            const post = await Post.findByPk(id);
            post.message = message;
            await post.save();

            const newPost = await Post.findByPk(id, {
                include: {
                    all: true,
                    nested:true
                }
            });

            return this.response({data: newPost});

        } catch (error: unknown) {
            const serviceError = error as Error;
            console.error(serviceError);
            return this.serverErrorResponse(serviceError);
        }
    }
}