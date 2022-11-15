const { celebrate, Joi } = require('celebrate');

exports.cardIdValidate = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().min(24).max(24).required(),
  }),
});

/* module.exports = {
  cardIdValidate,
};
 */
