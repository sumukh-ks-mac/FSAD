const mongoose = require('mongoose');

const driveSchema = new mongoose.Schema({
  vaccineName: { type: String, required: true },
  driveDate: { type: Date, required: true }, // ✅ this is critical
  availableDoses: { type: Number, required: true }
});

module.exports = mongoose.model('Drive', driveSchema);
