const router = require("express").Router();
const { Op } = require("sequelize");
const { Chat } = require("../../models/index");

router.post("/", async (request, response) => {

    try {
        
        const { name } = request.body;
        if (!name) {
            return response.status(400).json("Name is required")    
        }
        const chat = await Chat.create({name});

        const wholeChat = await Chat.findOne({where : {id: chat.id}});
        return response.status(200).json(wholeChat);

    } catch (error) {
        console.log(error);
        return response.status(200).json(error);
    }

})

module.exports = router;