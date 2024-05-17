import { IUser } from './types/types';
import {Secret, sign} from "jsonwebtoken";
import { config } from "dotenv";

config();

export const jwtGenerator = (user : IUser) => {

    const payload = {
        user: user.id
    }

    const secret = process.env.jwtSecret as Secret;

    return sign(payload, secret, {expiresIn: "6hr"})

} 