module.exports.imageFilter = (request, file, callback) => {
    const [type] = file.mimetype.split("/")
    console.log(type);
    
    if (type === "image") {
        callback(null,true);
    } else {
        return callback(new Error("File Validation Error"), false);
    }
};