import { Request, Response } from "express";
import { ConnectionService } from "../services/connection.service.ts";

export class ConnectionController {

    declare connectionService : ConnectionService;

    constructor(){
        this.connectionService = new ConnectionService();
    }

    async createConnection(req: Request, res: Response) {
        const response = await this.connectionService.createConnections(req);
        return res.status(response.statusCode as number).json(response.data);
    }

    async deleteConnection(req: Request, res: Response) {
        const response = await this.connectionService.deleteConnections(req);
        return res.status(response.statusCode as number).json(response.data);
    }

}