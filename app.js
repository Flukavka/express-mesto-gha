const express = require('express');
const mongoose = require('mongoose');
const routesUsers = require('./routes/users');
const routesCards = require('./routes/cards');

const { PORT = 3000 } = process.env;

// подключаемся к БД
mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

//  запускаем приложение
const app = express();

//  добавляет в каждый запрос объект user
app.use((req, _res, next) => {
  req.user = {
    _id: '64b6816657c31b760b713f2b',
  };

  next();
});

app.use(express.json());

app.use(routesUsers);
app.use(routesCards);

//  слушаем ПОРТ для подключения
app.listen(PORT, () => {
  // eslint-disable-next-line consistent-return
  console.log(`App listening ${PORT}`);
});
