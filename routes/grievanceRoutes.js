const express = require('express');
const router = express.Router();
const { createGrievance, getAllGrievances, updateGrievanceStatus } = require('../controllers/grievanceController');

// POST /grievances - Create a new grievance
router.post('/', createGrievance);

// GET /grievances - Get all grievances
router.get('/', getAllGrievances);

// PATCH /grievances/:id - Update grievance status
router.patch('/:id', updateGrievanceStatus);

module.exports = router;
