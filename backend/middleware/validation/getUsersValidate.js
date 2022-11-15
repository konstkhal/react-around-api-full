const { celebrate, Joi } = require('celebrate');

exports.getUsersValidate = celebrate({
  headers: Joi.object()
    .keys({
      authorization: Joi.string().trim().required(),
    })
    .unknown(true),
});

/* module.exports = {
  getUsersValidate,
};
 */
