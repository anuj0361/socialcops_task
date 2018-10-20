const express = require("express");
const router = express.Router();
var { checkToken } = require("../../middleware/checkToken");
const jsonpatch = require("fast-json-patch");

// @route   POST /appyJsonPatch
// @desc    Accepts a JSON object & patch, returns pathed object
// @access  Private
router.post("/appyJSONPatch", checkToken, (req, res) => {
  var originalObject = req.body.jsonObject;
  var patch = req.body.patch;
  originalObject = jsonpatch.applyPatch(originalObject, patch).newDocument;
  res.send(`Your patched object: ${JSON.stringify(originalObject)}`);
});

module.exports = router;
