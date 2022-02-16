const express = require('express');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');

const db = require('../db/models');
const { csrfProtection, asyncHandler } = require('./utils');

const router = express.Router();
const { loginUser, logoutUser } = require('../auth');

router.get('/register', csrfProtection, (req, res) => {
  const user = db.User.build();
  res.render('user-register', {
    title: 'Register',
    user,
    csrfToken: req.csrfToken(),
    errors: {},
  });
});

const userValidators = [
  check('username')
    .custom((value) => {
      return db.User.findOne({ where: { username: value } })
        .then((user) => {
          if (user) {
            return Promise.reject('The provided Username is already in use by another account');
          }
        });
    })
    .isLength({ max: 20 })
    .withMessage('First Name must not be more than 20 characters long')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Username'),
  check('email')
    .custom((value) => {
      return db.User.findOne({ where: { email: value } })
        .then((user) => {
          if (user) {
            return Promise.reject('The provided Email Address is already in use by another account');
          }
        });
    })
    .isEmail()
    .withMessage('Email Address is not a valid email')
    .isLength({ max: 255 })
    .withMessage('Email Address must not be more than 255 characters long')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Email Address'),
  check('password')
  .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, 'g')
  .withMessage('Password must contain at least 1 lowercase letter, uppercase letter, number, and special character (i.e. "!@#$%^&*")')
  .isLength({ max: 50 })
  .withMessage('Password must not be more than 50 characters long')
  .exists({ checkFalsy: true })
  .withMessage('Please provide a value for Password'),
  check('confirmPassword')
  .custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Confirm Password does not match Password');
    }
    return true;
  })
  .isLength({ max: 50 })
  .withMessage('Confirm Password must not be more than 50 characters long')
  .exists({ checkFalsy: true })
  .withMessage('Please provide a value for Confirm Password')
];

router.post('/register', csrfProtection, userValidators,
  asyncHandler(async (req, res) => {
    const {
      username,
      email,
      password,
    } = req.body;

    const user = db.User.build({
      username,
      email,
    });

    const validatorErrors = validationResult(req); //validation result take in req and runs it thru middleware. validator errors is an obj

    if (validatorErrors.isEmpty()) { //if no errors
      const hashedPassword = await bcrypt.hash(password, 10);
      user.hashedPassword = hashedPassword;
      await user.save();
      loginUser(req, res, user);
      res.redirect('/');
    } else {
      // const errors = validatorErrors.array().map((error) => error.msg); //gives an array of all the error messages
      const errors = {};
      validatorErrors.array().forEach(err => { //validatorerrors.array() turns it into an array
        errors[err.param] = err.msg //taking errors obj and adding key of err.param to it with value of err.message. err.param = name of the check that it is currently going thru
      })

      res.render('user-register', {
        title: 'Register',
        user,
        errors,
        csrfToken: req.csrfToken(),
      });
    }
  }));

  router.get('/login', csrfProtection, (req, res) => {
    res.render('user-login', {
      title: 'Login',
      csrfToken: req.csrfToken(),
    });
  });

  const loginValidators = [
    check('email')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a value for Email Address'),
    check('password')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a value for Password'),
  ];

  router.post('/login', csrfProtection, loginValidators,
    asyncHandler(async (req, res) => {
      const {
        email,
        password,
      } = req.body;

      let errors = [];
      const validatorErrors = validationResult(req);

      if (validatorErrors.isEmpty()) {
        // TODO Attempt to login the user.
        const user = await db.User.findOne({ where: { email } });

        if (user !== null) {
          const passwordMatch = await bcrypt.compare(password, user.hashedPassword.toString());
          if(passwordMatch) {
          loginUser(req, res, user);
          return res.redirect('/');
          }
        }
        errors.push('Login failed for the provided email address and password');

      } else {
        errors = validatorErrors.array().map((error) => error.msg);
      }

      res.render('user-login', {
        title: 'Login',
        email,
        errors,
        csrfToken: req.csrfToken(),
      });
    }));

    router.post('/logout', (req, res) => {
      logoutUser(req, res);
      res.redirect('/user/login');
    });

module.exports = router;
