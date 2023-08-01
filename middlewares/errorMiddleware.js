const mongoose = require('mongoose');
const BadRequestError = require('../errors/bad_request_error');
const NotFoundError = require('../errors/not_found_error');
const {
  INTERNAL_SERVER_ERROR,
} = require('../utils/constants');

// eslint-disable-next-line consistent-return
module.exports.errorMiddleware = (error, _req, res, next) => {
  if (error instanceof mongoose.Error.ValidationError) {
    return next(new BadRequestError('Ошибка валидации'));
  }

  /* if (error.code === 11000) {
    //return next(new ConflictError('Пользователь с такой почтой уже зарегистрирован'));
  } */

  /*  if (error.statusCode === UNAUTHORIZED_ERROR) {
     console.log(1)
     return res
       .status(UNAUTHORIZED_ERROR)
       .send({ message: 'Неправильные почта или пароль' });
   } */

  if (error instanceof mongoose.Error.CastError) {
    return next(new BadRequestError('Передан некорректный id'));
  }

  if (error instanceof mongoose.Error.DocumentNotFoundError) {
    return next(new NotFoundError('Объект с указанным id отсутствует'));
  }

  res
    .status(INTERNAL_SERVER_ERROR)
    .send({ message: 'На сервере произошла ошибка' });
  next();
};
