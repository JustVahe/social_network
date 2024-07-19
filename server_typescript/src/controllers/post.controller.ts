import { Response, Request } from "express";
import { PostService } from "../services/post.service";

export class PostController {

    postService : PostService;

    constructor(){
        this.postService = new PostService();
    }

    async getPosts(req: Request, res: Response) {
        const response = await this.postService.getPosts(req);
        return res.status(response.statusCode).json(response);
    }

    async createPost(req: Request, res: Response) {
        const response = await this.postService.createPost(req);
        return res.status(response.statusCode).json(response);
    }

    async updatePost(req: Request, res: Response) {
        const response = await this.postService.updatePost(req);
        return res.status(response.statusCode).json(response);
    }

    async deletePost(req: Request, res: Response) {
        const response = await this.postService.deletePost(req);
        return res.status(response.statusCode).json(response);
    }
}