const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserModel = require('../models/user');

const {
  ValidationError,
  ConflictError,
  NotFoundError,
} = require('../utils/errors');

const { NODE_ENV, JWT_SECRET } = process.env;

const getUser = (req, res, next) => {
  const id = req.user._id;
  UserModel.findById(id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      return res.status(201).send(user);
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const { name, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => UserModel.create({
      name,
      email,
      password: hash,
    }))
    .then(() => {
      res.status(201).send({ name, email });
    })
    .catch((err) => {
      if (err.code === 11000) {
        return next(new ConflictError('Указанный email уже существует'));
      }
      if (err.name === 'ValidationError') {
        return next(new ValidationError('Переданы некорректные данные'));
      }
      return next(err);
    });
};

const updateUserInfo = (req, res, next) => {
  const { name, email } = req.body;
  UserModel.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { runValidators: true, new: true },
  )
    .then((data) => res.status(201).send(data))
    .catch((err) => {
      if (err instanceof ValidationError) {
        return next(new ValidationError('Переданы некорректные данные'));
      }
      return next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return UserModel.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'jwt_secret',
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch(next);
};
module.exports = {
  login,
  createUser,
  getUser,
  updateUserInfo,
};
