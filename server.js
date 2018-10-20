const jwt = require("jsonwebtoken");
const express = require("express");
const _ = require("lodash");

var app = express();

app.listen(3000, () => {
  console.log("Started on port 3000");
});

module.exports = { app };
