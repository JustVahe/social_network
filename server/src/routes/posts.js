const router = require("express").Router();
const { sequelize, Post } = require("../../models/index");

router.get("/", async (request, response) => {

    try {

        const posts = await Post.findAll({
            include: ["user"]
        })

        return response.status(200).json(posts);

    } catch (error) {

        console.log(error.message);
        return response.status(500).json("Internal Server Error");

    }

});

router.get("/:id", async (request, response) => {

    try {

        const { id } = request.params;

        const thisPost = await Post.findOne({
            where: { id },
            include: ["user"]
        });

        return response.status(200).json(thisPost);

    } catch (error) {

        console.log(error.message);
        return response.status(500).json("Internal Server Error");

    }

});

router.post("/", async (request, response) => {

    try {

        const { user_id, message } = request.body;

        const newPost = await Post.create({
            user_id, message
        });

        return response.status(200).json(newPost);

    } catch (error) {

        console.log(error.message);
        return response.status(500).json("Internal Server Error");

    }

});

router.put("/:id", async (request, response) => {

    try {

        const { id } = request.params;

        const {message} = request.body;

        const thisPost = await Post.findOne({
            where: { id }
        });

        thisPost.message = message;

        thisPost.save();

        return response.status(200).json(thisPost);

    } catch (error) {

        console.log(error.message);
        return response.status(500).json("Internal Server Error");

    }

});

router.delete("/:id", async (request, response) => {

    try {

        const { id } = request.params;

        const thisPost = await Post.findOne({
            where: { id }
        });

        thisPost.destroy();

        return response.status(200).send("Post successfully deleted");

    } catch (error) {

        console.log(error.message);
        return response.status(500).json("Internal Server Error");

    }

});

module.exports = router;