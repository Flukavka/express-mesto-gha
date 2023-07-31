const mongoose = require('mongoose');
const BadRequestError = require('../errors/bad_request_error');
const UnauthorizedError = require('../errors/unauthorized_error');
const NotFoundError = require('../errors/not_found_error');
const ConflictError = require('../errors/conflict_error');
//  const Forbidden = require('../errors/forbidden_status');
const {
  UNAUTHORIZED_ERROR,
  INTERNAL_SERVER_ERROR,
} = require('../utils/constants');

// eslint-disable-next-line consistent-return
module.exports.errorMiddleware = (error, _req, res, next) => {
  if (error instanceof mongoose.Error.ValidationError) {
    return next(new BadRequestError('Ошибка валидации'));
  }

  if (error.code === 11000) {
    return next(new ConflictError('Пользователь с такой почтой уже зарегистрирован'));
  }

  if (error.statusCode === UNAUTHORIZED_ERROR) {
    return next(new UnauthorizedError('Неправильные почта или пароль'));
  }

  if (error instanceof mongoose.Error.CastError) {
    return next(new BadRequestError('Передан некорректный id'));
  }

  if (error instanceof mongoose.Error.DocumentNotFoundError) {
    return next(new NotFoundError('Объект с указанным id отсутствует'));
  }

  /* if (error.statusCode === FORBIDDEN_STATUS) {
    return next(new Forbidden('Отказано в доступе'));
  } */

  res
    .status(INTERNAL_SERVER_ERROR)
    .send({ message: 'На сервере произошла ошибка center' });
  next();
};
