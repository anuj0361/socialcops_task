const express = require("express");
const bodyParser = require("body-parser");

const login = require("./routes/api/login");
const applyJSONPatch = require("./routes/api/applyJSONPatch");
const createThumbnail = require("./routes/api/createThumbnail");

const app = express();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", login);
app.use("/api/patch", applyJSONPatch);
app.use("/api/thumbnail", createThumbnail);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log("Server is running"));
