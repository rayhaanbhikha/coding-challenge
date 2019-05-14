const express = require("express");
const app = express();

const { home } = require("../controllers");

app.get("/", home);

module.exports = app;