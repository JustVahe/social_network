const router = require("express").Router();
const { Op } = require("sequelize");
const { sequelize, Friend, Request } = require("../../models/index");

router.get("/", async (request, response) => {

    try {

        const friends = await Friend.findAll({
            include: ["user_a","user_b"]
        })

        return response.status(200).json(friends);

    } catch (error) {
        console.log(error);
        return response.status(500).json(error);
    }

});

router.get("/:id", async (request, response) => {

    try {

        const { id } = request.params;

        const friends = await Friend.findAll({
            where: {
                [Op.or]: [{ user_a_id: id }, { user_b_id: id }]
            },
            include: ["user_a","user_b"]
        });

        const respectedFriends = JSON.parse(JSON.stringify(friends));

        respectedFriends.map(item => {
            if (item.user_b_id === id) {

                [item.user_a_id, item.user_b_id] = [item.user_b_id, item.user_a_id];

                const tempVar = item.user_a;
                item.user_a = item.user_b;
                item.user_b = tempVar;

            }
        });

        return response.status(200).json(respectedFriends);

    } catch (error) {
        console.log(error);
        return response.status(500).json(error);
    }

});

router.post("/:id", async (request, response) => {

    try {

        const { id } = request.params;

        const requestOfThisFriend = await Request.findOne({
            where: { id }
        });

        const friend = await Friend.create({
            user_a_id: requestOfThisFriend.from_id,
            user_b_id: requestOfThisFriend.to_id
        });

        return response.status(200).json(friend);

    } catch (error) {
        console.log(error);
        return response.status(500).json(error);
    }

})

module.exports = router;