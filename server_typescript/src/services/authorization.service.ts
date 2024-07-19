import { Request } from "express";
import { BaseService } from "./base.service";
import { IJWTPayload, ILoginParameters, IRegisterParameters } from "../utils/types/authTypes";
import { IUser } from "../utils/types/types";
import bcrypt from "bcrypt"
import { accessTokenGenerator, refreshTokenGenerator } from "../utils/functions/tokenGenerator";
import { v4 } from "uuid";
import { JsonWebTokenError, Secret } from "jsonwebtoken";
import jwt from "jsonwebtoken"

const { User } = require("../../models/index");

export class AuthorizationService extends BaseService {

    async login(req: Request) {

        const { email, password }: ILoginParameters = req.body;

        const user: IUser = await User.findOne({ where: { email } });
        if (!user) return this.response({
            status: false,
            statusCode: 401,
            data: {
                type: "EmailError",
                message: `User with email of ${email} doesn't found`
            }
        });

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) this.response({
            status: false,
            statusCode: 401,
            data: {
                type: "PasswordError",
                message: "Password is incorrect"
            },
            message: "Password is incorrect"
        });

        const accessToken = accessTokenGenerator(user.id as string, "1h");
        const refreshToken = refreshTokenGenerator(user.id as string, "90d");

        return this.response({
            data: { accessToken, refreshToken },
            message: `User logged in successfully`
        });
    }

    async register(req: Request) {

        const { name, surname, email, password }: IRegisterParameters = req.body;

        const user: IUser = await User.findOne({ where: { email } });
        if (user) return this.response({
            status: false,
            statusCode: 401,
            data: {
                type: "EmailError",
                message: `User already exists`
            }
        });

        const saltRound = 8;
        const salt = await bcrypt.genSalt(saltRound);
        const encryptedPassword = await bcrypt.hash(password, salt);

        const newUser: IUser = await User.create({
            name, surname, email,
            username: name.toLowerCase() + "-" + v4().slice(0, 4),
            password: encryptedPassword
        });

        const accessToken = accessTokenGenerator(newUser.id as string, "1h");
        const refreshToken = refreshTokenGenerator(newUser.id as string, "90d");

        return this.response({
            data: { accessToken, refreshToken },
            message: `User logged in successfully`
        });
    }

    async refreshToken(req: Request) {

        const { refreshToken } = req.body;
        if (!refreshToken) return this.response({
            status: false,
            statusCode: 403,
            message: "Unauthorized: Refresh token is required"
        });

        try {
            const payload = jwt.verify(refreshToken, process.env.refreshSecret as Secret) as IJWTPayload
            const newAccessToken = accessTokenGenerator(payload.user_id, "30s");
            return this.response({
                data: { newAccessToken }
            });
        } catch (error : unknown) {
            const JWTError = error as JsonWebTokenError;
            return this.response({
                status: false,
                statusCode: 403,
                message: `Unauthorized: ${JWTError.message}`
            });
        }
    }
}