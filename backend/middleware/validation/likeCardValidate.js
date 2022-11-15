const { celebrate, Joi } = require('celebrate');

exports.likeCardValidate = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }),
  headers: Joi.object()
    .keys({
      authorization: Joi.string().trim().required(),
    })
    .unknown(true),
});

/* module.exports = {
  likeCardValidate,
}; */
