const jwt = require("jsonwebtoken");
require("dotenv").config();

function refreshGenerator(userId, expDate) {
    
    const payload = {
        userId
    }

    return jwt.sign(payload, process.env.refreshSecret, {expiresIn: expDate});

}

module.exports = refreshGenerator;