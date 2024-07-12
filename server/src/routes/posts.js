const router = require("express").Router();
const { sequelize, Post } = require("../../models/index");

router.get("/", async (request, response) => {

    try {

        const { user_id, limit, offset } = request.query;

        if (user_id) {
            const posts = await Post.findAll({
                where: { user_id },
                include: {
                    all: true,
                    nested: true
                },
                order: [['updatedAt', 'DESC']]
            });
            return response.status(200).json(posts);
        } else if (limit && offset) {
            const posts = await Post.findAll({
                include: {
                    all: true,
                    nested: true
                },
                limit,
                offset,
                order: [['updatedAt', 'DESC']]
            });

            return response.status(200).json(posts);
        }

        const posts = await Post.findAll({
            include: ["user", "comments", "files"],
            order: [['updatedAt', 'DESC']]
        });
        return response.status(200).json(posts);

    } catch (error) {

        console.log(error);
        return response.status(500).json(error);

    }

});

router.get("/:id", async (request, response) => {

    try {

        const { id } = request.params;

        const thisPost = await Post.findOne({
            where: { id },
            include: {
                all: true,
                nested: true
            },
            order: [['updatedAt', 'DESC']]
        });

        return response.status(200).json(thisPost);

    } catch (error) {

        console.log(error);
        return response.status(500).json(error);

    }

});

router.post("/:user_id", async (request, response) => {

    try {

        const { user_id } = request.params;
        const { message } = request.body;

        const newPost = await Post.create({
            user_id, message,
            include: {
                all: true,
                nested: true
            }
        });

        return response.status(200).json(newPost);

    } catch (error) {

        console.log(error);
        return response.status(500).json(error);

    }

});

router.put("/:id", async (request, response) => {

    try {

        const { id } = request.params;
        const { message } = request.body;

        const thisPost = await Post.findOne({
            where: { id }
        });
        thisPost.message = message;
        thisPost.save();

        return response.status(200).json(thisPost);

    } catch (error) {

        console.log(error);
        return response.status(500).json(error);

    }

});

router.delete("/:id", async (request, response) => {

    try {

        const { id } = request.params;

        const thisPost = await Post.findOne({
            where: { id }
        });

        thisPost.destroy();

        return response.status(200).json("Post successfully deleted");

    } catch (error) {

        console.log(error);
        return response.status(500).json(error);

    }

});

module.exports = router;