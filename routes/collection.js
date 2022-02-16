const express = require('express');
const db = require('../db/models');
const { csrfProtection, asyncHandler } = require('./utils');
const { check, validationResult } = require('express-validator');

const router = express.Router();
const { loginUser, logoutUser } = require('../auth');


router.get('/', asyncHandler(async (req, res, next) => {
  res.render('collection-list', { title: "My Collections"});
}));

const collectionValidators = [
  check('name')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for your Collection')
    .isLength({ max: 50 })
    .withMessage('The Collection name must not be more than 50 characters long')
    .custom((value) => {
      return db.Collection.findOne({ where: { name: value } })
        .then((collection) => {
          if (collection) {
            return Promise.reject('The Collection name already exists');
          }
        });
    }),
];

router.get('/add', csrfProtection, (req, res) => {
  const collection = db.Collection.build();
  res.render('add-collection', {
    title: 'Create New Collection',
    collection,
    csrfToken: req.csrfToken(),
  });
});

router.post('/add', csrfProtection, collectionValidators, asyncHandler(async (req, res) => {
  // const id = req.session.auth.userId;
  // console.log(id);

  const { name, userId } = req.body;

  const collection = db.Collection.build({
    name
  });

  const validatorErrors = validationResult(req);

  if (validatorErrors.isEmpty()) { //if no errors
    await collection.save();
    res.redirect('/collections');
  } else {
    const errors = validatorErrors.array().map((error) => error.msg);
    res.render('add-collection', {
      title: 'Create New Collection',
      collection,
      errors,
      csrfToken: req.csrfToken(),
    });
  }
  }));


// const loginUser = (req, res, user) => {
//   req.session.auth = {
//     userId: user.id,
//   };
// };


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
