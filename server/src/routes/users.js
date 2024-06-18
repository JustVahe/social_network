const router = require("express").Router();
const { sequelize, User, Friend } = require("../../models/index");

router.get("/", async (request, response) => {

    try {

        const { username } = request.query;

        let users;

        if (username) {
            users = await User.findOne({
                include: {
                    all: true,
                    nested: true
                },
                where: { username }
            })
        } else {
            users = await User.findAll({
                include: {
                    all: true,
                    nested: true
                }
            });
        }

        return response.status(200).send(users);

    } catch (error) {

        console.log(error);
        return response.status(500).json("Internal Server Error - " + error.message);

    }

});

router.get("/:id", async (request, response) => {

    try {

        const { id } = request.params;

        const user = await User.findOne({
            where: { id },
            include: {
                all: true,
                nested: true,
            }
        });

        return response.status(200).json(user);

    } catch (error) {

        console.log(error);
        return response.status(500).json("Internal Server Error - " + error.message);

    }

});

router.put("/:id", async (request, response) => {

    try {

        const { id } = request.params;

        const body = request.body;

        const user = await User.findOne({
            where: { id }
        });

        Object.keys(body).forEach(item => {
            if (item) {
                user[item] = body[item];
            }
        });

        user.save();

        return response.json(user);

    } catch (error) {

        console.log(error);
        return response.status(500).json("Internal Server Error - " + error.message);

    }

});

router.delete("/:id", async (request, response) => {

    try {

        const { id } = request.params;

        const user = await User.findOne({
            where: { id }
        });

        user.destroy();

        return response.status(200).json(`${user.name} is deleted`);

    } catch (error) {

        console.log(error);
        return response.status(500).json("Internal Server Error - " + error.message);

    }

});

module.exports = router;