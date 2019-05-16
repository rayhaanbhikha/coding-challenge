const express = require("express");
const app = express();

const { home, users, video } = require("../controllers");
const { checkUserId, checkUserStreams } = require("../middleware");
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require("../swagger");

app.get("/", home);
app.use("/docs", swaggerUi.serve)
app.get("/docs", swaggerUi.setup(swaggerDoc));
app.get("/api/users", users.allUsers);
app.get("/api/users/:userId/streams", users.getStreamsById);

app.get("/api/video", checkUserId, checkUserStreams, video);

app.all("*", (req, res) => res.status(404).send("Not found"));
module.exports = app;