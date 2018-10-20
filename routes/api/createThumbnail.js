const express = require("express");
const router = express.Router();
var { checkToken } = require("../../middleware/checkToken");
const thumb = require("node-thumbnail").thumb;
const download = require("image-downloader");

// @route   POST /createThumbnail
// @desc    Download image from URL & save it as a thumbnail
// @access  Private
router.post("/createThumbnail", checkToken, (req, res) => {
  var imageURL = req.body.imageURL;
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

module.exports = router;
