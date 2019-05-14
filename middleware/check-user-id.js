const path = require("path");
const { userIdHeader } = require(path.resolve("config"));

module.exports = (req, res, next) => {
    if (!req.headers[userIdHeader]) {
        res.status(400);
        res.send("Bad request");
    } else {
        next();
    }
}