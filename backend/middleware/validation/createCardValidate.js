const { celebrate, Joi } = require('celebrate');

const { validateURL } = require('../../helpers/validateURL');

const createCardValidate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().custom(validateURL).required(),
  }),
});

module.exports = {
  createCardValidate,
};
