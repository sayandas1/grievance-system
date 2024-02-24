const express = require('express');
const router = express.Router();
const { login, register } = require('../controllers/authController');

// GET login form
router.get('/login', (req, res) => {
  res.render('login');
});

// POST login form
router.post('/login', login);

// GET register form
router.get('/register', (req, res) => {
  res.render('register');
});

// POST register form
router.post('/register', register);

module.exports = router;
