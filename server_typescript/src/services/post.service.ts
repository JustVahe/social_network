import { Request } from "express";
import { BaseService } from "./base.service";
import { IPost } from "../utils/types/types";

const { Post } = require("../../models/index");

export class PostService extends BaseService {

    async getPosts(req: Request) {

        const { user_id, limit, offset } = req.query;

        if (user_id) {
            const posts : IPost[] = await Post.findAll({
                where: { user_id },
                include: {
                    all: true,
                    nested: true
                },
                order: [['updatedAt', 'DESC']]
            });
            return this.response({ data: posts });
        } else if (limit && offset) {
            const posts : IPost[] = await Post.findAll({
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
        })

    }

    async createPost(req: Request) {

        const { id } = req.params;
        const { message } = req.body;

        const post : IPost = await Post.create({ user_id: id, message });
        const newPost : IPost = await Post.findByPk(post.id);

        return this.response({data: newPost});
    }

}