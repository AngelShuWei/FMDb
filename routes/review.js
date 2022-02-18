const express = require('express');

const { check, validationResult } = require('express-validator');

const db = require('../db/models');
const { csrfProtection, asyncHandler } = require('./utils');

const router = express.Router();

const logIntoReviewError = (req, res, next) => {
    const error = Error("Not Logged In");
    error.status = 404;
    const message = ("Please log in or register to post a review :");
    res.render("error", { error, message });
};


router.get('/', csrfProtection, asyncHandler( async (req, res) => {
    // const id = parseInt(req.params.id, 10);
    const userId = req.session.auth.userId;
    const reviews = await db.Review.findAll({ where: { userId } });

    const reviewsAndMovies = [];

    for (let i = 0; i < reviews.length; i++) {
        let review = reviews[i];
        let movieId = review.movieId;
        const movie = await db.Movie.findByPk(movieId);
        reviewsAndMovies.push([review, movie]);
    }

    res.render('review-list', { title: "My Reviews", reviewsAndMovies })
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

router.post('/add', csrfProtection, reviewValidators, asyncHandler(async (req, res) => {
    // const id = req.session.auth.userId;
    // console.log(id);

    const { content, rating, userId, movieId } = req.body;

    const review = db.Review.build({ content, rating, userId, movieId });

    const movie = await db.Movie.findByPk(movieId);
    const collections = await db.Collection.findAll({ where: { userId } });


    const validatorErrors = validationResult(req);


    const errors = validatorErrors.array().map(error => error.msg);

    if (!errors.length) { //there is NO length in the errors arary meaning it's good
        await review.save(); //then we want to save the collection
        res.redirect('/reviews'); // then redirect the page
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
    const collectionId = req.params.id
    const collection = await db.Collection.findByPk(collectionId)
    await collection.destroy();

    res.json({ message: 'Success' })
});






module.exports = router
