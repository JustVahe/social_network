const multer = require("multer");
const fs = require("fs");

module.exports.headerImgStorage = multer.memoryStorage();

module.exports.avatarStorage = multer.memoryStorage();

module.exports.postStorage = multer.memoryStorage();

module.exports.photoStorage = multer.memoryStorage();

module.exports.onePhotoSendingStorage = multer.diskStorage(
    {
        destination: (request, file, callback) => {
            const { user_id } = request.body;
            const path = `${__dirname}../../../public/assets/${user_id}/images/`;
            fs.mkdirSync(path, { recursive: true });
            return callback(null, path);

        },
        filename: (request, file, callback) => {
            const { user_id } = request.body;
            const path = `${__dirname}../../../public/assets/${user_id}/images/`;
            const files = fs.readdirSync(path);
            if (files.includes(file.originalname)) {
                fs.unlinkSync(path + file.originalname);
            }
            callback(null, file.originalname);
        }
    }
);

module.exports.chatAvatarStorage = multer.diskStorage(
    {
        destination: (request, file, callback) => {

            request.body.chat_id = request.params.id;

            const { chat_id } = request.body;
            const path = `${__dirname}../../../public/assets/chats/${chat_id}/images/avatar/`;

            fs.mkdirSync(path, { recursive: true });
            return callback(null, path);

        },
        filename: (request, file, callback) => {

            const { chat_id } = request.body;
            const path = `${__dirname}../../../public/assets/chats/${chat_id}/images/avatar/`;
            const files = fs.readdirSync(path);

            if (files.includes(file.originalname)) {
                fs.unlinkSync(path + file.originalname);
            }

            callback(null, file.originalname);
        }
    }
)