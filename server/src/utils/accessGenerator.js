const jwt = require("jsonwebtoken");
require("dotenv").config();

function accessGenerator(userId, expiresIn) {
    
    const payload = {
        userId
    }

    return jwt.sign(payload, process.env.accessSecret, { expiresIn });

}

module.exports = accessGenerator;