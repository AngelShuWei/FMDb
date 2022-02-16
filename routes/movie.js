const express = require('express');
const db = require('../db/models');
const { csrfProtection, asyncHandler } = require('./utils');
const { check, validationResult } = require('express-validator');

const router = express.Router();

const movieNotFoundError = (req, res, next) => {
  const error = Error("Movie Not Found");
  error.status = 404;
  const message = "Movie Not found";
  res.render('error', {error, message});
}
// const movieNotFoundError = movieId => {
//   const err = Error("Movie could not be found.");
//   err.title = "Movie not found.";
//   err.status = 404;
//   return err;
// }

router.get('/', asyncHandler(async (req, res, next) => {
  const movies = await db.Movie.findAll({ order: [['name', 'ASC']] });
  // const id = parseInt(req.params.id, 10);
  // const movie = await db.Movie.findByPk(id);

  res.render('movie-list', { title: 'Movies', movies});
}));


router.get('/:id(\\d+)', asyncHandler(async (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  const movie = await db.Movie.findByPk(id);
  const userId = req.session.auth.userId;
  const collections = await db.Collection.findAll({where: {userId}});


  if (movie) {
    res.render('movie', { title: movie.name, description: movie.description, director: movie.director, releaseYear: movie.releaseYear, imageURL: movie.imageURL, pk: movie.id, collections});
  } else {
    next(movieNotFoundError(req, res, next));
  }
}));






module.exports = router;
