const jwt = require('jsonwebtoken')
const keys = require('../config/keys')

var checkToken = (req, res, next) => {
  try {
    jwt.verify(req.headers.auth, keys.secret)
  } catch (e) {
    return res.status(401).send('Invalid token')
  }

  next()
}

module.exports = { checkToken }
