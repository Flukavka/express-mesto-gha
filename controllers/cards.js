//  const mongoose = require('mongoose');
const Card = require('../models/card');
const {
  OK_STATUS,
  CREATED_SUCCESS_STATUS,
  FORBIDDEN_STATUS,
  NOT_FOUND_ERROR,
} = require('../utils/constants');

module.exports.getCards = (_req, res, next) => {
  Card.find({})
    .then((cards) => res.status(OK_STATUS).send(cards))
    .catch((err) => {
      next(err);
    })
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  return Card.create({ name, link, owner })
    .then((card) => res.status(CREATED_SUCCESS_STATUS).send(card))
    .catch((err) => {
      next(err);
    })
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => Card.findById(req.params.cardId)
  // eslint-disable-next-line consistent-return
  .then((card) => {
    if (!card) {
      res.status(NOT_FOUND_ERROR).send({ message: 'Нет карточки с таким id' });
    } else if (card.owner.toString() === req.user._id) {
      return Card.findByIdAndRemove(req.params.cardId).then(() => res.status(OK_STATUS).send(card));
    }

    res.status(FORBIDDEN_STATUS).send({ message: 'Отказано в доступе' });
  })
  .catch((err) => {
    next(err);
  })
  .catch(next);

module.exports.likeCard = (req, res, next) => Card.findByIdAndUpdate(
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
    next(err);
  })
  .catch(next);

module.exports.dislikeCard = (req, res, next) => Card.findByIdAndUpdate(
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
    next(err);
  })
  .catch(next);
