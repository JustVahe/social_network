const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (request, response, next) => {

    try {
        
        const accessToken = request.header("accessToken");

        if (!accessToken) return response.status(401).json("Not Authorized: Invalid Access Token");

        const payload = jwt.verify(accessToken, process.env.accessSecret);

        if (!payload) return response.status(401).json("Not Authorized: Invalid Access Token");

        request.userId = payload.userId;

        next();

    } catch (error) {

        console.error(error);
        return response.status(500).json(error.message);
    
    }

}