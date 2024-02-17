const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { jwtSecret } = require('../config');

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).send('Access Denied');

  try {
    const decoded = jwt.verify(token, jwtSecret);
    const user = await User.findById(decoded.userId);
    if (!user) return res.status(401).send('Invalid Token');
    req.user = user;
    next();
  } catch (err) {
    res.status(401).send('Invalid Token');
  }
};

module.exports = authMiddleware;
