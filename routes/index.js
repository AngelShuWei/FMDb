const express = require('express');
const db = require('../db/models');
const { csrfProtection, asyncHandler } = require('./utils');
const router = express.Router();

/* GET home page. */
router.get('/', asyncHandler(async (req, res, next) => {
  const movies = await db.Movie.findAll({ order: [['name', 'ASC']] });
  res.render('movie-list', { title: 'Movies', movies });
}));

module.exports = router;
