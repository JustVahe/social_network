import jwt, { Secret } from "jsonwebtoken";
import { config } from "dotenv";

config();

export const accessTokenGenerator = (user_id : string, expiresIn: string | number) => {
    const secret = process.env.accessSecret as Secret;
    const payload = {user_id};
    return jwt.sign(payload, secret, { expiresIn });
}

export const refreshTokenGenerator = (user_id : string, expiresIn: string | number) => {
    const secret = process.env.refreshSecret as Secret;
    const payload = {user_id};
    return jwt.sign(payload, secret, { expiresIn });
}