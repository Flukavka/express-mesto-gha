const express = require('express');

const router = express.Router();
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

//  возвращает все карточки
router.get('/cards', getCards);

//  создаёт карточку
router.post('/cards', express.json(), createCard);

//  удаляет карточку по идентификатору
router.delete('/cards/:cardId', deleteCard);

//  поставить лайк карточке
router.put('/cards/:cardId/likes', likeCard);

//  убрать лайк с карточки
router.delete('/cards/:cardId/likes', dislikeCard);

module.exports = router;