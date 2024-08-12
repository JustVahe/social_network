import { BaseService } from "./base.service.ts";
import bcrypt from "bcrypt";
import { accessTokenGenerator, refreshTokenGenerator } from "../utils/functions/tokenGenerator.ts";
import { v4 } from "uuid";
import jwt from "jsonwebtoken";
import User from "../../models/user.ts";
export class AuthorizationService extends BaseService {
    async login(req) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ where: { email } });
            if (!user)
                return this.response({
                    status: false,
                    statusCode: 401,
                    data: {
                        type: "EmailError",
                        message: `User with email of ${email} doesn't found`
                    }
                });
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword)
                this.response({
                    status: false,
                    statusCode: 401,
                    data: {
                        type: "PasswordError",
                        message: "Password is incorrect"
                    }
                });
            const accessToken = accessTokenGenerator(user.id, "1h");
            const refreshToken = refreshTokenGenerator(user.id, "90d");
            return this.response({
                data: { accessToken, refreshToken }
            });
        }
        catch (error) {
            const serviceError = error;
            console.error(serviceError);
            return this.serverErrorResponse(serviceError);
        }
    }
    async register(req) {
        try {
            const { name, surname, email, password } = req.body;
            const user = await User.findOne({ where: { email } });
            if (user)
                return this.response({
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
            const newUser = await User.create({
                name, surname, email,
                username: name.toLowerCase() + "-" + v4().slice(0, 4),
                password: encryptedPassword
            });
            const accessToken = accessTokenGenerator(newUser.id, "1h");
            const refreshToken = refreshTokenGenerator(newUser.id, "90d");
            return this.response({
                data: { accessToken, refreshToken }
            });
        }
        catch (error) {
            const serviceError = error;
            console.error(serviceError);
            return this.serverErrorResponse(serviceError);
        }
    }
    async refreshToken(req) {
        const { refreshToken } = req.body;
        if (!refreshToken)
            return this.response({
                status: false,
                statusCode: 403,
                data: "Unauthorized: Refresh token is required",
            });
        try {
            const payload = jwt.verify(refreshToken, process.env.refreshSecret);
            const newAccessToken = accessTokenGenerator(payload.user_id, "1h");
            return this.response({
                data: { newAccessToken }
            });
        }
        catch (error) {
            const JWTError = error;
            return this.response({
                status: false,
                statusCode: 403,
                data: `Unauthorized: ${JWTError.message}`
            });
        }
    }
}
