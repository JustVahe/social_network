const router = require("express").Router();
const { sequelize, User } = require("../../models/index");
const bcrypt = require("bcrypt");
const accessGenerator = require("../utils/accessGenerator");
const refreshGenerator = require("../utils/refreshGenerator");
const { v4 } = require("uuid");
const checkToken = require("../middlewares/checkToken");

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
            name, surname, email, username: name.toLowerCase() + "-" + v4().slice(0, 4), password: encryptedPassword
        });

        const accessToken = accessGenerator(newUser.id, "25s");
        const refreshToken = refreshGenerator(newUser.id, "7d");

        response
            .json({ accessToken, refreshToken });

    } catch (error) {
        console.log(error);
        return response.status(500).json({ error });
    }

});

router.post("/login", async (request, response) => {

    try {

        const { email, password } = request.body;

        console.log(password);

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

        const accessToken = accessGenerator(user.id, "1m");

        response.json({ accessToken });

    } catch (error) {
        console.log(error);
        return response.status(500).json({ error });
    }

});

router.get("/verify", checkToken, (request, response) => {

    try {

        return response.status(200).json(true);

    } catch (error) {

        console.log(error);
        return response.status(500).json(error);

    }

});

module.exports = router;