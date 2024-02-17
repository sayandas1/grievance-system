const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const roleMiddleware = require('../middleware/role');
const Grievance = require('../models/Grievance');

router.use(authMiddleware);

router.post('/', async (req, res) => {
  const { issue } = req.body;
  const grievance = new Grievance({ user: req.user._id, issue });
  await grievance.save();
  res.status(201).send(grievance);
});

router.get('/', roleMiddleware(['hr']), async (req, res) => {
  const grievances = await Grievance.find();
  res.send(grievances);
});

router.patch('/:id', roleMiddleware(['hr']), async (req, res) => {
  const { status } = req.body;
  const grievance = await Grievance.findByIdAndUpdate(req.params.id, { status }, { new: true });
  res.send(grievance);
});

module.exports = router;
