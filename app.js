const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/index');

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

app.use('/', routes);

//  слушаем ПОРТ для подключения
app.listen(PORT, () => {
  // eslint-disable-next-line
  console.log(`App listening ${PORT}`);
});
