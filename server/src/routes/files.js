const router = require("express").Router();
const { File, User } = require("../../models/index");
const multer = require("multer");
const fs = require("fs");
const supabase = require("../utils/supabaseClient");
const { imageFilter } = require("../utils/fileFilters");
const { decode } = require("base64-arraybuffer")

const uploadHeader = multer({
    storage: multer.memoryStorage(),
    fileFilter: imageFilter
}).single('file');
const uploadAvatar = multer({
    storage: multer.memoryStorage(),
    fileFilter: imageFilter
}).single('file');
const uploadPost = multer({
    storage: multer.memoryStorage(),
    fileFilter: imageFilter
}).array("files", 10);
const uploadPhotos = multer({
    storage: multer.memoryStorage(),
    fileFilter: imageFilter
}).array("files", 10);
const uploadPhoto = multer({
    storage: multer.memoryStorage(),
    fileFilter: imageFilter
}).single("file");

router.get("/:user_id", async (request, response) => {

    try {

        const { user_id } = request.params;
        const files = await File.findAll({
            where: { user_id },
            order: [['updatedAt', 'DESC']]
        });

        return response.status(200).json(files);

    } catch (error) {

        console.log(error);
        return response.status(500).json(error);

    }

});

router.put("/:user_id/header/",
    (request, response) => {
        uploadHeader(request, response, async (error) => {
            if (error) {
                console.log(error);
                return response.status(400).json("This file is not an image, please send another file!");
            }
            try {

                const { user_id } = request.params;
                const user = await User.findOne({
                    where: { id: user_id },
                });

                const fileBase64 = decode(request.file.buffer.toString("base64"));
                const files = await supabase.storage.from("assets").list(`${user_id}/images/headerImg/`);

                if (files.data.length >= 1) {
                    await supabase.storage.from('avatars').remove(['folder/avatar1.png']);
                    const { error } = await supabase.storage.from("assets")
                        .upload(`${user_id}/images/headerImg/${request.file.originalname}`, fileBase64, {
                            cacheControl: '300',
                            upsert: true,
                            contentType: request.file.mimetype
                        });
                    if (error) return response.status(400).json({ message: error.message });
                } else {
                    const { error } = await supabase.storage.from("assets")
                        .upload(`${user_id}/images/headerImg/${request.file.originalname}`, fileBase64, {
                            cacheControl: '300',
                            upsert: true,
                            contentType: request.file.mimetype
                        });
                    if (error) return response.status(400).json({ message: error.message });
                }

                user.headerImg = `/assets/${user_id}/images/headerImg/${request.file.originalname}`;
                user.save();

                return response.status(200).json("Cover image upload is complete");

            } catch (error) {
                console.log({ error: error });
                return response.status(500).json({ message: error.message });
            }

        })

    }
);

router.put("/:user_id/avatar/",
    (request, response) => {
        uploadAvatar(request, response, async (error) => {
            if (error) {
                console.log(error);
                return response.status(400).json("This file is not an image, please send another file!");
            }
            try {

                const { user_id } = request.params;
                const user = await User.findOne({ where: { id: user_id }, });

                const fileBase64 = decode(request.file.buffer.toString("base64"));
                const files = await supabase.storage.from("assets").list(`${user_id}/images/avatar/`);

                if (files.data.length >= 1) {
                    await supabase.storage.from('assets').remove([`${user_id}/images/avatar/`]);
                    const { error } = await supabase.storage.from("assets")
                        .upload(`${user_id}/images/avatar/${request.file.originalname}`, fileBase64, {
                            cacheControl: '300',
                            upsert: true,
                            contentType: request.file.mimetype
                        });
                    if (error) return response.status(400).json({ message: error.message });
                } else {
                    const { error } = await supabase.storage.from("assets")
                        .upload(`${user_id}/images/avatar/${request.file.originalname}`, fileBase64, {
                            cacheControl: '300',
                            upsert: true,
                            contentType: request.file.mimetype
                        });
                    if (error) return response.status(400).json({ message: error.message });
                }

                user.avatar = `/assets/${user_id}/images/avatar/${request.file.originalname}`;
                user.save();
                return response.status(200).json("Avatar upload is complete");

            } catch (error) {
                console.log(error);
                return response.status(500).json(error.message);
            }
        })

    }
);

