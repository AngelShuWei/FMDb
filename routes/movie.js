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


router.get('/:id(\\d+)', csrfProtection, asyncHandler(async (req, res, next) => { //need to include csrfProtection here because this get page includes a form and the form needs to have csrf upon initial loading
  const id = parseInt(req.params.id, 10);
  const movie = await db.Movie.findByPk(id);
  const userId = req.session.auth.userId;
  const collections = await db.Collection.findAll({ where: {userId} });

  const review = db.Review.build();

  if (movie) {
    res.render('movie', { title: movie.name, review, userId, description: movie.description, director: movie.director, releaseYear: movie.releaseYear, imageURL: movie.imageURL, pk: movie.id, collections, csrfToken: req.csrfToken() });
  } else {
    next(movieNotFoundError(req, res, next));
  }
}));

// router.post('/collections/:id(\\d+)', csrfProtection,
//   asyncHandler(async (req, res) => {
//     const collectionId = parseInt(req.params.id, 10)
//     console.log(req.body)
//     // const {
//     //   movieId,
//     //   collectionId,
//     // } = req.body;

//     const user = db.User.build({
//       username,
//       email,
//     });

//     // const validatorErrors = validationResult(req);

//     // if (validatorErrors.isEmpty()) { //if no errors
//     //   const hashedPassword = await bcrypt.hash(password, 10);
//     //   user.hashedPassword = hashedPassword;
//     //   await user.save();
//     //   loginUser(req, res, user);
//     //   res.redirect('/');
//     // } else {
//     //   const errors = validatorErrors.array().map((error) => error.msg);
//     //   res.render('user-register', {
//     //     title: 'Register',
//     //     user,
//     //     errors,
//     //     csrfToken: req.csrfToken(),
//     //   });
//     // }
//   })
// );




module.exports = router;
