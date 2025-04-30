import React, { useState } from 'react';
import axios from 'axios';

const DriveForm = () => {
  const [vaccineName, setVaccineName] = useState('');
  const [driveDate, setDriveDate] = useState('');
  const [availableDoses, setAvailableDoses] = useState('');
  const [applicableClasses, setApplicableClasses] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/drives', {
        vaccineName,
        driveDate,
        availableDoses,
        applicableClasses: applicableClasses.split(',').map(c => c.trim()),
      });
      alert('Drive created successfully');
      setVaccineName('');
      setDriveDate('');
      setAvailableDoses('');
      setApplicableClasses('');
    } catch (err) {
      console.error('Error creating drive:', err);
      alert('Failed to create drive');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Book a Vaccination Drive</h2>
      <label>
        Vaccine Name:
        <input value={vaccineName} onChange={(e) => setVaccineName(e.target.value)} required />
      </label>
      <br />
      <label>
        Drive Date:
        <input type="date" value={driveDate} onChange={(e) => setDriveDate(e.target.value)} required />
      </label>
      <br />
      <label>
        Available Doses:
        <input type="number" value={availableDoses} onChange={(e) => setAvailableDoses(e.target.value)} required />
      </label>
      <br />
      <label>
        Applicable Classes (comma-separated):
        <input value={applicableClasses} onChange={(e) => setApplicableClasses(e.target.value)} required />
      </label>
      <br />
      <button type="submit">Create Drive</button>
    </form>
  );
};

export default DriveForm;