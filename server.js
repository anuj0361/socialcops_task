const jwt = require("jsonwebtoken");
const express = require("express");
const _ = require("lodash");
const bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// returns jwt signed token
function generateAuthToken(body) {
  var access = "auth";
  var token = jwt.sign({ email: body.email, access }, "abc123").toString();
  return token;
}

// @route   POST /login
// @desc    Login user with any email & password
// @access  Public
app.post("/login", (req, res) => {
  var body = _.pick(req.body, ["email", "password"]);
  const token = generateAuthToken(body);
  res.header("x-auth", token).send(`Token Generated: ${token}`);
  console.log(token);
});

app.listen(3000, () => {
  console.log("Started on port 3000");
});

module.exports = { app };
