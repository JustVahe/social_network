import { Request, Response } from "express";
import { MessageService } from "../services/message.service.ts";

export class MessageController {
 
    declare messageService: MessageService;

    constructor() {
        this.messageService = new MessageService();
    }

    async getMessages(req: Request, res: Response) {
        const response = await this.messageService.getMessages(req);
        return res.status(response.statusCode as number).json(response.data);
    }

    async getMessage(req: Request, res: Response) {
        const response = await this.messageService.getMessage(req);
        return res.status(response.statusCode as number).json(response.data);
    }

    async postMessage(req: Request, res: Response) {
        const response = await this.messageService.postMessage(req);
        return res.status(response.statusCode as number).json(response.data);
    }

}