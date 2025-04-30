import { useEffect, useState } from 'react';
import axios from 'axios';

function DashboardPage() {
  const [stats, setStats] = useState({
    totalStudents: 0,
    vaccinatedStudents: 0,
    percentage: 0
  });
  const [drives, setDrives] = useState([]);

  useEffect(() => {
    fetchStats();
    fetchUpcomingDrives();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/students/stats');
      setStats(response.data);
    } catch (error) {
      console.error('Failed to fetch student stats:', error);
    }
  };

  // const fetchUpcomingDrives = async () => {
  //   try {
  //     const res = await axios.get('/drives/upcoming'); // Fetch upcoming drives only
  //     setDrives(res.data); // Set the state with the upcoming drives
  //   } catch (error) {
  //     console.error('Error fetching upcoming drives:', error);
  //   }
  // };
  
  // useEffect(() => {
  //   fetchUpcomingDrives();
  // }, []);
  

  const fetchUpcomingDrives = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/drives/upcoming');
      console.log('Upcoming drives:', response.data);
      setDrives(response.data);
    } catch (error) {
      console.error('Failed to fetch drives:', error);
    }
  };
  

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      {/* Student Statistics */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Total Students</h2>
          <p>{stats.totalStudents}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Vaccinated Students</h2>
          <p>{stats.vaccinatedStudents}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Vaccination Percentage</h2>
          <p>{stats.percentage}%</p>
        </div>
      </div>

      {/* Upcoming Drives */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Upcoming Vaccination Drives</h2>
        {drives.length === 0 ? (
          <p>No upcoming drives.</p>
        ) : (
          <ul className="list-disc list-inside">
            {drives.map((drive) => (
              <li key={drive._id}>
                {drive.vaccineName} - {new Date(drive.driveDate).toLocaleDateString()}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default DashboardPage;
