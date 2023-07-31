const express = require('express');
const { errors } = require('celebrate');
const { errorMiddleware } = require('../middlewares/errorMiddleware');
const routesUsers = require('./users');
const routesCards = require('./cards');
const routesLogin = require('./login');
const { auth } = require('../middlewares/auth');
const routesCreateUser = require('./createUser');
const { NOT_FOUND_ERROR } = require('../utils/constants');

const routes = express.Router();

routes.use(express.json());

routes.use('/users', auth, routesUsers);
routes.use('/cards', auth, routesCards);
routes.use('/signup', routesCreateUser);
routes.use('/signin', routesLogin);

routes.use('*', (_req, res) => {
  res.status(NOT_FOUND_ERROR).json({ message: 'Страница не найдена' });
});

routes.use(errors());
routes.use(errorMiddleware);

module.exports = routes;
