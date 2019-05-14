const express = require("express");
const app = express();
const routes = require("./routes");
const port = process.env.PORT || 8080;

app.use(routes);

app.listen(port, () => {
    console.log(`server started on port ${port}`);
})