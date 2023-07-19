const User = require('../models/user');

module.exports.getUsers = (_req, res) => User.find({})
  .then((users) => res.status(200).send(users))
  .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));

module.exports.getUser = (_req, res) => User.findById
  .then((user) => {
    if (!user) {
      return res.status(404).send({ message: 'Нет пользователя с таким id' });
    }

    return res.status(200).send(user);
  })
  .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));

module.exports.createUser = (req, res) => User.create({ ...req.body })
  .then((user) => res.status(201).send(user))
  .catch((err) => {
    if (err.name === 'ValidationError') {
      res.status(400).send({
        message: `${Object.values(err.errors)
          .map((error) => error.message)
          .join(', ')}`,
      });

      return;
    }

    res.status(500).send({ message: 'Произошла ошибка' });
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
        res.status(404).send({ message: 'Пользователь с указанным id не найден' });
        return;
      }

      res.status(200).send({ name, about });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({
          message: `${Object.values(err.errors)
            .map((error) => error.message)
            .join(', ')}`,
        });

        res.status(500).send({ message: 'Произошла ошибка' });
      }
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
        res.status(404).send({ message: 'Пользователь с указанным id не найден' });
        return;
      }

      res.status(200).send({ avatar });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({
          message: `${Object.values(err.errors)
            .map((error) => error.message)
            .join(', ')}`,
        });

        res.status(500).send({ message: 'Произошла ошибка' });
      }
    });
};
