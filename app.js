const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/index');

const { PORT = 3000 } = process.env;

// подключаемся к БД
mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

//  запускаем приложение
const app = express();

app.use('/', routes);

//  слушаем ПОРТ для подключения
app.listen(PORT, () => {
  // eslint-disable-next-line
  console.log(`App listening ${PORT}`);
});
