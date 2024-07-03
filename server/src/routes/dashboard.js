const router = require("express").Router();
const { User } = require("../../models/index");
const checkToken = require("../middlewares/checkToken");


router.get("/", checkToken, async (request, response) => {

    try {

        const user = await User.findOne({
            where: {
                id: request.userId
            },
            include: {
                all: true,
                nested: true
            }
        })

        return response.status(200).json(user);

    } catch (error) {

        console.log(error);
        return response.status(500).json(error);
    }

})

module.exports = router;