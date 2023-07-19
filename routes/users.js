const express = require('express');

const router = express.Router();
const {
  getUsers,
  getUser,
  createUser,
  updateUserProfile,
  updateUserAvatar,
} = require('../controllers/users');

//  получает данные пользователей
router.get('/users', getUsers);

//  находит пользователя по id
router.get('/users/:id', getUser);

//  создаёт пользователя
router.post('/users', express.json(), createUser);

//  обновляет профиль
router.patch('/users/me', updateUserProfile);

//  обновляет аватар
router.patch('/users/me/avatar', updateUserAvatar);

module.exports = router;
