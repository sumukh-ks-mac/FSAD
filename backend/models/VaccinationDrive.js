const mongoose = require('mongoose');

const driveSchema = new mongoose.Schema({
  vaccineName: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  availableDoses: {
    type: Number,
    required: true
  },
  applicableClasses: [
    {
      type: String
    }
  ]
}, { timestamps: true });

const VaccinationDrive = mongoose.model('VaccinationDrive', driveSchema);

module.exports = VaccinationDrive;
