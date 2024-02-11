const ValidationError = require('./errors/ValidationError');
const AuthorizedError = require('./errors/AuthorizedError');
const ConflictError = require('./errors/ConflictError');
const ForbiddenError = require('./errors/ForbiddenError');
const NotFoundError = require('./errors/NotFoundError');

module.exports = {
  ValidationError,
  AuthorizedError,
  ConflictError,
  ForbiddenError,
  NotFoundError,
};
