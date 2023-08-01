const express = require('express');
const { celebrate, Joi } = require('celebrate');
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

const router = express.Router();

//  возвращает все карточки
router.get('/', getCards);

//  создаёт карточку
router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(/(https?:\/\/)(w{3}\.)?(((\d{1,3}\.){3}\d{1,3})|((\w-?)+\.(ru|com)))(:\d{2,5})?((\/.+)+)?\/?#?/),
    owner: Joi.string().length(24).hex(),
  }).unknown(true),
}), express.json(), createCard);

//  удаляет карточку по идентификатору
router.delete('/:cardId', celebrate({
  body: Joi.object().keys({
    id: Joi.string().length(24).hex(),
  }).unknown(true),
}), deleteCard);

//  поставить лайк карточке
router.put('/:cardId/likes', celebrate({
  body: Joi.object().keys({
    id: Joi.string().length(24).hex(),
  }).unknown(true),
}), likeCard);

//  убрать лайк с карточки
router.delete('/:cardId/likes', celebrate({
  body: Joi.object().keys({
    id: Joi.string().length(24).hex(),
  }).unknown(true),
}), dislikeCard);

module.exports = router;
