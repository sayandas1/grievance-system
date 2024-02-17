const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { validateRegister, validateLogin } = require('../utils/validation');
const { jwtSecret } = require('../config');

router.post('/register', async (req, res) => {
  // Validate the request body
  const { error } = validateRegister(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check if the email is already registered
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('Email already exists');

  // Create a new user
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  user = new User({
    email: req.body.email,
    password: hashedPassword,
    role: req.body.role || 'employee',
  });
  await user.save();

  res.status(201).send('User registered successfully');
});

router.post('/login', async (req, res) => {
  // Validate the request body
  const { error } = validateLogin(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check if the email exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Invalid email or password');

  // Check if the password is correct
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Invalid email or password');

  // Create and send JWT token
  const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '1h' });
  res.send({ token });
});

module.exports = router;
