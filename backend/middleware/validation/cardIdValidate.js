const { celebrate, Joi } = require('celebrate');

const cardIdValidate = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().min(24).max(24).required(),
  }),
});

module.exports = {
  cardIdValidate,
};
