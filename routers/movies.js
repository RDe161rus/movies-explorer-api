const router = require('express').Router();
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');
const { movieValid, delMovieValid } = require('../utils/validators/validMovie');

router.get('/', getMovies);
router.post('/', movieValid, createMovie);
router.delete('/:_id', delMovieValid, deleteMovie);

module.exports = router;
