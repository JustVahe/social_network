import { Request, Response } from "express";
import { RoomService } from "../services/room.service.ts";

export class RoomController {

    roomService: RoomService;

    constructor() {
        this.roomService = new RoomService();
    }

    async getRooms(req: Request, res: Response) {
        const response = await this.roomService.getRooms(req);
        return res.status(response.statusCode as number).json(response.data);
    }

    async createRoom(req: Request, res: Response) {
        const response = await this.roomService.createRoom(req);
        return res.status(response.statusCode as number).json(response.data);
    }

    async getRoom(req: Request, res: Response) {
        const response = await this.roomService.getRoom(req);
        return res.status(response.statusCode as number).json(response.data);
    }

    async deleteRoom(req: Request, res: Response) {
        const response = await this.roomService.deleteRoom(req);
        return res.status(response.statusCode as number).json(response.data);
    }

}