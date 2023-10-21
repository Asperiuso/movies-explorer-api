const router = require('express').Router();
const { ERROR_MESS } = require('../utils/constants');
const NotFoundError = require('../errors/NotFoundError');
const userRouter = require('./users');
const movieRouter = require('./movies');
const { createUserInfo, login } = require('../controllers/users');
const { validateCreateUser, validateLogin } = require('../middlewares/validation');
const auth = require('../middlewares/auth');

router.post('/signup', validateCreateUser, createUserInfo);
router.post('/signin', validateLogin, login);

router.use(auth);

router.use('/users', userRouter);
router.use('/movies', movieRouter);

router.use('*', (req, res, next) => {
  next(new NotFoundError(ERROR_MESS.PAGE_NOT_FOUND));
});

module.exports = router;
