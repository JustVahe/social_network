const jwt = require("jsonwebtoken");
const accessGenerator = require("../utils/accessGenerator");
require("dotenv").config();

module.exports = async (request, response, next) => {

    try {

        if (!request.tokenStatus) {

            const { refreshToken } = request.body;

            if (!refreshToken) {
                response.status(401).json("Not Authorized: Refresh token wasn't provided.");
            }

            const payload = jwt.verify(refreshToken, process.env.refreshSecret);

            const newAccessToken = accessGenerator(payload.userId, "5s");

            request.tokens = {
                accessToken: newAccessToken,
                refreshToken,
                id: payload.userId
            }

        }

        next();

    } catch (error) {

        if (error.name === "TokenExpiredError") {
            request.tokens = "jwt_expired"
        } else {
            console.log(error);
            return response.status(500).json(error);
        }

    }

}