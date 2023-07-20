const mongoose = require('mongoose');
const Card = require('../models/card');
const {
  OK_STATUS,
  CREATED_SUCCESS_STATUS,
  BAD_REQUEST_ERROR,
  NOT_FOUND_ERROR,
  INTERNAL_SERVER_ERROR,
} = require('../utils/constants');

module.exports.getCards = (_req, res) => {
  Card.find({})
    .then((cards) => res.status(OK_STATUS).send(cards))
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

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  return Card.create({ name, link, owner })
    .then((card) => res.status(CREATED_SUCCESS_STATUS).send(card))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(BAD_REQUEST_ERROR).send({
          message: `${Object.values(err.errors)
            .map((error) => error.message)
            .join(', ')}`,
        });
        return;
      }

      res.status(500).send({ message: 'Произошла ошибка' });
    });
};

module.exports.deleteCard = (req, res) => Card.findByIdAndRemove(req.params.cardId)
  // eslint-disable-next-line consistent-return
  .then((card) => {
    if (!card) {
      return res.status(NOT_FOUND_ERROR).send({ message: 'Нет карточки с таким id' });
    }

    res.status(OK_STATUS).send(card);
  })
  .catch((err) => {
    if (err instanceof mongoose.Error.CastError) {
      res.status(BAD_REQUEST_ERROR).send({
        message: 'Некорректный id карточки',
      });

      res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка' });
    }
  });

module.exports.likeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
  { new: true },
)
  // eslint-disable-next-line consistent-return
  .then((card) => {
    if (!card) {
      return res.status(NOT_FOUND_ERROR).send({ message: 'Нет карточки с таким id' });
    }

    return res.status(OK_STATUS).send(card);
  })
  .catch((err) => {
    if (err instanceof mongoose.Error.CastError) {
      res.status(BAD_REQUEST_ERROR).send({
        message: 'Некорректный id карточки',
      });

      res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка' });
    }
  });

module.exports.dislikeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } }, // убрать _id из массива
  { new: true },
)
  // eslint-disable-next-line consistent-return
  .then((card) => {
    if (!card) {
      return res.status(NOT_FOUND_ERROR).send({ message: 'Нет карточки с таким id' });
    }

    res.status(OK_STATUS).send(card);
  })
  .catch((err) => {
    if (err instanceof mongoose.Error.CastError) {
      res.status(BAD_REQUEST_ERROR).send({
        message: 'Некорректный id карточки',
      });

      res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка' });
    }
  });
