const express = require("express");
const router = express.Router();
var { checkToken } = require("../../middleware/checkToken");
const thumb = require("node-thumbnail").thumb;
const download = require("image-downloader");
const validateThumbnailInput = require("../../validation/thumbnailValidate");

// @route   POST /createThumbnail
// @desc    Download image from URL & save it as a thumbnail
// @access  Private
router.post("/createThumbnail", checkToken, (req, res) => {
  const { errors, isValid } = validateThumbnailInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  var imageURL = req.body.imageURL;
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
      return res.status(400);
    });
});

module.exports = router;
