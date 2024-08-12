import { Response, Request } from "express";
import { PostService } from "../services/post.service.ts";

export class PostController {

    postService: PostService;

    constructor() {
        this.postService = new PostService();
    }

    async getPosts(req: Request, res: Response) {
        const response = await this.postService.getPosts(req);
        return res.status(response.statusCode as number).json(response.data);
    }

    async getPostById(req: Request, res: Response) {
        const response = await this.postService.getPostById(req);
        return res.status(response.statusCode as number).json(response.data);
    }

    async createPost(req: Request, res: Response) {
        const response = await this.postService.createPost(req);
        return res.status(response.statusCode as number).json(response.data);
    }

    async updatePost(req: Request, res: Response) {
        const response = await this.postService.updatePost(req);
        return res.status(response.statusCode as number).json(response.data);
    }

    async deletePost(req: Request, res: Response) {
        const response = await this.postService.deletePost(req);
        return res.status(response.statusCode as number).json(response.data);
    }
}