const express = require('express');
const router = express.Router();
const Drive = require('../models/Drive');

// Create a new drive
router.post('/', async (req, res) => {
  try {
    const { vaccineName, driveDate, availableDoses } = req.body;

    const drive = new Drive({
      vaccineName,
      driveDate: new Date(driveDate), // ✅ force correct type
      availableDoses: parseInt(availableDoses)
    });

    await drive.save();
    res.status(201).json(drive);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all drives (no date filter, shows all drives)
router.get('/', async (req, res) => {
  try {
    const drives = await Drive.find({});
    res.json(drives);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get upcoming drives (drives with date >= today and <= 30 days from now)
router.get('/upcoming', async (req, res) => {
  try {
    const today = new Date();
    const thirtyDaysLater = new Date();
    thirtyDaysLater.setDate(today.getDate() + 30); // 30 days from today

    // Find drives within the next 30 days
    const upcomingDrives = await Drive.find({
      driveDate: { $gte: today, $lte: thirtyDaysLater },
    }).sort({ driveDate: 1 });

    res.json(upcomingDrives);
  } catch (err) {
    console.error('Error fetching upcoming drives:', err);
    res.status(500).json({ message: err.message });
  }
});

// Update an existing drive
router.put('/:id', async (req, res) => {
  try {
    const { driveDate, availableDoses } = req.body;
    const drive = await Drive.findById(req.params.id);

    // Check if the drive has already passed (i.e., driveDate < today)
    if (new Date(drive.driveDate) < new Date()) {
      return res.status(400).json({ message: 'Cannot edit a completed drive.' });
    }

    // Update drive details
    drive.driveDate = new Date(driveDate);
    drive.availableDoses = parseInt(availableDoses);

    await drive.save();
    res.status(200).json(drive);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


module.exports = router;
