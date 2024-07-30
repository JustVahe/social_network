import { BaseService } from "./base.service.ts";
import { IJWTRequest } from "../utils/types/authTypes.ts";
import { Request } from "express";
import { User } from "../../models/index.ts";

export class UserService extends BaseService {

    async dashboard(req: Request) {

        const typedRequest = req as IJWTRequest<string>;
        const { user_id } = typedRequest;

        if (!user_id) return this.response({
            status: false,
            statusCode: 403,
            message: "Unauthorized : No user id provided"
        });

        const user = await User.findByPk(user_id, {
            include: { all: true }
        }) as Object;

        return this.response({ data: user });
    }
}