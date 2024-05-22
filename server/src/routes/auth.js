const router = require("express").Router();
const { sequelize, User } = require("../../models/index");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const authorization = require("../middlewares/authorization");

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
            name, surname, email, password: encryptedPassword
        })

        const token = jwtGenerator(newUser.user_id);
        response.json({ token });

    } catch (error) {
        console.log(error.message);
        return response.status(500).json(error);
    }

});

router.get("/login", async (request, response) => {

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
            });

        const token = jwtGenerator(user.user_id);

        response.json({ token });


    } catch (error) {
        return response.status(500).json(error);
    }

});

router.get("/verify", authorization, (request, response) => {

    try {

        response.json(true);
        
    } catch (error) {
        return response.status(500).json(error);
    }

})

module.exports = router;