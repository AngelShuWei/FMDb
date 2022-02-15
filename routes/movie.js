const express = require('express');
const db = require('../db/models');
const { csrfProtection, asyncHandler } = require('./utils');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const movies = await db.Movie.findAll({ order: [['name', 'ASC']] });
    res.render('movie-list', { title: 'Movies', movies });
  } catch (err) {
    next(err);
  }
});




module.exports = router;
