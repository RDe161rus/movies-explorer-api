const router = require('express').Router();
const { login, createUser } = require('../controllers/users');
const userRouter = require('./users');
const movieRouter = require('./movies');
const auth = require('../middlewares/auth');
const { NotFoundError } = require('../utils/errors');
const { logValid, registValid } = require('../utils/validators/validUser');

router.post('/signin', logValid, login);
router.post('/signup', registValid, createUser);

router.use('/users', auth, userRouter);
router.use('/movies', auth, movieRouter);

router.use('/*', (req, res, next) => {
  next(new NotFoundError('Такой страницы не существует'));
  return next();
});

module.exports = router;
