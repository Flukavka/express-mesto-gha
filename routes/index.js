const express = require('express');
const routesUsers = require('./users');
const routesCards = require('./cards');
const { NOT_FOUND_ERROR } = require('../utils/constants');

const routes = express.Router();

routes.use(express.json());

routes.use('/users', routesUsers);
routes.use('/cards', routesCards);

routes.use('*', (_req, res) => {
  res.status(NOT_FOUND_ERROR).json({ message: 'Страница не найдена' });
});

module.exports = routes;
