const express = require('express');
const db = require('../db/models');
const { csrfProtection, asyncHandler } = require('./utils');
const { check, validationResult } = require('express-validator');


const router = express.Router();
const { loginUser, logoutUser, restoreUser } = require('../auth');
const { string } = require('yargs');

const notLoggedInError = (req, res, next) => {
  const error = Error("Not Logged In");
  error.status = 404;
  const message = "Please log in or register to view and create collections :)";
  res.render('error', { error, message });
};

const existingCollectionMovie = (req, res, next) => {
  const error = Error("Movie already exists in collection");
  error.status = 404;
  const message = "This movie already exists in that collection :)";
  res.render('error', { error, message });
};

const noCollectionsError = (req, res, next) => {
  const error = Error("No existing collections");
  error.status = 404;
  const message = "You current do not have any collections :)";
  res.render('error', { error, message });
};

router.get('/', asyncHandler(async (req, res, next) => {
  if (req.session.auth) {
    const userId = req.session.auth.userId;
    // console.log("req.session.auth---------------------", req.session.auth);
    // console.log("userId---------------------", userId);
    const collections = await db.Collection.findAll({ where: { userId } });
    // console.log(collections);
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
  // .custom((value) => { //value is whatever the user passed in. It gets fed into the chain
  //   return db.Collection.findOne({ where: {
  //     name: value,
  //     userId: req.session.auth.userId //means that for EACH user, needs to have unique collection name
  //    }})
  //     .then((collection) => { //if true, then will reject that request
  //       if (collection) {
  //         return Promise.reject('The Collection name already exists');
  //       }
  //     });
  // }),
];


router.get('/add', csrfProtection, asyncHandler(async (req, res, next) => {
  if (req.session.auth) {
    const userId = req.session.auth.userId;
    // console.log("userId--------------------", userId);
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

  const validatorErrors = validationResult(req); //collectionvalidator errors gets passed into validation results. req in this case is the reqeust to create a new collection

  //validator erros is an OBJECTTT, you use .array() to make it into an array ( {{},{}} => [{}, {}] ) and then map through the array and access each obj inside it by using the key to get the value. In this case we're trying to get the err.msg or each possible error message.
  const errors = validatorErrors.array().map(error => error.msg); //map through the validation results. Are there errors?
  const collectionExists = await db.Collection.findOne({
    where: {
      name, //coming into the body as name
      userId: parseInt(userId, 10) //means that for EACH user, needs to have unique collection name. If invalid integer type, and references dialect/postgres/queryy means the query is incorrect
    }
  })

  if (collectionExists) {
    errors.push('The Collection name already exists')
  }

  if (!errors.length) { //there is NO length in the errors arary meaning it's good
    await collection.save(); //then we want to save the collection
    res.redirect('/collections'); // then redirect the page
  } else {
    // const errors = validatorErrors.array().map((error) => error.msg);
    // const collectionExists = await db.Collection.findOne({ where: {
    //   name, //coming into the body as name
    //   userId //means that for EACH user, needs to have unique collection name
    // }})
    // if (collectionExists) {
    //   errors.push('The Collection name already exists')
    // }
    res.render('add-collection', {
      title: 'Create New Collection',
      collection,
      errors, //feeds the errors in and then it'll display on the pug
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

  const collectionMovies = await db.CollectionMovie.findAll({ where: { collectionId } })

  let movieIds = [];
  collectionMovies.forEach(movie => {
    movieIds.push(movie.movieId)
  })

  let movieObjects = [];

  for (let i = 0; i < movieIds.length; i++) {
    let movie = movieIds[i]
    let movieDetails = await db.Movie.findByPk(movie);
    movieObjects.push(movieDetails)
  }

  res.render('collection', { title: `Collection: ${collection.name}`,movieObjects })

}));

// router.get('/test', csrfProtection, (req, res) => {
//   const collectionMovie = db.CollectionMovie.build();
//   res.render('add-movie-to-collection', {
//     title: 'Collection Movie',
//     collectionMovie,
//     csrfToken: req.csrfToken(),
//   });
// });    //testing join table



router.post('/add-movie', csrfProtection, asyncHandler(async (req, res, next) => {

  if (!req.session.auth) {
    next(notLoggedInError(req, res, next));
  }
  const userId = req.session.auth.userId; //finding out that the user is persisting

  //if logged in user currently does not have any collections and clicks the "Add to Collection" button then render error:
  const collections = await db.Collection.findAll({where: userId});

  if (!collections) {
    next(noCollectionsError(req, res, next));
  }

  const {
    addToCollections
  } = req.body;
 // req.body will return csrf and value from the submit i.e. 1#2 in an obj. That's why we need to destructure the obj

  const body = addToCollections.split('#');   //addToCollections is the name of the selection i.e. Romance. It becomes the key to the key value pair
  const collectionIdStr = body[0];
  const movieIdStr = body[1];
  const collectionId = parseInt(collectionIdStr, 10); //since its wrapped in an interpolated string, when we get it from front end (pug), we have to make it back into an integer.
  const movieId = parseInt(movieIdStr, 10); //^^same logic as above

  const tableExists = await db.CollectionMovie.findOne({
    where: {
      movieId,
      collectionId
    }
  });

  console.log("TABLE EXISTS------------------t", tableExists);

  if (tableExists) {
    next(existingCollectionMovie(req, res,next));
    return;
  }

  if (!tableExists) {
    const collectionMovie = db.CollectionMovie.build({
      movieId,
      collectionId
    });

    await collectionMovie.save();
    // res.redirect(`/collections/${collectionId}`)
    res.redirect(`/movies/${movieId}`);
  };
  // } else {
  //   //TO DO
  //   //RE RENDER PAGE WITH ERROR BECAUSE JOIN TABLE EXISTS ALREADY
  //   next(existingCollectionMovie)
  //   //
  // }

})
);

router.delete('/:id', async(req, res) => {
  const collectionId = req.params.id
  const collection = await db.Collection.findByPk(collectionId)

  if (collection) {
    await db.CollectionMovie.destroy({
      where: {
        collectionId
      }
    });
    await collection.destroy();

    res.json({ message: 'Success' });
  };

})

// '/:id(\\d+)'

router.get('/:id(\\d+)/edit', csrfProtection, asyncHandler(async (req, res, next) => {
  if (req.session.auth) {
    console.log("req.params!!!!________________,", req.params)
    const collectionId = parseInt(req.params.id, 10)
    const collection = await db.Collection.findByPk(collectionId)

    const userId = req.session.auth.userId;

    const collectionName = collection.name
    // console.log("userId--------------------", userId);
    // const collection = db.Collection.build(); dd

    res.render('collection-edit-form', {
      title: 'Edit Collection Name',
      collectionId,
      collectionName,
      userId,
      csrfToken: req.csrfToken(),
    });

  } else {

    next(notLoggedInError(req, res, next));
  };

}));


router.post('/:id/edit', csrfProtection, asyncHandler( async(req, res, next) => {
  // console.log('NOW IN THE PUT ROUTER');
  // console.log("req.params!!!!________________,", req.params)

  if (req.session.auth) {
    // console.log("req.params!!!!________________,", req.params)
    const collectionId = parseInt(req.params.id, 10)
    // console.log("COLLECTION ID here-------!!!!!!!!!!!!!!!!!!!!!!!!", collectionId);
    const collection = await db.Collection.findByPk(collectionId)
    const { name, userId } = req.body;

    const errors = [];

    if (name) {
      const existingCollection = await db.Collection.findOne({where: {name, userId}});
      if (!existingCollection) {
        collection.name = name
        await collection.save();
        res.redirect('/collections');
      } else {
        errors.push('Collection name already exists! :)');
        // const collection = db.Collection.build();
        const collectionName = name;
        res.render('collection-edit-form', { title: 'Edit Collection Name', collectionName, collectionId, name, userId, errors, csrfToken: req.csrfToken() });
      }
    }

  } else {
    next(notLoggedInError(req, res, next));
  }

}));

module.exports = router;
