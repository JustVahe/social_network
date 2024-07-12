const router = require("express").Router();
const { Reaction } = require("../../models/index");

router.get("/", async (request, response) => {

    try {

        const { post_id, type, user_id } = request.query;

        if (post_id && user_id) {
            const reactions = await Reaction.findOne({
                where: { post_id, user_id }
            });
            return response.status(200).json(reactions);
        } else if (post_id && type) {
            const reactions = await Reaction.findAll({
                where: { post_id, type }
            });
            return response.status(200).json(reactions);
        } else {
            return response.status(500).json("The post id and type parameters are required");
        }

    } catch (error) {
        console.log(error);
        return response.status(500).json(error);
    }

});

router.get("/:id", async (request, response) => {

    try {

        const { id } = request.params;

        if (id) {
            const reaction = await Reaction.findOne({
                where: { id }
            });
            return response.status(200).json(reaction);
        } else {
            return response.status(500).json("Id is required");
        }

    } catch (error) {
        console.log(error);
        return response.status(500).json(error);
    }

});

router.post("/", async (request, response) => {

    try {

        const { post_id, type } = request.query;
        const { user_id } = request.body;
        
        console.log({post_id, type, user_id});

        if (post_id && type && user_id) {
            const reaction = await Reaction.create({ post_id, type, user_id });
            return response.status(200).json(reaction);
        } else {
            return response.status(500).json(new Error("The post id, type and user id parameters are required"));
        }

    } catch (error) {
        console.log(error);
        return response.status(500).json(error);
    }

});

router.delete("/:id", async (request, response) => {

    try {

        const { id } = request.params;

        if (id) {
            const reaction = await Reaction.findOne({
                where: { id }
            });
            reaction.destroy();
            return response.status(200).json("Ok");
        } else {
            return response.status(500).json("Id is required");
        }

    } catch (error) {
        console.log(error);
        return response.status(500).json(error);
    }

});

module.exports = router;