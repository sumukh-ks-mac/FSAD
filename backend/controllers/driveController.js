const Drive = require('../models/Drive');

const createDrive = async (req, res) => {
  try {
    const { vaccineName, driveDate, availableDoses, applicableClasses } = req.body;

    const newDrive = new Drive({
      vaccineName,
      driveDate,
      availableDoses,
      applicableClasses,
    });

    await newDrive.save();
    res.status(201).json(newDrive);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create drive', error: error.message });
  }
};

module.exports = { createDrive };
