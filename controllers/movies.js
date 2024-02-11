const MovieModel = require('../models/movie');
const {
  NotFoundError,
  ValidationError,
  ConflictError,
  AuthorizedError,
} = require('../utils/errors');

const getMovies = (req, res, next) => {
  const owner = req.user._id;
  MovieModel.find({ owner })
    .then((movies) => res.status(201).send(movies))
    .catch((err) => next(err));
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  const owner = req.user._id;
  MovieModel.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner,
  })
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new ValidationError('Переданы некорректные данные'));
      }
      return next(err);
    });
};

const deleteMovie = (req, res, next) => {
  const id = req.params;
  MovieModel.findById(id)
    .then((deletedMovie) => {
      if (!deletedMovie) {
        return next(new NotFoundError('Фильм отсутствует'));
      }
      if (String(deletedMovie.owner) !== req.user.id) {
        return next(new ValidationError('Вы не можете'));
      }
      return MovieModel.deleteOne(deletedMovie._id).then(() => res.status(201).send({ message: 'Удален' }));
    })
    .catch((err) => {
      if (err instanceof ConflictError) {
        return next(new AuthorizedError('Переданы некорректные данные'));
      }
      return next(err);
    });
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
