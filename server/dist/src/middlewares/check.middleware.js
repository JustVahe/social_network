import jwt from "jsonwebtoken";
import { config as dotenvConfig } from "dotenv";
dotenvConfig();
export const checkJWT = async (req, res, next) => {
    const typedRequest = req;
    const header = req.header("Authorization");
    if (!header)
        return res.status(401).json("Unauthorized: Authorization header isn't provided");
    const accessToken = header.split(" ")[1];
    if (!accessToken)
        return res.status(401).json("Unauthorized: Authorization token is required");
    try {
        const payload = jwt.verify(accessToken, process.env.accessSecret);
        typedRequest.user_id = payload.user_id;
        next();
    }
    catch (error) {
        const JWTerror = error;
        return res.status(401).json("Unauthorized: " + JWTerror.message);
    }
};
