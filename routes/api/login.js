const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const _ = require('lodash')
const validateLoginInput = require('../../validation/loginValidate')
const keys = require('../../config/keys')

// returns jwt signed token
function generateAuthToken (body) {
  var access = 'auth'
  var token = jwt.sign({ email: body.email, access }, keys.secret).toString()
  return token
}

// @route   POST /login
// @desc    Login user with any email & password
// @access  Public
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body)

  if (!isValid) {
    return res.status(400).json(errors)
  }

  var body = _.pick(req.body, ['email', 'password'])
  const token = generateAuthToken(body)
  res.header('x-auth', token).send(`Token Generated: ${token}`)
})

module.exports = router
