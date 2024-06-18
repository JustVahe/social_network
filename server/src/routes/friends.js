const router = require("express").Router();
const { where, Op } = require("sequelize");
const { sequelize, Friend } = require("../../models/index");

router.get("/", async (request, response) => {

    try {

        const friends = await Friend.findAll({
            include: {
                all: true,
                nested: true
            }
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
                [Op.or] : [{user_a_id : id}, {user_b_id: id}]
            },
            include: {
                all: true,
                nested: true
            }
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

})

module.exports = router;