router.post("/:user_id/post/",
    async (request, response) => {
        uploadPost(request, response, async (error) => {
            if (error) {
                return response.status(400).json("This file is not an image, please send another file!");
            }

            try {

                const { user_id } = request.params;
                const { post_id } = request.body;
                const files = request.files;

                for (const file of files) {
                    const path = `/assets/${user_id}/images/posts/${file.originalname}`;
                    const [type] = file.mimetype.split("/");

                    const fileBase64 = decode(file.buffer.toString("base64"));

                    const { error } = await supabase.storage.from("assets")
                        .upload(`${user_id}/images/posts/${file.originalname}`, fileBase64, {
                            cacheControl: '300',
                            upsert: true,
                            contentType: file.mimetype
                        });
                    if (error) return response.status(400).json({ message: error.message });
                    await File.create({ user_id, post_id, path, type });
                }

                const createdFiles = await File.findAll({ where: { post_id } });
                return response.status(200).json(createdFiles);
            } catch (error) {

                console.log(error);
                return response.status(500).json(error.message);

            }
        });
    }
);

router.post("/:user_id",
    async (request, response) => {
        uploadPhotos(request, response, async (error) => {
            if (error) {
                return response.status(400).json("This file is not an image, please send another file!");
            }
            try {
                const { user_id } = request.params;
                const files = request.files;
                const newFiles = [];

                for (const file of files) {
                    const path = `/assets/${user_id}/images/${file.originalname}`;
                    const type = file.mimetype.split("/")[0];

                    const fileBase64 = decode(file.buffer.toString("base64"));

                    const { data, error } = await supabase.storage.from("assets")
                        .upload(`${user_id}/images/${file.originalname}`, fileBase64, {
                            cacheControl: '300',
                            upsert: true,
                            contentType: file.mimetype
                        });

                    if (error) return response.status(400).json({ message: error.message });

                    const newFile = await File.create({
                        user_id,
                        path,
                        type
                    });

                    newFiles.push(newFile);
                }

                return response.status(200).json(newFiles);

            } catch (error) {
                console.log(error);
                return response.status(500).json(error.message);
            }
        });
    }
);

router.put("/:id", async (request, response) => {
    uploadPhoto(request, response, async (error) => {
        if (error) {
            return response.status(400).json(error);
        }
        try {

            const requestFile = request.file;
            const { id } = request.params;
            const { user_id } = request.body;

            const file = await File.findOne({ where: { id } });

            const [, , ...rest] = file.path.split("/");
            const path = rest.join("/");
            const newPath = `/assets/${user_id}/images/${requestFile.originalname}`;

            const { removeError } = await supabase.storage.from("assets").remove(path);
            if (removeError) return response.status(400).json("File is not deleted : " + error.message);

            file.path = newPath;
            file.save();

            const fileBase64 = decode(requestFile.buffer.toString("base64"));

            const { error } = await supabase.storage.from("assets")
                .upload(`${user_id}/images/${requestFile.originalname}`, fileBase64, {
                    cacheControl: '300',
                    upsert: true,
                    contentType: requestFile.mimetype
                });
            if (error) return response.status(400).json({ message: error.message });

            const newFile = await File.findOne({where : {id}});

            return response.status(200).json(newFile);

        } catch (error) {
            console.log(error);
            return response.status(500).json(error.message);
        }
    });

})

router.delete("/:id", async (request, response) => {

    try {

        const { id } = request.params;

        const file = await File.findOne({
            where: { id }
        });

        file.destroy();

        const [, , ...rest] = file.path.split("/");
        const path = rest.join("/");
        const { error } = await supabase.storage.from("assets").remove(path);
        if (error) return response.status(400).json("File is not deleted : " + error.message);

        return response.status(200).json("Image successfully deleted");

    } catch (error) {
        console.log(error);
        return response.status(500).json(error.message);
    }

})


module.exports = router;
