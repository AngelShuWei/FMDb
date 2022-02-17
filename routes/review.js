const express = require('express');

const { check, validationResult } = require('express-validator');

const db = require('../db/models');
const { csrfProtection, asyncHandler } = require('./utils');

const router = express.Router();


router.get('/', csrfProtection, asyncHandler( async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const userId = req.session.auth.userId;
    const reviews = await db.Review.findAll({ where: { userId } });

    res.render('review-list', { reviews })
}));






module.exports = router
