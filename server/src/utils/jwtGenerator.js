const jwt = require("jsonwebtoken");
require("dotenv").config();

function jwtGenerator(userId) {
    
    const payload = {
        userId
    }

    return jwt.sign(payload, process.env.tokenSecret, {expiresIn: "6h"});

}

module.exports = jwtGenerator;