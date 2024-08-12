import { BaseService } from "./base.service.ts";
import { IJWTRequest } from "../utils/types/authTypes.ts";
import { Request } from "express";
import { User } from "../../models/index.ts";
import multiparty from "multiparty"

export class UserService extends BaseService {

    async dashboard(req: Request) {

        try {

            const typedRequest = req as IJWTRequest<string>;
            const { user_id } = typedRequest;

            if (!user_id) return this.response({
                status: false,
                statusCode: 403,
                data: "Unauthorized : No user id provided"
            });

            const user = await User.findOne({
                where: { id: user_id },
                include: { all: true }
            });

            return this.response({ data: user });

        } catch (error) {
            const serverError = error as Error;
            console.log({ error: error });
            return this.serverErrorResponse(serverError);
        }
    }

    async getUserByQueries(req: Request) {

        try {

            const { username, filter, value } = req.query as { [key: string]: string };

            if (username) {

                const user = await User.findOne({
                    include: {
                        all: true,
                        nested: true
                    },
                    where: { username }
                });
                return this.response({ data: user });
            } else if (filter && value) {

                const users = await User.findAll();
                if (filter === "name") {

                    const newUsers = users.filter(item => {
                        const nameSurname = item.name + " " + item.surname;
                        return nameSurname.toLowerCase().startsWith(value);
                    });
                    return this.response({ data: newUsers });
                }
            }

            return this.response({ status: false, statusCode: 400, data: "At least one query is required" });

        } catch (error) {
            const serverError = error as Error;
            console.log({ error: error });
            return this.serverErrorResponse(serverError);
        }
    }

    async getUserById(req: Request) {

        try {

            const { id } = req.params;

            const user = await User.findOne({
                where: { id },
                include: {
                    all: true,
                    nested: true,
                }
            });

            return this.response({ data: user });

        } catch (error) {
            const serverError = error as Error;
            console.log({ error: error });
            return this.serverErrorResponse(serverError);
        }
    }

    async updateUser(req: Request) {

        try {

            const { id } = req.params;
            const form = new multiparty.Form();

            const user = await User.findOne({
                where: { id }
            });

            if (!user) return this.response({status: false, statusCode: 404, data: "User not found"});

            form.parse(req, (errors, fields, files) => {

                if (errors) {
                    Object.keys(errors).forEach(item => {
                        if (errors) {
                            return this.response({status: false, statusCode: 500, data: errors});
                        }
                    });
                }

                Object.keys(fields).forEach(item => {
                    if (item) {
                        const [itemToChange] = fields[item];
                        // @ts-ignore
                        user[item] = itemToChange;
                    };
                });
                user.save();

            });

            const newUser = await User.findOne({
                where: { id },
                include: {
                    all: true,
                    nested: true
                }
            });

            return this.response({data: newUser});

        } catch (error) {
            const serverError = error as Error;
            console.log({ error: error });
            return this.serverErrorResponse(serverError);
        }
    }
}