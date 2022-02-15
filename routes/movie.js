const express = require('express');
const db = require('../db/models');
const { csrfProtection, asyncHandler } = require('./utils');
const { check, validationResult } = require('express-validator');

const router = express.Router();

// const movieNotFoundError = (req, res, next) => {
//   const movieNotFoundError = validationResult(req);
//       if (!movieNotFoundError.isEmpty()){

//           const err = Error("Movie Not Found");
//           err.status = 404;
//           err.title = "Movie Not found";
//           return next(err);
//       }
//       next();
// }
// const movieNotFoundError = movieId => {
//   const err = Error("Movie could not be found.");
//   err.title = "Movie not found.";
//   err.status = 404;
//   return err;
// }

router.get('/', asyncHandler(async (req, res, next) => {
    const movies = await db.Movie.findAll({ order: [['name', 'ASC']] });
    res.render('movie-list', { title: 'Movies', movies });
}));

router.get('/:id(\\d+)', asyncHandler(async (req, res, next) => {
  const id = parseInt(req.params.id, 10);
    const movie = await db.Movie.findByPk(id);
    res.render('movie', { title: movie.name });
    // if (movie) {
    //   res.render('movie', { title: movie.name });
    // } else {
    //   next(movieNotFoundError(id));
    // }
}));




module.exports = router;
