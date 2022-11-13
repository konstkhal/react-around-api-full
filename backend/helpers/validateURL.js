const validator = require('validator');

exports.validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error('string.uri');
};

/* module.exports = { validateURL }; */
