import { ConnectionService } from "../services/connection.service.ts";
export class ConnectionController {
    constructor() {
        this.connectionService = new ConnectionService();
    }
    async createConnection(req, res) {
        const response = await this.connectionService.createConnections(req);
        return res.status(response.statusCode).json(response.data);
    }
    async deleteConnection(req, res) {
        const response = await this.connectionService.deleteConnections(req);
        return res.status(response.statusCode).json(response.data);
    }
}
