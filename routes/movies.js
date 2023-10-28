const express = require('express');

const movieRouter = express.Router();
const { validateCreateMovie, validateDeleteMovie } = require('../middlewares/validation');

const {
  getMovies,
  addMovie,
  deleteMovie,
} = require('../controllers/movies');

movieRouter.get('/', getMovies);
movieRouter.post('/', validateCreateMovie, addMovie);
movieRouter.delete('/:movieId', validateDeleteMovie, deleteMovie);

module.exports = movieRouter;
