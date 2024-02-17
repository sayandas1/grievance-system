const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const Message = require('../models/Message');

router.use(authMiddleware);

router.post('/:grievanceId', async (req, res) => {
  const { message } = req.body;
  const newMessage = new Message({ grievance: req.params.grievanceId, sender: req.user._id, message });
  await newMessage.save();
  res.status(201).send(newMessage);
});

router.get('/:grievanceId', async (req, res) => {
  const messages = await Message.find({ grievance: req.params.grievanceId });
  res.send(messages);
});

module.exports = router;
