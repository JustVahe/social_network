import { MessageService } from "../services/message.service.ts";
export class MessageController {
    constructor() {
        this.messageService = new MessageService();
    }
    async getMessages(req, res) {
        const response = await this.messageService.getMessages(req);
        return res.status(response.statusCode).json(response.data);
    }
    async getMessage(req, res) {
        const response = await this.messageService.getMessage(req);
        return res.status(response.statusCode).json(response.data);
    }
    async postMessage(req, res) {
        const response = await this.messageService.postMessage(req);
        return res.status(response.statusCode).json(response.data);
    }
}
