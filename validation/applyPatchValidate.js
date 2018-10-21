const _ = require("lodash");

module.exports = function validatePatchInput(data) {
  let errors = {};

  if (_.isEmpty(data.jsonObject)) {
    errors.jsonObject = "jsonObject field is required";
  }

  if (_.isEmpty(data.patch)) {
    errors.patch = "patch field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
