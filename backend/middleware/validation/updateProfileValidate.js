const { celebrate, Joi } = require('celebrate');

exports.updateProfileValidate = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
    })
    .min(1),
});

/* module.exports = {
  updateProfileValidate,
}; */
