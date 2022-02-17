const express = require('express');

const { check, validationResult } = require('express-validator');

const db = require('../db/models');
const { csrfProtection, asyncHandler } = require('./utils');

const router = express.Router();

const logIntoReviewError = (req, res, next) => {
    const error = Error("Not Logged In");
    error.status = 404;
    const message = "Please log in or register to post a review :)";
    res.render('error', { error, message });
};


router.get('/', csrfProtection, asyncHandler( async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const userId = req.session.auth.userId;
    const reviews = await db.Review.findAll({ where: { userId } });

    res.render('review-list', { reviews })
}));

router.get('/add', csrfProtection, asyncHandler(async (req, res) => {
    if (req.session.auth) {
        const userId = req.session.auth.userId;
        const review = db.Review.build();
        res.render('review-form', {
            title: 'Add Review',
            review,
            userId,
            csrfToken: req.csrfToken(),
        });
    } else {
        next(logIntoReviewError(req, res, next));
    };
}));





module.exports = router
