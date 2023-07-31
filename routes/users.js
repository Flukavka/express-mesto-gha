const express = require('express');
//  const { celebrate, Joi } = require('celebrate');

const router = express.Router();
const { auth } = require('../middlewares/auth');
const {
  getUsers,
  getCurrentUserInfo,
  getUser,
  updateUserProfile,
  updateUserAvatar,
} = require('../controllers/users');

//  получает данные пользователей
router.get('/', getUsers);

//  получает данные залогиненного пользователя
router.get('/me', auth, getCurrentUserInfo);

//  находит пользователя по id
router.get('/:id', getUser);

//  обновляет профиль
router.patch('/me', updateUserProfile);

//  обновляет аватар
router.patch('/me/avatar', updateUserAvatar);

module.exports = router;
