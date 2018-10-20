const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateThumbnailInput(data) {
  let errors = {};

  data.imageURL = !isEmpty(data.imageURL) ? data.imageURL : "";

  if (Validator.isEmpty(data.imageURL)) {
    errors.email = "Email field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
