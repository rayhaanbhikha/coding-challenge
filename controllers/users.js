const path = require("path");
const { User } = require(path.resolve("db"));

exports.allUsers = async (req, res) => {
    try {
        const users = await User.getAllUsers();
        res.status(200);
        res.json(users);
    } catch (err) {
        switch(err.response.status) {
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