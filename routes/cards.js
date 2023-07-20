const express = require('express');
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
router.post('/', express.json(), createCard);

//  удаляет карточку по идентификатору
router.delete('/:cardId', deleteCard);

//  поставить лайк карточке
router.put('/:cardId/likes', likeCard);

//  убрать лайк с карточки
router.delete('/:cardId/likes', dislikeCard);

module.exports = router;
