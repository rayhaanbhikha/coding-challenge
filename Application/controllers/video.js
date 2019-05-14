const path = require('path');
const { UserService } = require(path.resolve("services"));
const { userIdHeader } = require(path.resolve("config"));


module.exports = async (req, res) => {
    try {
        const userId = req.headers[userIdHeader];
        if(!userId) {
            res.status(400);
            res.send("Bad request");
        } else {
            await UserService.incrementCount(userId);
            res.status(200);
            res.send({
                message: "request successful"
            })
        }
    } catch (err) {
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