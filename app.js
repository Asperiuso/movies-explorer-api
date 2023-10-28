/* eslint-disable no-console */
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const helmet = require('helmet');
const { CORS_URL, CORS_OPTIONS } = require('./utils/constants');
const config = require('./utils/config');
const limiter = require('./middlewares/limiter');
const router = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/error-handler');

const {
  PORT = config.PORT,
  DB_URL = config.DB_URL,
} = process.env;

function configureApp() {
  const app = express();

  app.use(cors({ origin: CORS_URL }));
  app.use(express.json());
  app.use(helmet());

  mongoose.connect(DB_URL, CORS_OPTIONS);

  app.use(requestLogger);

  // краш-тест сервера
  app.get('/crash-test', () => {
    setTimeout(() => {
      throw new Error('Сервер сейчас упадёт');
    }, 0);
  });

  app.use(limiter);
  app.use(router);
  app.use(errorLogger);
  app.use(errors());
  app.use(errorHandler);

  return app;
}

const app = configureApp();
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту: ${PORT}`);
});
