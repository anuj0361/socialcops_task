const jwt = require("jsonwebtoken");

var checkToken = (req, res, next) => {
  var decoded;
  try {
    decoded = jwt.verify(req.headers.auth, "abc123");
  } catch (e) {
    return res.status(401).send("Invalid token");
  }

  console.log(decoded);
  next();
};

module.exports = { checkToken };
