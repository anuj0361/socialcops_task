const _ = require("lodash");
const is_Empty = require("./is-empty");

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
    isValid: is_Empty(errors)
  };
};
