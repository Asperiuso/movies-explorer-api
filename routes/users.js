const express = require('express');

const userRouter = express.Router();
const { validateEditUserInfo } = require('../middlewares/validation');

const {
  getUserInfo,
  editUserInfo,
} = require('../controllers/users');

userRouter.get('/me', getUserInfo);
userRouter.patch('/me', validateEditUserInfo, editUserInfo);

module.exports = userRouter;
