const router = require("express").Router();
const { sequelize, User } = require("../../models/index");
const bcrypt = require("bcrypt");
const accessGenerator = require("../utils/accessGenerator");
const refreshGenerator = require("../utils/refreshGenerator");
const authorization = require("../middlewares/authorization");
const jwt = require("jsonwebtoken");
const {v4} = require("uuid");

router.post("/register", async (request, response) => {

    try {

        const { name, surname, email, password } = request.body;

        const user = await User.findOne({
            where: { email }
        });

        if (user)
            return response.status(401).json({
                type: "ValidationError",
                message: "User already exists"
            });

        const saltRound = 8;

        const salt = await bcrypt.genSalt(saltRound);
        const encryptedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            name, surname, email, username: name.toLowerCase() + "-" + v4().slice(0,4), password: encryptedPassword
        });

        const accessToken = accessGenerator(newUser.id, "15m");
        const refreshToken = refreshGenerator(newUser.id, "7d");

        response
            .json({ accessToken, refreshToken});

    } catch (error) {
        console.log(error);
        return response.status(500).json({ error });
    }

});

router.post("/login", async (request, response) => {

    try {

        const { email, password } = request.body;

        const user = await User.findOne({
            where: { email }
        });

        if (!user)
            return response.status(401).json({
                type: "EmailError",
                message: `User with email of ${email} doesn't found`
            });

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword)
            return response.status(401).json({
                type: "PasswordError",
                message: "Password is incorrect"
            }
            );

        const accessToken = accessGenerator(user.id, "15m");
        const refreshToken = refreshGenerator(user.id, "7d");

        response.json({ accessToken, refreshToken });

    } catch (error) {
        console.log(error);
        return response.status(500).json({ error });
    }

});

router.get("/verify", authorization, (request, response) => {

    try {
        return response.status(200).json(true);
    } catch (error) {
        console.log(error);
        return response.status(500).json({ error });
    }

});

router.get("/refresh", async (request, response) => {

    try {

        const { refreshToken, id } = request.body;

        if (!refreshToken)
            return response.status(401).json("Not authorized");

        const decoded = jwt.verify(refreshToken, process.env.refreshSecret);

        if (!decoded)
            return response.status(403).json("Refresh Token is not valid");

        const accessToken = accessGenerator(id, "15m");

        return response.status(200).json({accessToken});

    } catch (error) {
        return response.status(500).json({ error });
    }

})

module.exports = router;