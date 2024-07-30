import { Request } from "express";
import { BaseService } from "./base.service.ts";
import { decode } from "base64-arraybuffer";
import { supabase } from "../utils/supabase/supabaseClientConfig.ts";
import { File, User } from "../../models/index.ts";

export class FileService extends BaseService {

    async getFile(req: Request) {
        try {
            const { user_id } = req.params;
            const files = await File.findAll({
                where: { user_id },
                order: [['updatedAt', 'DESC']]
            });
            return this.response({
                data: files
            });
        } catch (error: unknown) {
            const serverError = error as Error;
            return this.serverErrorResponse(serverError);
        }
    }

    async uploadHeaderImage(req: Request) {

        try {

            const { user_id } = req.params;
            const user = await User.findOne({
                where: { id: user_id },
            });

            if (!req.file)
                return this.response({ status: false, statusCode: 400, message: "File type is wrong: Please upload images (jpg,png,webp,avif ...)" });

            const fileBase64 = decode(req.file.buffer.toString("base64"));
            const files = await supabase.storage.from("assets").list(`${user_id}/images/headerImg/`);

            if (files.data && files.data.length >= 1) {
                await supabase.storage.from("assets").remove([`${user_id}/images/headerImg/`]);
                const { error } = await supabase.storage.from("assets")
                    .upload(`${user_id}/images/headerImg/${req.file.originalname}`, fileBase64, { contentType: req.file.mimetype });
                if (error) return this.response({
                    status: false,
                    statusCode: 400,
                    message: error.message
                });
            } else {
                const { error } = await supabase.storage.from("assets")
                    .upload(`${user_id}/images/headerImg/${req.file.originalname}`, fileBase64, { contentType: req.file.mimetype });
                if (error) return this.response({
                    status: false,
                    statusCode: 400,
                    message: error.message
                });
            }

            if (!user) return this.response({ status: false, statusCode: 404, message: "User not Found" });

            user.headerImg = `/assets/${user_id}/images/headerImg/${req.file.originalname}`;
            user.save();
            return this.response({ data: user, message: "Cover image upload is complete" });

        } catch (error) {
            const serverError = error as Error;
            console.log({ error: error });
            return this.serverErrorResponse(serverError);
        }
    }

    async uploadAvatar(req: Request) {

        try {

            const { user_id } = req.params;
            const user = await User.findOne({ where: { id: user_id }, });

            if (!req.file)
                return this.response({ status: false, statusCode: 400, message: "File type is wrong: Please upload images (jpg,png,webp,avif ...)" });

            const fileBase64 = decode(req.file.buffer.toString("base64"));
            const files = await supabase.storage.from("assets").list(`${user_id}/images/avatar/`);

            if (files.data && files.data.length >= 1) {
                await supabase.storage.from('assets').remove([`${user_id}/images/avatar/`]);
                const { error } = await supabase.storage.from("assets")
                    .upload(`${user_id}/images/avatar/${req.file.originalname}`, fileBase64, {
                        cacheControl: '300',
                        upsert: true,
                        contentType: req.file.mimetype
                    });
                if (error) return this.response({ status: false, statusCode: 400, message: error.message });
            } else {
                const { error } = await supabase.storage.from("assets")
                    .upload(`${user_id}/images/avatar/${req.file.originalname}`, fileBase64, {
                        cacheControl: '300',
                        upsert: true,
                        contentType: req.file.mimetype
                    });
                if (error) return this.response({ status: false, statusCode: 400, message: error.message });
            }

            if (!user) return this.response({ status: false, statusCode: 404, message: "User not Found" });

            user.avatar = `/assets/${user_id}/images/avatar/${req.file.originalname}`;
            user.save();
            return this.response({ data: user, message: "Avatar image upload is complete" });

        } catch (error) {
            const serverError = error as Error;
            console.log({ error: error });
            return this.serverErrorResponse(serverError);
        }
    }

