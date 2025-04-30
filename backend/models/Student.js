const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  className: {
    type: String,
    required: true
  },
  studentId: {
    type: String,
    required: true,
    unique: true
  },
  isVaccinated: {
    type: Boolean,
    default: false
  },
  vaccineName: {         
    type: String,
  },
  dateOfVaccination: {   
    type: Date,
  }
}, { timestamps: true });

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
