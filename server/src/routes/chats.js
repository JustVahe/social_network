const router = require("express").Router();
const { Chat, Connection } = require("../../models/index");
const { imageFilter } = require("../utils/fileFilters");
const { chatAvatarStorage } = require("../utils/storages")
const multer = require("multer");

const uploadChatAvatar = multer({
    storage: chatAvatarStorage,
    fileFilter: imageFilter
}).single("file");

router.post("/", async (request, response) => {

    try {
        const { name } = request.body;

        if (!name) {
            return response.status(400).json("Name is required");
        }

        const chat = await Chat.create({ name });

        const wholeChat = await Chat.findOne({
            where: { id: chat.id },
            include: { all: true }
        });

        return response.json(wholeChat);

    } catch (error) {
        return response.status(500).json(error);
    }

});

router.get("/", async (request, response) => {

    try {

        const chats = await Chat.findAll({ include: { all: true, nested: true } });
        return response.status(200).json(chats);

    } catch (error) {
        console.log(error);
        return response.status(200).json(error);
    }

});

router.get("/:id", async (request, response) => {

    try {

        const { id } = request.params;
        const chat = await Chat.findOne({ where: { id }, include: { all: true, nested: true } });
        if(!chat) return response.status(404).json("This chat isn't found");

        return response.status(200).json(chat);

    } catch (error) {
        console.log(error);
        return response.status(200).json(error);
    }

});

router.put("/:id", async (request, response) => {

    try {

        const { id } = request.params;

        const chat = await Chat.findOne({ where: { id }, include: { all: true, nested: true } });

        for (const key in request.body) {
            if (request.body[key]) {
                chat[key] = request.body[key];
            }
        }

        chat.save();

        return response.status(200).json(chat);

    } catch (error) {
        console.log(error);
        return response.status(200).json(error);
    }

});

router.put("/avatar/:id", (request, response) => {

    uploadChatAvatar(request, response, async (error) => {

        if (error) {
            return response.status(400).json("This file is not an image, please send another file!");
        }

        try {

            const { id } = request.params;
            const chat = await Chat.findOne({ where: { id }, });

            chat.avatar = `/assets/chats/${id}/images/avatar/${request.file.originalname}`;
            chat.save();

            return response.status(200).json("Avatar upload is complete");

        } catch (error) {
            console.log(error);
            return response.status(500).json(error.message);
        }
    });
});

router.delete("/:id", async (request, response) => {

    try {

        const { id } = request.params;
        const chat = await Chat.findOne({ where: { id }, include: { all: true, nested: true } });
        const connections = await Connection.findAll({ where: { chat_id: id }});

        connections.forEach(item => item.destroy());
        chat.destroy();

        return response.status(200).json("Chat are successfully deleted");

    } catch (error) {
        console.log(error);
        return response.status(500).json(error);
    }

})


module.exports = router;