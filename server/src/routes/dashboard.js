const router = require("express").Router();
const { sequelize, User } = require("../../models/index");
const authorization = require("../middlewares/authorization");

router.get("/", authorization, async (request, response) => {

    try {

        const user = await User.findOne({
            where : {
                user_id: request.userId
            }
        })

        return response.status(200).json(user);
        
    } catch (error) {
        
        console.log(error.message);
        return response.status(500).json(error.message);

    }

})

module.exports = router;