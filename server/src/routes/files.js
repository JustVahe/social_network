const router = require("express").Router();
const { sequelize, File, User } = require("../../models/index");
const { headerImgStorage, avatarStorage } = require("../utils/storages")
const multer = require("multer");

const uploadHeader = multer({ storage: headerImgStorage });
const uploadAvatar = multer({ storage: avatarStorage });

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


module.exports = router;

