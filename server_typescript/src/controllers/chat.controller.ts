import { Request, Response } from "express";
import { ChatService } from "../services/chat.service.ts";

export class ChatController {

    declare chatService: ChatService;

    constructor(){
        this.chatService = new ChatService();
    }

    async getChat(req: Request, res: Response) {
        const response = await this.chatService.getChat(req);
        return res.status(response.statusCode as number).json({ data: response.data, message: response.message });
    }

    async createChat(req: Request, res: Response) {
        const response = await this.chatService.createChat(req);
        return res.status(response.statusCode as number).json({ data: response.data, message: response.message });
    }

    async updateChat(req: Request, res: Response) {
        const response = await this.chatService.updateChat(req);
        return res.status(response.statusCode as number).json({ data: response.data, message: response.message });
    }

    async updateChatAvatar(req: Request, res: Response) {
        const response = await this.chatService.updateChatAvatar(req);
        return res.status(response.statusCode as number).json({ data: response.data, message: response.message });
    }

    async deleteChat(req: Request, res: Response) {
        const response = await this.chatService.deleteChat(req);
        return res.status(response.statusCode as number).json({ data: response.data, message: response.message });
    }
}