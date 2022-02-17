const express = require('express');
const db = require('../db/models');
const { csrfProtection, asyncHandler } = require('./utils');
const { check, validationResult } = require('express-validator');


const router = express.Router();
const { loginUser, logoutUser, restoreUser } = require('../auth');

const notLoggedInError = (req, res, next) => {
  const error = Error("Not Logged In");
  error.status = 404;
  const message = "Please log in or register to view and create collections :)";
  res.render('error', { error, message });
};

router.get('/', asyncHandler(async (req, res, next) => {
  if (req.session.auth) {
    const userId = req.session.auth.userId;
    console.log("req.session.auth---------------------", req.session.auth);
    console.log("userId---------------------", userId);
    const collections = await db.Collection.findAll({ where: { userId } });
    console.log(collections);
    res.render('collection-list', { title: "My Collections", collections });
  } else {
    next(notLoggedInError(req, res, next));
  };

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


router.get('/add', csrfProtection, asyncHandler(async (req, res, next) => {
  if (req.session.auth) {
    const userId = req.session.auth.userId;
    console.log("userId--------------------", userId);
    const collection = db.Collection.build();
    res.render('add-collection', {
      title: 'Create New Collection',
      collection,
      userId,
      csrfToken: req.csrfToken(),
    });
  } else {
    next(notLoggedInError(req, res, next));
  };
}));

router.post('/add', csrfProtection, collectionValidators, asyncHandler(async (req, res) => {
  // const id = req.session.auth.userId;
  // console.log(id);

  const { name, userId } = req.body;

  const collection = db.Collection.build({ name, userId });

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
})
);

router.get('/:id(\\d+)', asyncHandler(async (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  // const movies = await db.Collection.findByPk(id);
  const userId = req.session.auth.userId;
  const collections = await db.Collection.findAll({ where: { userId } });
  const collection = await db.Collection.findByPk(id);
  const collectionId = id

  const collectionMovies = await db.CollectionMovie.findAll({ where: {collectionId}})

  // console.log(collectionMovies[0].movieId);
  let movieIds = [];
  collectionMovies.forEach(movie => {
    movieIds.push(movie.movieId)
  })

  movieIds.forEach( id => {
    const movie = await db.Movie.findByPk(id);
    const poster = movie.imageURL;
    const name = movie.name;

    res.render('collection', { movieIds })
  })

  // if (movies) {
  //   res.render('movie', { title: movie.name, description: movie.description, director: movie.director, releaseYear: movie.releaseYear, imageURL: movie.imageURL, pk: movie.id });
  // } else {
  //   next(movieNotFoundError(req, res, next));
  // }
}));

router.get('/test', csrfProtection, (req, res) => {
  const collectionMovie = db.CollectionMovie.build();
  res.render('add-movie-to-collection', {
    title: 'Collection Movie',
    collectionMovie,
    csrfToken: req.csrfToken(),
  });
});


router.post('/3', csrfProtection,
  asyncHandler(async (req, res) => {
    const userId = req.session.auth.userId;
    // const collections = await db.Collection.findAll({ where: { userId } });
    // const collection = await db.Collection.findByPk(id);

    const {
      movieId,
      collectionId,
    } = req.body;

    const collectionMovie = db.CollectionMovie.build({
      movieId,
      collectionId
    });

    await collectionMovie.save();
    res.redirect(`/collections/${collectionId}`)

  })
);

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
