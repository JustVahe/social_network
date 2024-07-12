const router = require("express").Router();
const { Connection } = require("../../models/index");

router.post("/", async (request, response) => {

    try {
        
        const { chat_id, user_id } = request.body;
        if (!chat_id || !user_id) {
            return response.status(400).json("Chat id or user id is missing");   
        }

        const connection = await Connection.create({chat_id, user_id});
        const wholeConnection = await Connection.findOne({
            where : {id: connection.id},
            include: {all: true}
        });
        return response.status(200).json(wholeConnection);

    } catch (error) {
        console.log(error);
        return response.status(500).json(error);
    }

})

router.get("/", async (request, response) => {

    try {
        
        const connections = await Connection.findAll({include : {all: true, nested: true}});
        return response.status(200).json(connections);

    } catch (error) {
        console.log(error);
        return response.status(500).json(error);
    }

});

router.delete("/:id", async (request, response) => {

    try {

        const { id } = request.params;
        const room = await Connection.findOne({
            where: { id }
        });

        room.destroy();
        return response.status(200).json(`Chat successfully deleted`);

    } catch (error) {
        console.log(error);
        return response.status(500).json(error);
    }

});

module.exports = router;