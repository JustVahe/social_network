const router = require("express").Router();
const { sequelize, File, User } = require("../../models/index");
const multer = require("multer");
const fs = require("fs");

const headerImgStorage = multer.diskStorage(
    {
        destination: (request, file, callback) => {

            request.body.user_id = request.params.user_id;
            const { user_id } = request.body;
            const path = `${__dirname}../../../public/assets/${user_id}/images/headerImg`;
            fs.mkdirSync(path, { recursive: true });
            return callback(null, path);

        },
        filename: (request, file, callback) => {

            const { user_id } = request.body;

            const path = `${__dirname}../../../public/assets/${user_id}/images/headerImg`;
            const files = fs.readdirSync(path);

            if (files.includes(file.originalname)) {
                fs.unlinkSync(path + file.originalname);
            }

            callback(null, file.originalname);
        }
    }
);

const uploadHeader = multer({ storage: headerImgStorage });

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
            return response.status(200).json(user);

        } catch (error) {

            console.log(error);
            return response.status(500).json(error.message);

        }
    });

module.exports = router;

