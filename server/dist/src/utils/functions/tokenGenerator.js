import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();
export const accessTokenGenerator = (user_id, expiresIn) => {
    const secret = process.env.accessSecret;
    const payload = { user_id };
    return jwt.sign(payload, secret, { expiresIn });
};
export const refreshTokenGenerator = (user_id, expiresIn) => {
    const secret = process.env.refreshSecret;
    const payload = { user_id };
    return jwt.sign(payload, secret, { expiresIn });
};
