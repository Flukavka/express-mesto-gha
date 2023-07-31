const express = require('express');
const { celebrate, Joi } = require('celebrate');

const router = express.Router();

const {
  createUser,
} = require('../controllers/users');

router.post('/', celebrate({
  // валидируем параметры
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    password: Joi.string().required().min(8),
    avatar: Joi.string().pattern(/(https?:\/\/)(w{3}\.)?(((\d{1,3}\.){3}\d{1,3})|((\w-?)+\.(ru|com)))(:\d{2,5})?((\/.+)+)?\/?#?/),
  }).unknown(true),
}), createUser);

module.exports = router;
