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
router.get('/', getUsers);

//  находит пользователя по id
router.get('/:id', getUser);

//  создаёт пользователя
router.post('/', createUser);

//  обновляет профиль
router.patch('/me', updateUserProfile);

//  обновляет аватар
router.patch('/me/avatar', updateUserAvatar);

module.exports = router;
