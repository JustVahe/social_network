const router = require("express").Router();
const { sequelize, File, User } = require("../../models/index");
const { headerImgStorage, avatarStorage, postStorage } = require("../utils/storages")
const multer = require("multer");

const uploadHeader = multer({ storage: headerImgStorage });
const uploadAvatar = multer({ storage: avatarStorage });
const uploadPost = multer({ storage: postStorage });

router.get("/:user_id", async (request, response) => {

    try {

        const { user_id } = request.params;

        const files = await File.findAll({
            where: { user_id }
        })

        return response.status(200).json(files);

    } catch (error) {

        console.log(error);
        return response.status(500).json(error.message);

    }

});

router.put("/:user_id/header/",
    uploadHeader.single('file'),
    async (request, response) => {
        try {

            const { user_id } = request.params;
            const user = await User.findOne(
                {
                    where: { id: user_id },
                }
            );
            user.headerImg = `/assets/${user_id}/images/headerImg/${request.file.originalname}`;
            user.save();
            return response.status(200).json("Cover image upload is complete");

        } catch (error) {

            console.log(error);
            return response.status(500).json(error.message);

        }
    }
);

router.put("/:user_id/avatar/",
    uploadAvatar.single('file'),
    async (request, response) => {
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
    }
);

router.post("/:user_id/post/",
    uploadPost.array("files", 12),
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
)


module.exports = router;

