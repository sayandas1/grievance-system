const Message = require('../models/chatMessage');

const sendMessage = async (req, res) => {
  const { grievanceId } = req.params;
  const { message } = req.body;
  const newMessage = new Message({ grievance: grievanceId, sender: req.user._id, message });
  await newMessage.save();
  res.status(201).json(newMessage);
};

const getGrievanceChatMessages = async (req, res) => {
  const { grievanceId } = req.params;
  const messages = await Message.find({ grievance: grievanceId });
  res.json(messages);
};

module.exports = { sendMessage, getGrievanceChatMessages };
