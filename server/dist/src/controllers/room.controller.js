import { RoomService } from "../services/room.service.ts";
export class RoomController {
    roomService;
    constructor() {
        this.roomService = new RoomService();
    }
    async getRooms(req, res) {
        const response = await this.roomService.getRooms(req);
        return res.status(response.statusCode).json(response.data);
    }
    async createRoom(req, res) {
        const response = await this.roomService.createRoom(req);
        return res.status(response.statusCode).json(response.data);
    }
    async getRoom(req, res) {
        const response = await this.roomService.getRoom(req);
        return res.status(response.statusCode).json(response.data);
    }
    async deleteRoom(req, res) {
        const response = await this.roomService.deleteRoom(req);
        return res.status(response.statusCode).json(response.data);
    }
}
