const path = require("path");
const { User } = require(path.resolve("db"));
const { userIdHeader, concurrentStreamLimit } = require(path.resolve("config"));

module.exports = async (req, res, next) => {
    try {
        let userId = req.headers[userIdHeader];
        let { activeStreams } = await User.getUserById(userId);
        if (activeStreams >= concurrentStreamLimit) {
            res.status(403);
            res.send("Active stream limit reached.");
        } else {
            next();
        }
    } catch (err) {
        console.log(err);
        switch (err.response.status) {
            case 400:
                res.status(err.response.status);
                res.send("Bad request");
                break;
            case 404:
                res.status(err.response.status);
                res.send("Not found");
                break;
            default:
                res.status(500);
                res.send("Server error");
        }
    }
}