const express = require('express');
const router = express.Router();
const { sendMessage, getGrievanceChatMessages } = require('../controllers/chatController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/:grievanceId', authMiddleware, sendMessage);
router.get('/:grievanceId', authMiddleware, getGrievanceChatMessages);

module.exports = router;
