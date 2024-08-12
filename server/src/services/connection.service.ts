import { Request } from "express";
import { BaseService } from "./base.service.ts";
import { Connection } from "../../models/index.ts";

export class ConnectionService extends BaseService {

    async createConnections(req: Request) {

        try {

            const { chat_id, user_id } = req.body as { [key: string]: string };
            if (!chat_id || !user_id) {
                return this.response({ status: false, statusCode: 400, data: "Chat id and user id are required" })
            }

            const connection = await Connection.create({ chat_id, user_id });
            const wholeConnection = await Connection.findOne({
                where: { id: connection.id },
                include: { all: true }
            });
            return this.response({ data: wholeConnection });


        } catch (error) {
            const serviceError = error as Error;
            console.error(serviceError);
            return this.serverErrorResponse(serviceError);
        }
    }

    async deleteConnections(req: Request) {

        try {

            const { id } = req.params;
            const room = await Connection.findOne({
                where: { id }
            });
            if (!room) return this.response({status: false, statusCode: 404, data: "Room Doesn't Found"})

            room.destroy();
            return this.response({data: `Chat successfully deleted`});

        } catch (error) {
            const serviceError = error as Error;
            console.error(serviceError);
            return this.serverErrorResponse(serviceError);
        }
    }

}