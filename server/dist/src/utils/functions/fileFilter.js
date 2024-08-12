export const imageFilter = (req, file, callback) => {
    const [type] = file.mimetype.split("/");
    if (type === "image") {
        callback(null, true);
    }
    else if (type !== "image") {
        return callback(null, false);
    }
};
