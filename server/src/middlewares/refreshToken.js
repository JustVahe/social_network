const jwt = require("jsonwebtoken");
const accessGenerator = require("../utils/accessGenerator");
require("dotenv").config();

module.exports = async (request, response, next) => {

    try {

        const { refreshToken } = request.body;

        if (!refreshToken) {
            response.status(401).json("Not Authorized: Refresh token wasn't provided.");
        }

        const payload = jwt.verify(refreshToken, process.env.refreshSecret);

        const newAccessToken = accessGenerator(payload.userId, "15m");
        response.status(200).json({
            accessToken: newAccessToken
        });

        next();

    } catch (error) {

        return response.status(401).json("Not Authorized");

    }

}