import { NextFunction, Request, Response } from "express";
import jwt, { JsonWebTokenError, Secret } from "jsonwebtoken";
import { config as dotenvConfig } from "dotenv";
import { IJWTPayload, IJWTRequest } from "../utils/types/authTypes";

dotenvConfig();

export const checkJWT = async (req: Request, res: Response, next: NextFunction) => {

    const typedRequest = req as IJWTRequest<string>;
    const header = req.header("Authorization");
    if (!header) return res.status(401).json("Unauthorized: Authorization header isn't provided");

    const accessToken = header.split(" ")[1];
    if (!accessToken) return res.status(401).json("Unauthorized: Authorization token is required");

    try {
        const payload = jwt.verify(accessToken, process.env.accessSecret as Secret) as IJWTPayload;
        typedRequest.user_id = payload.user_id;
        next();
    } catch (error : unknown) {
        const JWTerror = error as JsonWebTokenError;
        return res.status(401).json("Unauthorized: " + JWTerror.message);
    }

}