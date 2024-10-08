import { Request } from "express";
import { BaseService } from "./base.service.ts";
import { decode } from "base64-arraybuffer";
import { supabase } from "../utils/supabase/supabaseClientConfig.ts";
import File from "../../models/file.ts";
import User from "../../models/user.ts";
import { config as dotenvConfig } from "dotenv";
import { v4 } from "uuid";

dotenvConfig();

export class FileService extends BaseService {

    async getFile(req: Request): Promise<any> {
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

    async uploadHeaderImage(req: Request): Promise<any> {

        try {

            const { user_id } = req.params;
            const user = await User.findOne({
                where: { id: user_id },
            });

            if (!req.file)
                return this.response({ status: false, statusCode: 400, data: "File type is wrong: Please upload images (jpg,png,webp,avif ...)" });

            const fileBase64 = decode(req.file.buffer.toString("base64"));
            const files = await supabase.storage.from(process.env.SUPABASE_BUCKET as string).list(`${user_id}/images/headerImg/`);
            const filename = `${user_id}-headerImg-${v4()}.${req.file.mimetype.split("/")[1]}`;

            if (files.data && files.data.length >= 1) {

                for (const file of files.data) {
                    const { error } = await supabase.storage.from(process.env.SUPABASE_BUCKET as string).remove([`${user_id}/images/headerImg/${file.name}`]);
                    if (error) throw error;
                }

                const { error } = await supabase.storage.from(process.env.SUPABASE_BUCKET as string)
                    .upload(`${user_id}/images/headerImg/${filename}`, fileBase64, {
                        upsert: true,
                        contentType: req.file.mimetype
                    });
                if (error) return this.response({
                    status: false,
                    statusCode: 400,
                    data: error.message
                });
            } else {
                const { error } = await supabase.storage.from(process.env.SUPABASE_BUCKET as string)
                    .upload(`${user_id}/images/headerImg/${filename}`, fileBase64, {
                        upsert: true,
                        contentType: req.file.mimetype
                    });
                if (error) return this.response({
                    status: false,
                    statusCode: 400,
                    data: error.message
                });
            }

            if (!user) return this.response({ status: false, statusCode: 404, data: "User not Found" });

            user.headerImg = `/${process.env.SUPABASE_BUCKET}/${user_id}/images/headerImg/${filename}`;
            user.save();
            return this.response({ data: user });

        } catch (error) {
            const serverError = error as Error;
            console.log({ error: error });
            return this.serverErrorResponse(serverError);
        }
    }

    async uploadAvatar(req: Request): Promise<any> {

        try {

            console.log(process.env.SUPABASE_BUCKET);

            const { user_id } = req.params;
            const user = await User.findOne({ where: { id: user_id }, });

            if (!req.file)
                return this.response({ status: false, statusCode: 400, data: "File type is wrong: Please upload images (jpg,png,webp,avif ...)" });

            const fileBase64 = decode(req.file.buffer.toString("base64"));
            const files = await supabase.storage.from(process.env.SUPABASE_BUCKET as string).list(`${user_id}/images/avatar/`);
            const filename = `${user_id}-avatar-${v4()}.${req.file.mimetype.split("/")[1]}`;

            if (files.data && files.data.length >= 1) {

                for (const file of files.data) {
                    const { error } = await supabase.storage.from(process.env.SUPABASE_BUCKET as string).remove([`${user_id}/images/avatar/${file.name}`]);
                    if (error) throw error;
                }

                const { error } = await supabase.storage.from(process.env.SUPABASE_BUCKET as string)
                    .upload(`${user_id}/images/avatar/${filename}`, fileBase64, {
                        upsert: true,
                        contentType: req.file.mimetype
                    });
                if (error) return this.response({ status: false, statusCode: 400, data: error.message });

            } else {
                const { error } = await supabase.storage.from(process.env.SUPABASE_BUCKET as string)
                    .upload(`${user_id}/images/avatar/${filename}`, fileBase64, {
                        upsert: true,
                        contentType: req.file.mimetype
                    });
                if (error) return this.response({ status: false, statusCode: 400, data: error.message });
            }

            if (!user) return this.response({ status: false, statusCode: 404, data: "User not Found" });

            user.avatar = `/${process.env.SUPABASE_BUCKET}/${user_id}/images/avatar/${filename}`;
            user.save();
            return this.response({ data: user });

        } catch (error) {
            const serverError = error as Error;
            console.log({ error: error });
            return this.serverErrorResponse(serverError);
        }
    }

    async uploadImagesForPost(req: Request): Promise<any> {

        try {

            const { user_id } = req.params;
            const { post_id } = req.body;
            const files = req.files;

            if (!files)
                return this.response({ status: false, statusCode: 400, data: "File type is wrong: Please upload images (jpg,png,webp,avif ...)" });

            for (const file of files as Express.Multer.File[]) {

                const [type, concreteType] = file.mimetype.split("/");
                const filename = `${post_id}-post_image-${v4()}.${concreteType}`;
                const path = `/${process.env.SUPABASE_BUCKET}/${user_id}/images/posts/${filename}`;
                const fileBase64 = decode(file.buffer.toString("base64"));

                await File.create({ user_id, post_id, path, type });

                const { error } = await supabase.storage.from(process.env.SUPABASE_BUCKET as string)
                    .upload(`${user_id}/images/posts/${filename}`, fileBase64, {
                        upsert: true,
                        contentType: file.mimetype
                    });

                if (error) return this.response({
                    status: false,
                    statusCode: 400,
                    data: `Bad Request: ${error.message}`
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

    async uploadPhoto(req: Request): Promise<any> {

        try {

            const requestFile = req.file;
            const { id } = req.params;
            const { user_id } = req.body;

            if (!requestFile)
                return this.response({ status: false, statusCode: 400, data: "File type is wrong: Please upload images (jpg,png,webp,avif ...)" });

            const file = await File.findOne({ where: { id } });
            if (!file) return this.response({ status: false, statusCode: 404, data: "No File" });

            const filename = `${id}-photo-${v4()}.${requestFile.mimetype.split("/")[1]}`;

            const [, , ...rest] = file.path.split("/");
            const path = rest.join("/");
            const newPath = `/${process.env.SUPABASE_BUCKET}/${user_id}/images/${filename}`;

            const { error: removeError } = await supabase.storage.from(process.env.SUPABASE_BUCKET as string).remove([path]);
            if (removeError) return this.response({ status: false, statusCode: 400, data: "File is not deleted : " + removeError.message });
            file.path = newPath;
            file.save();

            const fileBase64 = decode(requestFile.buffer.toString("base64"));
            const { error } = await supabase.storage.from(process.env.SUPABASE_BUCKET as string)
                .upload(`${user_id}/images/${filename}`, fileBase64, {
                    cacheControl: '300',
                    upsert: true,
                    contentType: requestFile.mimetype
                });
            if (error) return this.response({ status: false, statusCode: 400, data: "File is not deleted : " + error.message });

            const newFile = await File.findOne({ where: { id } });
            return this.response({ data: newFile as Object });

        } catch (error) {
            const serverError = error as Error;
            console.log({ error: error });
            return this.serverErrorResponse(serverError);
        }
    }

    async uploadPhotos(req: Request): Promise<any> {

        try {

            const { user_id } = req.params;
            const files = req.files;
            const newFiles = [];

            if (!files)
                return this.response({ status: false, statusCode: 400, data: "File type is wrong: Please upload images (jpg,png,webp,avif ...)" });

            for (const file of files as Express.Multer.File[]) {

                const filename = `${v4()}-photo-${v4()}.${file.mimetype.split("/")[1]}`;
                const path = `/${process.env.SUPABASE_BUCKET}/${user_id}/images/${filename}`;
                const type = file.mimetype.split("/")[0];

                const fileBase64 = decode(file.buffer.toString("base64"));

                const { data, error } = await supabase.storage.from(process.env.SUPABASE_BUCKET as string)
                    .upload(`${user_id}/images/${filename}`, fileBase64, {
                        upsert: true,
                        contentType: file.mimetype
                    });

                if (error) return this.response({ status: false, statusCode: 400, data: "File is not uploaded : " + error.message });

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

    async delete(req: Request): Promise<any> {

        try {

            const { id } = req.params;
            const file = await File.findOne({
                where: { id }
            });

            if (!file) return this.response({ status: false, statusCode: 404, data: "File not found" });
            file.destroy();

            const [, , ...rest] = file.path.split("/");
            const path = rest.join("/");

            const { error } = await supabase.storage.from(process.env.SUPABASE_BUCKET as string).remove([path]);
            if (error) return this.response({ status: false, statusCode: 400, data: "File is not deleted : " + error.message });

            return this.response({ data: "Image successfully deleted" });

        } catch (error) {
            const serverError = error as Error;
            console.log({ error: error });
            return this.serverErrorResponse(serverError);
        }
    }
}