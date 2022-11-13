const { celebrate, Joi } = require('celebrate');

const getProfileValidate = celebrate({
  params: Joi.object().keys({
    id: Joi.string().min(24).max(24).required(),
  }),
});

module.exports = {
  getProfileValidate,
};
