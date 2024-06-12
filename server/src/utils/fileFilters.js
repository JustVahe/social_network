module.exports.imageFilter = (request, file, callback) => {
    if (file.mimetype.split("/")[0] === "image") {
        callback(null,true);
    } else {
        return callback(new Error("File Validation Error"), false);
    }
};