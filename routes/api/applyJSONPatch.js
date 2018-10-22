const express = require('express')
const router = express.Router()
var { checkToken } = require('../../middleware/checkToken')
const jsonpatch = require('fast-json-patch')
const validatePatchInput = require('../../validation/applyPatchValidate')

// @route   POST /appyJsonPatch
// @desc    Accepts a JSON object & patch, returns pathed object
// @access  Private
router.post('/applyJSONPatch', checkToken, (req, res) => {
  const { errors, isValid } = validatePatchInput(req.body)

  if (!isValid) {
    return res.status(400).json(errors)
  }

  var originalObject = req.body.jsonObject
  var patch = req.body.patch
  originalObject = jsonpatch.applyPatch(originalObject, patch).newDocument
  res.send(`Your patched object: ${JSON.stringify(originalObject)}`)
})

module.exports = router
