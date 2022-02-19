const express = require('express');

const { check, validationResult } = require('express-validator');

const db = require('../db/models');
const { csrfProtection, asyncHandler } = require('./utils');

const router = express.Router();

const logIntoReviewError = (req, res, next) => {
    const error = Error("Not Logged In");
    error.status = 404;
    const message = ("Please log in or register to post a review :)");
    res.render("error", { error, message });
};

const logIntoStartReviewing = (req, res, next) => {
    const error = Error("Not Logged In - Cannot Access Reviews");
    error.status = 404;
    const message = ("Please log in or register to start reviewing movies :)");
    res.render("error", { error, message });
};

const existingReviewError = (req, res, next) => {
    const error = Error("Review Exists for Current User");
    error.status = 404;
    const message = ("You have already posted a review for this movie! :)");
    res.render("error", { error, message });
};


router.get('/', csrfProtection, asyncHandler( async (req, res, next) => {

    if (req.params.auth) {
        const userId = req.session.auth.userId;
        const reviews = await db.Review.findAll({ where: { userId } });

        const reviewsAndMovies = [];

        for (let i = 0; i < reviews.length; i++) {
            let review = reviews[i];
            let movieId = review.movieId;
            const movie = await db.Movie.findByPk(movieId);
            reviewsAndMovies.push([review, movie]);
        }

        res.render('review-list', { title: "My Reviews", reviewsAndMovies });
    } else {
        logIntoStartReviewing(req, res, next);
    }

}));

router.get("/add", csrfProtection, asyncHandler(async (req, res) => {
    if (req.session.auth) {
        const userId = req.session.auth.userId;
        const review = db.Review.build();
        res.render("review-form", {
            title: "Add Review",
            review,
            userId,
            csrfToken: req.csrfToken(),
        });
    } else {
        next(logIntoReviewError(req, res, next));
    };
}));

const reviewValidators = [
    check('content')
        .exists({checkFalsy: true})
        .withMessage("Reviews can not be empty :)"),
    check('rating')
        .exists({checkFalsy: true})
        .withMessage('Please add a rating 1 - 10 :)')
        .isInt({ min: 0 , max: 10})
        .withMessage('Please provide a rating between 1 - 10 :)'),
]

router.post('/add', csrfProtection, reviewValidators, asyncHandler(async (req, res, next) => {

    const { content, rating, userId, movieId } = req.body;

    //Check to see if 1) user is logged in and 2) user has already created a review for this movie:
    if (req.session.auth) {
        const existingReview = await db.Review.findOne({ where: { userId, movieId } });

        if (existingReview) {
            next(existingReviewError(req, res, next));
        }
    } else {
        next(logIntoReviewError(req, res, next));
    }

    const existingReview = await db.Review.findOne({where: {userId, movieId} });

    const review = db.Review.build({ content, rating, userId, movieId });

    const movie = await db.Movie.findByPk(movieId);
    const collections = await db.Collection.findAll({ where: { userId } });


    const validatorErrors = validationResult(req);


    const errors = validatorErrors.array().map(error => error.msg);

    if (!errors.length) { //there is NO length in the errors arary meaning it's good
        await review.save(); //then we want to save the collection
        res.redirect(`/movies/${movieId}`); // then redirect the page
    } else {
        const review = db.Review.build();
        res.render('movie', { title: movie.name, review, userId, description: movie.description, director: movie.director, releaseYear: movie.releaseYear, imageURL: movie.imageURL, pk: movie.id, collections, errors, csrfToken: req.csrfToken() });
    }
})
);

router.get('/:id', async(req, res) => {
    const reviewId = req.params.id;
    const review = await db.Review.findByPk(reviewId);

    res.render('review', {review})
});

router.delete('/:id', async (req, res) => {
    const reviewId = req.params.id
    const review = await db.Review.findByPk(reviewId)
    await review.destroy();

    res.json({ message: 'Success' })
});

router.get('/:id(\\d+)/edit', csrfProtection, asyncHandler(async (req, res, next) => {
    if (req.session.auth) {
      console.log("req.params!!!!________________,", req.params)
      const reviewId = parseInt(req.params.id, 10)
      const review = await db.Review.findByPk(reviewId)

      // const userId = req.session.auth.userId;

      const reviewContent = review.content;
      const reviewRating = review.rating;
      const userId = review.userId;
      const pk = review.movieId;

      // console.log("userId--------------------", userId);
      // const collection = db.Collection.build();

      res.render('review-edit-form', {
        title: 'Edit An Existing Review',
        reviewContent,
        reviewRating,
        reviewId,
        userId,
        pk,
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
      console.log("req.params!!!!________________,", req.params)
      const reviewId = parseInt(req.params.id, 10)
      console.log("REVIEW ID here-------!!!!!!!!!!!!!!!!!!!!!!!!", reviewId);
      const review = await db.Review.findByPk(reviewId)
      const { content, rating } = req.body;
      review.content = content;
      review.rating = rating;

      await review.save();

      // await pet.update({
      //   name: "Fido, Sr."
      // });

      // const userId = req.session.auth.userId;

      // console.log("userId--------------------", userId);
      // const collection = db.Collection.build();

      res.redirect('/reviews');

    } else {
      next(notLoggedInError(req, res, next));
    }

  }));






module.exports = router
