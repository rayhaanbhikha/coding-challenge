const express = require("express");
const app = express();

const { home, users } = require("../controllers");

app.get("/", home);
app.get("/api/users", users.allUsers);

module.exports = app;