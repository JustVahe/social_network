import { Request } from "express";
import { BaseService } from "./base.service.ts";
import Room from "../../models/room.ts";
import { Op } from "sequelize";
import Connection from "../../models/connection.ts";

interface IRequestQuery {
    user_id: string,
    target_id: string
}

export class RoomService extends BaseService {

    async getRooms(req: Request) {

        try {

            const requestQuery = req.query as unknown;
            const { user_id, target_id } = requestQuery as IRequestQuery;

            if (user_id && target_id) {

                console.log({ user_id, target_id });

                const room = await Room.findOne({
                    include: {
                        all: true
                    },
                    where: {
                        [Op.or]: [
                            { [Op.and]: [{ user_a_id: user_id }, { user_b_id: target_id }] },
                            { [Op.and]: [{ user_a_id: target_id }, { user_b_id: user_id }] }
                        ]
                    }
                });

                if (room) {
                    const modifiedRoom = JSON.parse(JSON.stringify(room));
                    if (modifiedRoom.user_b_id === user_id) {
                        const tempVar = modifiedRoom.user_a;
                        modifiedRoom.user_a = modifiedRoom.user_b;
                        modifiedRoom.user_b = tempVar;
                        [modifiedRoom.user_a_id, modifiedRoom.user_b_id] = [modifiedRoom.user_b_id, modifiedRoom.user_a_id];
                    }
                    return this.response({ data: modifiedRoom });
                } else {
                    return this.response({ data: room });
                }

            } else if (user_id) {

                if (!user_id) return this.response({ status: false, statusCode: 400, message: "User ID is required" })

                const rooms = await Room.findAll({
                    include: {
                        all: true
                    },
                    where: {
                        [Op.or]: [{ user_a_id: user_id }, { user_b_id: user_id }]
                    },
                    order: [['updatedAt', 'DESC']]
                });

                const chats = await Connection.findAll({
                    include: {
                        all: true,
                        nested: true
                    },
                    where: { user_id },
                    order: [['updatedAt', 'DESC']]
                });

                const modifiedRooms = [...JSON.parse(JSON.stringify(rooms)), ...JSON.parse(JSON.stringify(chats))];
                modifiedRooms.forEach(item => {
                    if (item.user_b_id && item.user_b_id === user_id) {
                        const tempVar = item.user_a;
                        item.user_a = item.user_b;
                        item.user_b = tempVar;
                        [item.user_a_id, item.user_b_id] = [item.user_b_id, item.user_a_id];
                    }
                });

                return this.response({ data: modifiedRooms });
            } else {
                return this.response({ status: false, statusCode: 400, message: "At least one user id is required" })
            }
        } catch (error) {
            const serverError = error as Error;
            console.log({ error: error });
            return this.serverErrorResponse(serverError);
        }
    }

    async getRoom(req: Request) {

        try {

            const { id } = req.params;
            const room = await Room.findOne({
                where: { id },
                include: {
                    all: true,
                    nested: true
                }
            });

            const connection = await Connection.findOne({
                where: { id },
                include: {
                    all: true,
                    nested: true
                }
            });

            if (room) return this.response({ data: room });
            if (connection) return this.response({ data: connection });
            return this.response({ status: false, statusCode: 404, message: "Room wasn't found" });

        } catch (error) {
            const serverError = error as Error;
            console.log({ error: error });
            return this.serverErrorResponse(serverError);
        }
    }

    async createRoom(req: Request) {

        try {

            const { user_a_id, user_b_id } = req.body;
            const room = await Room.create({ user_a_id, user_b_id });

            const newRoom = await Room.findOne({ where: { id: room.id }, include: { all: true } });
            return this.response({ data: room });

        } catch (error) {
            const serverError = error as Error;
            console.log({ error: error });
            return this.serverErrorResponse(serverError);
        }
    }

    async deleteRoom(req: Request) {

        try {
            const { id } = req.params;
            const room = await Room.findOne({
                where: { id }
            });

            if (!room) return this.response({ status: false, statusCode: 404, message: "Room wasn't found" });

            room.destroy();
            return this.response({ message: `Chat successfully deleted` });
        } catch (error) {
            const serverError = error as Error;
            console.log({ error: error });
            return this.serverErrorResponse(serverError);
        }
    }

}