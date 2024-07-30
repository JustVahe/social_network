import { Request } from "express";
import { BaseService } from "./base.service.ts";
import Chat from "../../models/chat.ts";
import { decode } from "base64-arraybuffer";
import { supabase } from "../utils/supabase/supabaseClientConfig.ts";
import Connection from "../../models/connection.ts";

export class ChatService extends BaseService {

    async createChat(req: Request) {

        try {

            const { name } = req.body;
            if (!name) return this.response({ status: false, statusCode: 400, message: "Name is Required" });

            const chat = await Chat.create({ name });
            const wholeChat = await Chat.findOne({
                where: { id: chat.id },
                include: { all: true }
            });

            return this.response({ data: wholeChat });

        } catch (error) {
            const serverError = error as Error;
            console.log({ error: error });
            return this.serverErrorResponse(serverError);
        }
    }

    async getChat(req: Request) {

        try {
            const { id } = req.params;
            const chat = await Chat.findOne({ where: { id }, include: { all: true, nested: true } });
            if (!chat) return this.response({ status: false, statusCode: 404, message: "Chat wasnt Found" });
            return this.response({ data: chat });
        } catch (error) {
            const serverError = error as Error;
            console.log({ error: error });
            return this.serverErrorResponse(serverError);
        }
    }

    async updateChat(req: Request) {

        interface ChatResult extends Chat {
            [key: string]: any
        }

        try {
            const { id } = req.params;
            const chat = await Chat.findOne({ where: { id }, include: { all: true, nested: true } }) as ChatResult;
            if (!chat) return this.response({ status: false, statusCode: 404, message: "Chat wasnt Found" });

            for (const key in req.body) {
                if (req.body[key]) {
                    chat[key] = req.body[key];
                }
            }

            chat.save();
            return this.response({ data: chat });
        } catch (error) {
            const serverError = error as Error;
            console.log({ error: error });
            return this.serverErrorResponse(serverError);
        }
    }

    async updateChatAvatar(req: Request) {

        try {

            const { id } = req.params;
            const chat = await Chat.findOne({ where: { id }, });
            const file = req.file;

            if (!file) return this.response({ status: false, statusCode: 400, message: "File type is wrong: Please upload images (jpg,png,webp,avif ...)" });
            if (!chat) return this.response({ status: false, statusCode: 404, message: "Chat wasnt Found" });

            const fileBase64 = decode(file.buffer.toString("base64"));

            chat.avatar = `/assets/chats/${id}/images/avatar/${file.originalname}`;
            chat.save();

            const { error } = await supabase.storage.from("assets")
                .upload(`/chats/${id}/images/avatar/${file.originalname}`, fileBase64, {
                    cacheControl: '300',
                    upsert: true,
                    contentType: file.mimetype
                });

            if (error) return this.response({ status: false, statusCode: 400, message: error.message });

            return this.response({ message: "Avatar upload is complete" });

        } catch (error) {
            const serverError = error as Error;
            console.log({ error: error });
            return this.serverErrorResponse(serverError);
        }
    }

    async deleteChat(req: Request) {

        try {

            const { id } = req.params;
            const chat = await Chat.findOne({ where: { id }, include: { all: true, nested: true } });
            const connections = await Connection.findAll({ where: { chat_id: id } });

            if (!chat) return this.response({ status: false, statusCode: 404, message: "Chat wasnt Found" });

            connections.forEach(item => item.destroy());
            chat.destroy();

            return this.response({ message: "Chat successfully deleted" });

        } catch (error) {
            const serverError = error as Error;
            console.log({ error: error });
            return this.serverErrorResponse(serverError);
        }
    }

}