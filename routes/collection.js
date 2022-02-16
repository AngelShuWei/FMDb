const express = require('express');
const db = require('../db/models');
const { csrfProtection, asyncHandler } = require('./utils');
const { check, validationResult } = require('express-validator');

const router = express.Router();
const { loginUser, logoutUser } = require('../auth');

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
  // const movies = await db.Movie.findAll({ order: [['name', 'ASC']] });

  // res.render('collection-list', { title: 'Movies', movies});
}));

router.get('/add', csrfProtection, (req, res) => {
  const collection = db.Collection.build();
  res.render('add-collection', {
    title: 'Create New Collection',
    collection,
    csrfToken: req.csrfToken(),
  });
});

router.post('/add', csrfProtection, asyncHandler(async (req, res) => {
  const {
    title,
    author,
    releaseDate,
    pageCount,
    publisher,
  } = req.body;

  const book = db.Book.build({
    title,
    author,
    releaseDate,
    pageCount,
    publisher,
  });

  try {
    await book.save();
    res.redirect('/');
  } catch (err) {
    res.render('book-add', {
      title: 'Add Book',
      book,
      error: err,
      csrfToken: req.csrfToken(),
    });
  }
}));

// router.get('/:id(\\d+)', asyncHandler(async (req, res, next) => {
//   const id = parseInt(req.params.id, 10);
//   const movie = await db.Movie.findByPk(id);

//   if (movie) {
//     res.render('movie', { title: movie.name, description: movie.description, director: movie.director, releaseYear: movie.releaseYear, imageURL: movie.imageURL, pk: movie.id });
//   } else {
//     next(movieNotFoundError(req, res, next));
//   }
// }));




module.exports = router;
