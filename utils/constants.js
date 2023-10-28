const URL_PATTERN = /^((http|https|ftp):\/\/)?(www\.)?([\w-.~:/?#[\]@!$&')(*+,;=]*\.?)*\.{1}[\w]{2,8}(\/([\w-.~:/?#[\]@!$&')(*+,;=])*)?/;

const ERROR_MESS = {
  INCORRECT_AUTH: 'Неверный логин или пароль',
  INTERNAL_SERVER_ERROR: 'На сервере произошла ошибка',
  INCORRECT_DATA: 'Отправлены некорректные данные',
  USER_CONFLICT: 'Пользователь с таким email уже существует',
  USER_NOT_FOUND: 'Пользователь не найден',
  MOVIE_NOT_FOUND: 'Фильм не найден',
  PAGE_NOT_FOUND: 'Страница не найдена',
  FORBIDDEN: 'Доступ ограничен',
  UNAUTHORIZED: 'Необходима авторизация',
  INCORRECT_URL: 'Введите корректный URL-адрес',
};

const CORS_URL = ['http://localhost:3001', 'https://localhost:3001', 'https://asp.movies.nomoredomainsrocks.ru', 'http://asp.movies.nomoredomainsrocks.ru'];

const CORS_OPT = {
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH'],
  useUnifiedTopology: true,
  useNewUrlParser: true,
  autoIndex: true,
};

module.exports = {
  URL_PATTERN,
  ERROR_MESS,
  CORS_URL,
  CORS_OPT,
};
