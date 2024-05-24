const router = require("express").Router();
const { sequelize, Comment } = require("../../models/index");

router.get("/", async (request, response) => {

    try {

        const comments = await Comment.findAll({
            include: ["replies", "user", "post"]
        });
        return response.status(200).json(comments);

    } catch (error) {

        console.log(error.message);
        response.status(500).json(error.message);

    }

});

router.get("/:id", async (request, response) => {

    try {

        const { id } = request.params;

        const comments = await Comment.findOne({
            include: ["replies", "user", "post"],
            where: { post_id : id }
        });

    } catch (error) {

        console.log(error.message);
        response.status(500).json(error.message);

    }

});

router.post("/", async (request, response) => {

    try {

        const { user_id, post_id, message } = request.body;

        const newComment = await Comment.create({
            user_id, post_id, message
        });

        return response.status(200).send(newComment);

    } catch (error) {

        console.log(error.message);
        response.status(500).json(error.message);

    }

});

router.put("/:id", async (request, response) => {

    try {

        const { id } = request.params;

        const { message } = request.body;

        const comment = await Comment.findOne({
            where: { id }
        });

        comment.message = message;

        await comment.save();

        return response.status(200).send(comment);

    } catch (error) {

        console.log(error.message);
        response.status(500).json(error.message);

    }

});

router.delete("/:id", async (request, response) => {

    try {

        const { id } = request.params;

        const comment = await Comment.findOne({
            where: { id }
        });

        comment.destroy();

        return response.status(200).send("Comment is Destroyed")

    } catch (error) {

        console.log(error.message);
        response.status(500).json(error.message);

    }

});

module.exports = router;
