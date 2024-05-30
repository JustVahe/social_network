const router = require("express").Router();
const { sequelize, Friend } = require("../../models/index");

router.get("/", async (request, response) => {

    try {

        const friends = await Friend.findAll({
            include: ["user_a", "user_b"]
        });
        return response.status(200).json(friends);

    } catch (error) {

        console.log(error.message);
        response.status(500).json(error.message);

    }

})

module.exports = router;