const router = require("express").Router();
const { sequelize, Friend } = require("../../models/index");

router.get("/", async (request, response) => {

    try {

        const { status, user_b_id } = request.query;


        let friends;

        if (status) {
            friends = await Friend.findAll({
                where: { status },
                include: ["user_a", "user_b"]
            });
        } else if (user_b_id) {
            friends = await Friend.findAll({
                where: { user_b_id },
                include: ["user_a", "user_b"]
            });
        } else if (status && user_b_id) {
            friends = await Friend.findAll({
                where: { status, user_b_id },
                include: ["user_a", "user_b"]
            });
        } else {
            friends = await Friend.findAll({
                include: ["user_a", "user_b"]
            });
        }
        
        return response.status(200).json(friends);

    } catch (error) {

        console.log(error.message);
        response.status(500).json(error.message);

    }

});

router.get("/:user_a_id", async (request, response) => {

    try {

        const { user_a_id } = request.params;

        const friends = await Friend.findAll({
            where: { user_a_id },
            include: ["user_a", "user_b"]
        });

        return response.status(200).json(friends);

    } catch (error) {

        console.log(error.message);
        response.status(500).json(error.message);

    }
});

module.exports = router;