const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (request, response, next) => {

    try {
        
        const jwtToken = request.header("token")

        if (!jwtToken) return response.status(401).json("Not Authorized");

        const payload = jwt.verify(jwtToken, process.env.tokenSecret);

        request.userId = payload.userId;

        next();

    } catch (error) {

        console.error(error.message);
        return response.status(401).json("Not Authorized")
    
    }

}