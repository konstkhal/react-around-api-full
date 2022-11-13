const { celebrate, Joi } = require('celebrate');

const getCardsValidate = celebrate({
  headers: Joi.object()
    .keys({
      authorization: Joi.string().trim().required(),
    })
    .unknown(true),
});

module.exports = {
  getCardsValidate,
};
