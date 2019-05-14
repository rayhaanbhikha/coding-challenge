const express = require("express");
const app = express();

const { home, users, video } = require("../controllers");
const { checkUserId, checkUserStreams } = require("../middleware");

app.get("/", home);
app.get("/api/users", users.allUsers);
app.get("/api/users/:userId/streams", users.getStreamsById);

app.get("/api/video", checkUserId, checkUserStreams, video);

module.exports = app;