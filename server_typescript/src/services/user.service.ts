import { BaseService } from "./base.service";
import { IJWTRequest } from "../utils/types/authTypes";
import { Request } from "express";

const { User } = require("../../models/index.ts");

export class UserService extends BaseService {

    async dashboard(req: Request) {

        const typedRequest =  req as IJWTRequest<string>;
        const { user_id } = typedRequest;

        if (!user_id) return this.response({
            status: false,
            statusCode: 403,
            message: "Unauthorized : No user id provided"
        });

        const user = await User.findByPk(user_id, {
            include: { all: true }
        });

        return this.response({ data: user });
    }
}