import React, { useEffect, useState } from 'react';
import axios from '../services/axios';

const Drives = () => {
  const [drives, setDrives] = useState([]);
  const [vaccineName, setVaccineName] = useState('');
  const [driveDate, setDriveDate] = useState('');
  const [availableDoses, setAvailableDoses] = useState('');

  const [editingId, setEditingId] = useState(null);
  const [editDate, setEditDate] = useState('');
  const [editDoses, setEditDoses] = useState('');

  const fetchDrives = async () => {
    try {
      const res = await axios.get('/drives');
      setDrives(res.data);
    } catch (error) {
      console.error('Error fetching drives:', error);
    }
  };
  
  useEffect(() => {
    fetchDrives();
  }, []);

  const handleAddDrive = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/drives', {
        vaccineName,
        driveDate: new Date(driveDate),
        availableDoses: parseInt(availableDoses),
      });
      setVaccineName('');
      setDriveDate('');
      setAvailableDoses('');
      fetchDrives();
    } catch (error) {
      console.error('Error adding drive:', error);
    }
  };

const handleSaveEdit = async (id) => {
  try {
    await axios.put(`/drives/${id}`, {
      driveDate: editDate,
      availableDoses: editDoses,
    });
    setEditingId(null);
    fetchDrives();
  } catch (error) {
    console.error('Error updating drive:', error);
  }
};
  
  useEffect(() => {
    fetchDrives();
  }, []);

  return (
    <div
    style={{
      backgroundImage: `url(${process.env.PUBLIC_URL}/images/VacDrive.webp)`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
    }}
  >
    <div style={{ padding: '20px' }}>
      <h2>Vaccination Drives</h2>

      {/* Add New Drive Form */}
      <form onSubmit={handleAddDrive} style={{ marginBottom: '30px' }}>
        <input
          type="text"
          placeholder="Vaccine Name"
          value={vaccineName}
          onChange={(e) => setVaccineName(e.target.value)}
          required
          style={{ marginRight: '10px' }}
        />
        <input
          type="date"
          value={driveDate}
          onChange={(e) => setDriveDate(e.target.value)}
          required
          style={{ marginRight: '10px' }}
        />
        <input
          type="number"
          placeholder="Available Doses"
          value={availableDoses}
          onChange={(e) => setAvailableDoses(e.target.value)}
          required
          style={{ marginRight: '10px' }}
        />
        <button type="submit">Add Drive</button>
      </form>

      {/* Drive List */}
      {drives.length === 0 ? (
        <p>No upcoming drives.</p>
      ) : (
        <ul>
          {drives.map((drive) => {
            const isCompleted = new Date(drive.driveDate) < new Date();
            const isEditing = editingId === drive._id;

            return (
              <li key={drive._id} style={{ marginBottom: '10px' }}>
                <strong>{drive.vaccineName}</strong> -{' '}
                {isEditing ? (
                  <>
                    <input
                      type="date"
                      value={editDate}
                      onChange={(e) => setEditDate(e.target.value)}
                    />
                    <input
                      type="number"
                      value={editDoses}
                      onChange={(e) => setEditDoses(e.target.value)}
                      style={{ marginLeft: '10px' }}
                    />
                    <button onClick={() => handleSaveEdit(drive._id)} style={{ marginLeft: '10px' }}>
                      Save
                    </button>
                    <button onClick={() => setEditingId(null)} style={{ marginLeft: '5px' }}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    {drive.driveDate ? new Date(drive.driveDate).toLocaleDateString() : 'Invalid or Missing Date'} - Doses: {drive.availableDoses}
                    {!isCompleted && (
                      <button
                        onClick={() => {
                          setEditingId(drive._id);
                          setEditDate(drive.driveDate?.substring(0, 10));
                          setEditDoses(drive.availableDoses);
                        }}
                        style={{ marginLeft: '10px' }}
                      >
                        Edit
                      </button>
                    )}
                  </>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
    </div>
);
};

export default Drives;