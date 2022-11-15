const { celebrate, Joi } = require('celebrate');

const { validateURL } = require('../../helpers/validateURL');

exports.updateAvatarValidate = celebrate({
  body: Joi.object().keys({ avatar: Joi.string().custom(validateURL) }),
});

/* module.exports = {
  updateAvatarValidate,
};
 */
