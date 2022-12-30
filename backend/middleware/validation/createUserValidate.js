const { celebrate, Joi } = require('celebrate');

const { validateURL } = require('../../helpers/validateURL');

exports.createUserValidate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(validateURL),
  }),
});

/* exports.createUserValidate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email({
      minDomainSegments: 2,
      maxDomainSegments: 3,
      allowUnicode: false,
      tlds: {
        deny: [
          'ua',
          'at',
          'be',
          'de',
          'lu',
          'nl',
          'fr',
          'ch',
          'uk',
          'gb',
          'dk',
          'je',
          'ie',
          'is',
          'lv',
          'lt',
          'no',
          'fi',
          'se',
          'ee',
          'bg',
          'hu',
          'pl',
          'ro',
          'sk',
          'cz',
          'al',
          'gi',
          'gr',
          'cy',
          'es',
          'it',
          'mt',
          'pt',
          'si',
          'hr',
          'ai',
          'vg',
          'ca',
          'us',
          'sg',
          'tw',
          'jp',
          'au',
          'nz',
        ],
      },
    }),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(validateURL),
  }),
}); */

/* module.exports = {
  createUserValidate,
}; */