    async uploadImagesForPost(req: Request) {

        try {

            const { user_id } = req.params;
            const { post_id } = req.body;
            const files = req.files;

            if (!files)
                return this.response({ status: false, statusCode: 400, message: "File type is wrong: Please upload images (jpg,png,webp,avif ...)" });

            for (const file of files as Express.Multer.File[]) {

                const path = `/assets/${user_id}/images/posts/${file.originalname}`;
                const [type] = file.mimetype.split("/");

                const fileBase64 = decode(file.buffer.toString("base64"));

                await File.create({ user_id, post_id, path, type });

                const { error } = await supabase.storage.from("assets")
                    .upload(`${user_id}/images/posts/${file.originalname}`, fileBase64, {
                        cacheControl: '300',
                        upsert: true,
                        contentType: file.mimetype
                    });

                if (error) return this.response({
                    status: false,
                    statusCode: 400,
                    data: error,
                    message: `Bad Request: ${error.message}`
                });
            }

            const createdFiles = await File.findAll({ where: { post_id } });
            return this.response({ data: createdFiles });

        } catch (error) {
            const serverError = error as Error;
            console.log({ error: error });
            return this.serverErrorResponse(serverError);
        }
    }

    async uploadPhoto(req: Request) {

        try {

            const requestFile = req.file;
            const { id } = req.params;
            const { user_id } = req.body;

            if (!requestFile)
                return this.response({ status: false, statusCode: 400, message: "File type is wrong: Please upload images (jpg,png,webp,avif ...)" });

            const file = await File.findOne({ where: { id } });

            if (!file) return this.response({ status: false, statusCode: 404, message: "No File" });

            const [, , ...rest] = file.path.split("/");
            const path = rest.join("/");
            const newPath = `/assets/${user_id}/images/${requestFile.originalname}`;

            const { error: removeError } = await supabase.storage.from("assets").remove([path]);
            if (removeError) return this.response({ status: false, statusCode: 400, message: "File is not deleted : " + removeError.message });
            file.path = newPath;
            file.save();

            const fileBase64 = decode(requestFile.buffer.toString("base64"));
            const { error } = await supabase.storage.from("assets")
                .upload(`${user_id}/images/${requestFile.originalname}`, fileBase64, {
                    cacheControl: '300',
                    upsert: true,
                    contentType: requestFile.mimetype
                });
            if (error) return this.response({ status: false, statusCode: 400, message: "File is not deleted : " + error.message });

            const newFile = await File.findOne({ where: { id } });
            return this.response({ data: newFile as Object });

        } catch (error) {
            const serverError = error as Error;
            console.log({ error: error });
            return this.serverErrorResponse(serverError);
        }
    }

    async uploadPhotos(req: Request) {

        try {

            const { user_id } = req.params;
            const files = req.files;
            const newFiles = [];

            if (!files)
                return this.response({ status: false, statusCode: 400, message: "File type is wrong: Please upload images (jpg,png,webp,avif ...)" });

            for (const file of files as Express.Multer.File[]) {
                const path = `/assets/${user_id}/images/${file.originalname}`;
                const type = file.mimetype.split("/")[0];

                const fileBase64 = decode(file.buffer.toString("base64"));

                const { data, error } = await supabase.storage.from("assets")
                    .upload(`${user_id}/images/${file.originalname}`, fileBase64, {
                        cacheControl: '300',
                        upsert: true,
                        contentType: file.mimetype
                    });

                if (error) return this.response({ status: false, statusCode: 400, message: "File is not deleted : " + error.message });

                const newFile = await File.create({
                    user_id,
                    path,
                    type
                });

                newFiles.push(newFile);
            }

            return this.response({ data: newFiles });
        } catch (error) {
            const serverError = error as Error;
            console.log({ error: error });
            return this.serverErrorResponse(serverError);
        }
    }

    async delete(req: Request) {

        try {

            const { id } = req.params;
            const file = await File.findOne({
                where: { id }
            });

            if (!file) return this.response({status: false, statusCode: 404, message: ""})
            file.destroy();

            const [, , ...rest] = file.path.split("/");
            const path = rest.join("/");

            const { error } = await supabase.storage.from("assets").remove([path]);
            if (error) return this.response({ status: false, statusCode: 400, message: "File is not deleted : " + error.message });

            return this.response({data : "Image successfully deleted"});

        } catch (error) {
            const serverError = error as Error;
            console.log({ error: error });
            return this.serverErrorResponse(serverError);
        }
    }
}