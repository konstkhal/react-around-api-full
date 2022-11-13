const { celebrate, Joi } = require('celebrate');

const getUsersValidate = celebrate({
  headers: Joi.object()
    .keys({
      authorization: Joi.string().trim().required(),
    })
    .unknown(true),
});

module.exports = {
  getUsersValidate,
};
