const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  OK_STATUS,
  CREATED_SUCCESS_STATUS,
  NOT_FOUND_ERROR,
} = require('../utils/constants');

module.exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      ...req.body,
      password: hash,
    }))
    .then((user) => {
      res.status(CREATED_SUCCESS_STATUS).send({
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
      });
    })
    .catch((err) => {
      next(err);
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        'some-secret-key',
        { expiresIn: '7d' },
      );

      return res.status(OK_STATUS).send({ token });
    })
    .catch((err) => {
      next(err);
    })
    .catch(next);
};

module.exports.getCurrentUserInfo = (req, res, next) => {
  const id = req.user._id;

  User.findById(id)
    // eslint-disable-next-line consistent-return
    .then((user) => {
      if (user) {
        return res.status(OK_STATUS).send(user);
      }
    })
    .catch((err) => {
      next(err);
    })
    .catch(next);
};

module.exports.getUsers = (_req, res, next) => User.find({})
  .then((users) => res.status(OK_STATUS).send(users))
  .catch((err) => {
    next(err);
  })
  .catch(next);

module.exports.getUser = (req, res, next) => {
  const { id } = req.params;

  User.findById(id)
    .then((user) => {
      if (!user) {
        return res.status(NOT_FOUND_ERROR).send({ message: 'Нет пользователя с таким id' });
      }

      return res.status(OK_STATUS).send(user);
    })
    .catch((err) => {
      next(err);
    })
    .catch(next);
};

module.exports.updateUserProfile = (req, res, next) => {
  const { name, about } = req.body;
  const id = req.user._id;

  User
    .findByIdAndUpdate(
      id,
      { name, about },
      { returnDocument: 'after', runValidators: true, new: true },
    )
    .then((user) => {
      if (user) {
        res.status(OK_STATUS).send({ name, about });
      }
    })
    .catch((err) => {
      next(err);
    })
    .catch(next);
};

module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const id = req.user._id;

  User.findByIdAndUpdate(
    id,
    { avatar },
    { returnDocument: 'after', runValidators: true, new: true },
  )
    .then((user) => {
      if (user) {
        res.status(OK_STATUS).send({ avatar });
      }
    })
    .catch((err) => {
      next(err);
    })
    .catch(next);
};
