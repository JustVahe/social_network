const multer = require("multer");
const fs = require("fs");

module.exports.headerImgStorage = multer.diskStorage(
    {
        destination: (request, file, callback) => {

            request.body.user_id = request.params.user_id;
            const { user_id } = request.body;
            const path = `${__dirname}../../../public/assets/${user_id}/images/headerImg/`;
            fs.mkdirSync(path, { recursive: true });
            return callback(null, path);

        },
        filename: (request, file, callback) => {

            const { user_id } = request.body;

            const path = `${__dirname}../../../public/assets/${user_id}/images/headerImg/`;
            const files = fs.readdirSync(path);

            if (files.includes(file.originalname)) {
                fs.unlinkSync(path + file.originalname);
            }

            callback(null, file.originalname);
        }
    }
);

module.exports.avatarStorage = multer.diskStorage(
    {
        destination: (request, file, callback) => {

            request.body.user_id = request.params.user_id;
            const { user_id } = request.body;
            const path = `${__dirname}../../../public/assets/${user_id}/images/avatar/`;
            fs.mkdirSync(path, { recursive: true });
            return callback(null, path);

        },
        filename: (request, file, callback) => {

            const { user_id } = request.body;

            const path = `${__dirname}../../../public/assets/${user_id}/images/avatar/`;
            const files = fs.readdirSync(path);

            if (files.includes(file.originalname)) {
                fs.unlinkSync(path + file.originalname);
            }

            callback(null, file.originalname);
        }
    }
)