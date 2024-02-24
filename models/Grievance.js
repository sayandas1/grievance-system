const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const grievanceSchema = new Schema({
  issue: { type: String, required: true },
  status: { type: String, enum: ['open', 'in-progress', 'resolved'], default: 'open' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Grievance', grievanceSchema);
