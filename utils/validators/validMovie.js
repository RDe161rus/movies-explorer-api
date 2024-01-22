const { Joi, celebrate } = require('celebrate');
const { urlValidate } = require('../constants');

const movieValid = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(urlValidate),
    trailerLink: Joi.string().required().regex(urlValidate),
    thumbnail: Joi.string().required().regex(urlValidate),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

module.exports = { movieValid };
