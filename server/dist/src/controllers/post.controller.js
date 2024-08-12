import { PostService } from "../services/post.service.ts";
export class PostController {
    postService;
    constructor() {
        this.postService = new PostService();
    }
    async getPosts(req, res) {
        const response = await this.postService.getPosts(req);
        return res.status(response.statusCode).json(response.data);
    }
    async getPostById(req, res) {
        const response = await this.postService.getPostById(req);
        return res.status(response.statusCode).json(response.data);
    }
    async createPost(req, res) {
        const response = await this.postService.createPost(req);
        return res.status(response.statusCode).json(response.data);
    }
    async updatePost(req, res) {
        const response = await this.postService.updatePost(req);
        return res.status(response.statusCode).json(response.data);
    }
    async deletePost(req, res) {
        const response = await this.postService.deletePost(req);
        return res.status(response.statusCode).json(response.data);
    }
}
