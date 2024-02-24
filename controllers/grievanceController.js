const Grievance = require('../models/grievance');

const createGrievance = async (req, res) => {
  try {
    const { issue } = req.body;
    const grievance = new Grievance({ issue });
    await grievance.save();
    res.status(201).json(grievance);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create grievance', error: error.message });
  }
};

const getAllGrievances = async (req, res) => {
  try {
    const grievances = await Grievance.find();
    res.json(grievances);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get grievances', error: error.message });
  }
};

const updateGrievanceStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const grievance = await Grievance.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!grievance) {
      return res.status(404).json({ message: 'Grievance not found' });
    }
    res.json(grievance);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update grievance status', error: error.message });
  }
};

module.exports = { createGrievance, getAllGrievances, updateGrievanceStatus };
