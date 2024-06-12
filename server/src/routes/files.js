const router = require("express").Router();
const { File, User } = require("../../models/index");
const { headerImgStorage, avatarStorage, postStorage, photoStorage } = require("../utils/storages")
const multer = require("multer");
const fs = require("fs");

const { imageFilter } = require("../utils/fileFilters");

const uploadHeader = multer({
    storage: headerImgStorage,
    fileFilter: imageFilter
}).single('file');
const uploadAvatar = multer({
    storage: avatarStorage,
    fileFilter: imageFilter
}).single('file');
const uploadPost = multer({
    storage: postStorage,
    fileFilter: imageFilter
}).array("files", 10);
const uploadPhoto = multer({
    storage: photoStorage,
    fileFilter: imageFilter
}).array("files", 10);

router.get("/:user_id", async (request, response) => {

    try {

        const { user_id } = request.params;

        const files = await File.findAll({
            where: { user_id }
        })

        return response.status(200).json(files);

    } catch (error) {

        console.log(error.message);
        return response.status(500).json(error.message);

    }

});

router.put("/:user_id/header/",
    (request, response) => {
        uploadHeader(request, response, async (error) => {
            if (error) {
                return response.status(400).json("This file is not an image, please send another file!");
            }
            try {
                const { user_id } = request.params;
                const user = await User.findOne({
                    where: { id: user_id },
                });
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
                return response.status(400).json("This file is not an image, please send another file!");
            }
            try {
                const { user_id } = request.params;
                const user = await User.findOne(
                    {
                        where: { id: user_id },
                    }
                );
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
    uploadPost,
    async (request, response) => {

        try {

            const { user_id } = request.params;
            const { post_id } = request.body;
            const files = request.files;

            console.log(files);

            files.forEach(async (file) => {

                const path = `/assets/${user_id}/images/posts/${file.originalname}`;
                const type = file.mimetype.split("/")[0];

                const newFile = await File.create({
                    user_id,
                    post_id,
                    path,
                    type
                });

            })

            return response.status(200).json("Files have been sent successfully");


        } catch (error) {

            console.log(error);
            return response.status(500).json(error.message);

        }
    }
);

router.post("/:user_id",
    uploadPhoto,
    async (request, response) => {
        try {

            // photos.length = 0;

            const { user_id } = request.params;
            const files = request.files;

            files.forEach(async (file) => {

                const path = `/assets/${user_id}/images/${file.originalname}`;
                const type = file.mimetype.split("/")[0];

                const newFile = await File.create({
                    user_id,
                    path,
                    type
                });

            });

            return response.status(200).json("Files have been successfully uploaded");
        } catch (error) {
            console.log(error);
            return response.status(500).json(error.message);
        }
    }
);

router.delete("/:id", async (request, response) => {

    try {

        const { id } = request.params;

        const file = await File.findOne({
            where: {id}
        });

        const path = `${__dirname}../../../public/${file.path}`;
        
        file.destroy();

        fs.unlink(path, (error) => {
            if (error) {
                return response.status(400).json("File is not deleted");
            } else {
                return response.status(200).json("File is successfully deleted");
            }
        });

    } catch (error) {
        console.log(error);
        return response.status(500).json(error.message);
    }

})


module.exports = router;

