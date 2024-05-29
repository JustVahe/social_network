const router = require("express").Router();
const { sequelize, User } = require("../../models/index");

router.get("/", async (request, response) => {

    try {

        const users = await User.findAll({
            include: ["files", "posts", "comments"]
        });

        return response.status(200).send(users);

    } catch (error) {

        console.log(error.message);
        return response.status(500).json("Internal Server Error");

    }

});

router.get("/:username", async (request, response) => {

    try {

        const { username } = request.params;

        const user = await User.findOne({
            where: { username },
            include: ["files", "posts", "comments", "friends"]
        });

        return response.status(200).json(user);

    } catch (error) {

        console.log(error.message);
        return response.status(500).json("Internal Server Error");

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

        console.log(error.message);
        return response.status(500).json("Internal Server Error");

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

        console.log(error.message);
        return response.status(500).json("Internal Server Error");

    }

});

module.exports = router;