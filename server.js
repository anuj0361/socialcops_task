const jwt = require("jsonwebtoken");
const express = require("express");
const _ = require("lodash");
const bodyParser = require("body-parser");
const thumb = require("node-thumbnail").thumb;
const download = require("image-downloader");
const jsonpatch = require("json-patch");

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

// @route   POST /createThumbnail
// @desc    Download image from URL & save it as a thumbnail
// @access  Private
app.post("/createThumbnail", (req, res) => {
  var imageURL = req.body.image;
  console.log(imageURL);
  options = {
    url: imageURL,
    dest: "images/photo.jpg" // Save to /path/to/dest/photo.jpg
  };

  download
    .image(options)
    .then(({ filename, image }) => {
      console.log("Images saved sucessfully to images folder", filename);
    })
    .then(filename => {
      thumb({
        source: "images/photo.jpg",
        destination: "images/",
        width: 50
      });
    })
    .then(function() {
      res.send("Your thumbnail saved successfully to your images folder");
    })
    .catch(err => {
      console.error(err);
    });
});

app.listen(3000, () => {
  console.log("Started on port 3000");
});

module.exports = { app };
