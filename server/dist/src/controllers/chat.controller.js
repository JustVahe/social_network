import { ChatService } from "../services/chat.service.ts";
export class ChatController {
    constructor() {
        this.chatService = new ChatService();
    }
    async getChat(req, res) {
        const response = await this.chatService.getChat(req);
        return res.status(response.statusCode).json(response.data);
    }
    async createChat(req, res) {
        const response = await this.chatService.createChat(req);
        return res.status(response.statusCode).json(response.data);
    }
    async updateChat(req, res) {
        const response = await this.chatService.updateChat(req);
        return res.status(response.statusCode).json(response.data);
    }
    async updateChatAvatar(req, res) {
        const response = await this.chatService.updateChatAvatar(req);
        return res.status(response.statusCode).json(response.data);
    }
    async deleteChat(req, res) {
        const response = await this.chatService.deleteChat(req);
        return res.status(response.statusCode).json(response.data);
    }
}
