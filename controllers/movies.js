const Movie = require('../models/movie');

const BadRequestError = require('../errors/BadRequestError'); 
const ForbiddenError = require('../errors/ForbiddenError'); 
const NotFoundError = require('../errors/NotFoundError'); 
const { ERROR_MESS } = require('../utils/constants');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.status(200).send(movies))
    .catch(next);
};

module.exports.addMovie = (req, res, next) => {
  Movie.create({ ...req.body, owner: req.user._id })
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(ERROR_MESS.INCORRECT_DATA));
      }
      return next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(ERROR_MESS.MOVIE_NOT_FOUND);
      }
      if (movie.owner.toString() !== req.user._id.toString()) {
        throw new ForbiddenError(ERROR_MESS.FORBIDDEN);
      } return Movie.deleteOne(movie)
        .then((deleteMovie) => res.status(200).send({ deleteMovie }));
    })
    .catch(next);
};
