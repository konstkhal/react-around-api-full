const { celebrate, Joi } = require('celebrate');

exports.getCardsValidate = celebrate({
  headers: Joi.object()
    .keys({
      authorization: Joi.string().trim().required(),
    })
    .unknown(true),
});

/* module.exports = {
  getCardsValidate,
}; */
