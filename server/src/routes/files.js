const router = require("express").Router();
const { sequelize, File } = require("../../models/index");

router.get("/:user_id", async (request, response) => {

    try {

        const { user_id } = request.params;

        const files = await File.findAll({
            where : {user_id}
        })

        return response.status(200).json(files);
        
    } catch (error) {
        
        console.log(error.message);
        return response.status(500).json(error.message);

    }

})

module.exports = router;

