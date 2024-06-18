const router = require("express").Router();
const { sequelize, Reply } = require("../../models/index");

router.get("/", async (request, response) => {

    try {

        const replies = await Reply.findAll({
            include: ["user", "comment"]
        });
        return response.status(200).json(replies);

    } catch (error) {

        console.log(error);
        response.status(500).json(error.message);

    }

});

router.get("/:id", async (request, response) => {

    try {

        const { id } = request.params;

        const reply = await Reply.findOne({
            include: ["user", "comment"],
            where: { id }
        });

        return response.status(200).json(reply);

    } catch (error) {

        console.log(error);
        response.status(500).json(error.message);

    }

});

router.post("/", async (request, response) => {

    try {

        const { user_id, comment_id, message } = request.body;

        const newReply = await Reply.create({
            user_id, comment_id, message
        });

        return response.status(200).json(newReply);

    } catch (error) {

        console.log(error);
        response.status(500).json(error.message);

    }

});

router.put("/:id", async (request, response) => {

    try {

        const { id } = request.params;

        const { message } = request.body;

        const reply = await Reply.findOne({
            where: { id }
        });

        reply.message = message;

        await reply.save();

        return response.status(200).json(reply);

    } catch (error) {

        console.log(error);
        response.status(500).json(error.message);

    }

});

router.delete("/:id", async (request, response) => {

    try {

        const { id } = request.params;

        const reply = await Reply.findOne({
            where: { id }
        });

        reply.destroy();

        return response.status(200).json("Reply is Destroyed")

    } catch (error) {

        console.log(error);
        response.status(500).json(error.message);

    }

});

module.exports = router;