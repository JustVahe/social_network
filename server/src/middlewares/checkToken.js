const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (request, response, next) => {

    try {

        const accessToken  = request.header("Authorization").split(" ")[1];

        console.log(accessToken);

        if (!accessToken) {
            return response.status(401).json("Unauthorized");
        }

        const payload = jwt.verify(accessToken, process.env.accessSecret);

        request.userId = payload.userId;

        next();

    } catch (error) {
        return response.status(401).json("Unauthorized");
    }

}