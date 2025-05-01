const Student = require('../models/Student');

const getStudentStats = async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments();
    const vaccinatedStudents = await Student.countDocuments({ isVaccinated: true });
    
    const percentage = totalStudents === 0 ? 0 : (vaccinatedStudents / totalStudents) * 100;
    
    res.json({
      totalStudents,
      vaccinatedStudents,
      percentage: percentage.toFixed(2)
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getStudentStats };
