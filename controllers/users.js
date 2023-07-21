const mongoose = require('mongoose');
const User = require('../models/user');
const {
  OK_STATUS,
  CREATED_SUCCESS_STATUS,
  BAD_REQUEST_ERROR,
  NOT_FOUND_ERROR,
  INTERNAL_SERVER_ERROR,
} = require('../utils/constants');

module.exports.getUsers = (_req, res) => User.find({})
  .then((users) => res.status(OK_STATUS).send(users))
  .catch(() => res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка' }));

module.exports.getUser = (req, res) => {
  const { id } = req.params;

  User.findById(id)
    .then((user) => {
      if (!user) {
        return res.status(NOT_FOUND_ERROR).send({ message: 'Нет пользователя с таким id' });
      }

      return res.status(OK_STATUS).send(user);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        res.status(BAD_REQUEST_ERROR).send({
          message: 'Некорректный id пользователя',
        });

        return;
      }

      res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка' });
    });
};

module.exports.createUser = (req, res) => User.create({ ...req.body })
  .then((user) => res.status(CREATED_SUCCESS_STATUS).send(user))
  .catch((err) => {
    if (err instanceof mongoose.Error.ValidationError) {
      res.status(BAD_REQUEST_ERROR).send({
        message: `${Object.values(err.errors)
          .map((error) => error.message)
          .join(', ')}`,
      });

      return;
    }

    res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка' });
  });

module.exports.updateUserProfile = (req, res) => {
  const { name, about } = req.body;
  const id = req.user._id;

  User
    .findByIdAndUpdate(
      id,
      { name, about },
      { returnDocument: 'after', runValidators: true, new: true },
    )
    .then((user) => {
      if (!user) {
        res.status(NOT_FOUND_ERROR).send({ message: 'Пользователь с указанным id не найден' });
        return;
      }

      res.status(OK_STATUS).send({ name, about });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(BAD_REQUEST_ERROR).send({
          message: `${Object.values(err.errors)
            .map((error) => error.message)
            .join(', ')}`,
        });

        return;
      }

      res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка' });
    });
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  const id = req.user._id;

  User.findByIdAndUpdate(
    id,
    { avatar },
    { returnDocument: 'after', runValidators: true, new: true },
  )
    .then((user) => {
      if (!user) {
        res.status(NOT_FOUND_ERROR).send({ message: 'Пользователь с указанным id не найден' });
        return;
      }

      res.status(OK_STATUS).send({ avatar });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(BAD_REQUEST_ERROR).send({
          message: `${Object.values(err.errors)
            .map((error) => error.message)
            .join(', ')}`,
        });

        return;
      }

      res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка' });
    });
};
