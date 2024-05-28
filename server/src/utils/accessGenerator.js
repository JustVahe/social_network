const jwt = require("jsonwebtoken");
require("dotenv").config();

function accessGenerator(userId, expDate) {
    
    const payload = {
        userId
    }

    return jwt.sign(payload, process.env.accessSecret, {expiresIn: expDate});

}

module.exports = accessGenerator;