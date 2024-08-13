import { Request } from "express";
import { BaseService } from "./base.service.ts";
import Message from "../../models/message.ts";
import { ID, IMessage } from "../utils/types/types.ts";

export class MessageService extends BaseService {

    async getMessages(req: Request): Promise<any>{
        try {

            const room_id = req.query.room_id as ID;

            if (room_id) {

                const messages = await Message.findAll({
                    where: { room_id },
                    include: {
                        all: true
                    }
                });

                const newMessages = JSON.parse(JSON.stringify(messages)).sort((a: IMessage, b: IMessage) => {
                    const aDate = new Date(a.createdAt as string)[Symbol.toPrimitive]("number");
                    const bDate = new Date(b.createdAt as string)[Symbol.toPrimitive]("number");
                    return aDate - bDate;
                });

                return this.response({ data: newMessages });
            } else {
                const messages = await Message.findAll({});
                return this.response({ data: messages });
            }

        } catch (error) {
            const serverError = error as Error;
            console.log({ error: error });
            return this.serverErrorResponse(serverError);
        }
    }

    async getMessage(req: Request): Promise<any>{
        try {

            const { id } = req.params;

            const newMessage = await Message.findOne({
                where: { id },
                include: {
                    all: true
                }
            });
            return this.response({ data: newMessage });

        } catch (error) {
            const serverError = error as Error;
            console.log({ error: error });
            return this.serverErrorResponse(serverError);
        }
    }

    async postMessage(req: Request): Promise<any>{
        try {

            const { room_id } = req.query as {room_id: string};
            const { message, from_id } = req.body as {message: string, from_id: ID};

            if (room_id) {
                const newMessage = await Message.create({
                    room_id, message, from_id
                });
                const wholeMessage = await Message.findByPk(newMessage.id, {
                    include: {
                        all : true,
                        nested: true
                    }
                });
                return this.response({ data: wholeMessage });
            } else {
                return this.response({ status: false, statusCode: 404, data: "Not a valid endpoint" });
            }

        } catch (error) {
            const serverError = error as Error;
            console.log({ error: error });
            return this.serverErrorResponse(serverError);
        }
    }

}