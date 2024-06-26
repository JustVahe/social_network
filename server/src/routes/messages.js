const router = require("express").Router();
const { Op } = require("sequelize");
const { Room, Message } = require("../../models/index");

router.get("/", async (request, response) => {

    try {

        const { room_id } = request.query;

        if (room_id) {

            const messages = await Message.findAll({
                where: { room_id },
                include: {
                    all: true
                }
            });

            const newMessages = JSON.parse(JSON.stringify(messages)).sort((a,b) => {
                const aDate = new Date(a.createdAt)[Symbol.toPrimitive]("number");
                const bDate = new Date(b.createdAt)[Symbol.toPrimitive]("number");
                return aDate - bDate;
            })

            console.log(newMessages);
            
            return response.status(200).json(newMessages);
        } else {
            const messages = await Message.findAll({});
            return response.status(200).json(messages);
        }

    } catch (error) {
        console.log(error);
        return response.status(500).json(error);
    }

});

router.get("/:id", async (request, response) => {
    try {

        const { id } = request.params;

        const newMessage = await Message.findOne({
            where: { id },
            include: {
                all: true
            }
        });
        return response.status(200).json(newMessage);

    } catch (error) {
        console.log(error);
        return response.status(500).json(error);
    }
})

router.post("/", async (request, response) => {

    try {

        const { room_id } = request.query;
        const { message, from_id } = request.body;

        if (room_id) {
            const newMessage = await Message.create({
                room_id, message, from_id
            });
            return response.status(200).json(newMessage);
        } else {
            return response.status(404).json("Not a valid endpoint");
        }

    } catch (error) {
        console.log(error);
        return response.status(500).json(error);
    }

})


module.exports = router;