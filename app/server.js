const express = require("express");
const app = express();
const routes = require("./routes");
const { port } = require("./config");

app.use(routes);

app.listen(port, () => {
    console.log(`server started on port ${port}`);
})