module.exports.imageFilter = (request, file, callback) => {
    
    const [type] = file.mimetype.split("/")
    if (type === "image") {
        callback(null,true);
    } else if (type !== "image") {
        return callback(new Error("File Validation Error"), false);
    }
};