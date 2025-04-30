const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// GET all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/stats', async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments();
    const vaccinatedStudents = await Student.countDocuments({ isVaccinated: true });
    const percentage = totalStudents > 0 ? ((vaccinatedStudents / totalStudents) * 100).toFixed(2) : "0.00";

    res.json({ totalStudents, vaccinatedStudents, percentage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// POST add new student
router.post('/', async (req, res) => {
  const { name, className, studentId, isVaccinated, vaccineName, dateOfVaccination } = req.body;
  try {
    const newStudent = new Student({ name, className, studentId, isVaccinated, vaccineName, dateOfVaccination, });
    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update student
router.put('/:id', async (req, res) => {
  const { name, className, studentId, isVaccinated } = req.body;
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      { name, className, studentId, isVaccinated },
      { new: true }
    );
    res.json(updatedStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE student
router.delete('/:id', async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: 'Student deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});



module.exports = router;
