const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validatePatchInput(data) {
  let errors = {};

  data.jsonObject = !isEmpty(data.jsonObject) ? data.jsonObject : "";
  data.patch = !isEmpty(data.patch) ? data.patch : "";

  if (Validator.isEmpty(data.jsonObject)) {
    errors.email = "Email field is required";
  }

  if (Validator.isEmpty(data.patch)) {
    errors.password = "Password field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
