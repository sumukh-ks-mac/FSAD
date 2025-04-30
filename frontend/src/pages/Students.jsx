// src/pages/StudentPage.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';

function StudentPage() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [className, setClassName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [isVaccinated, setIsVaccinated] = useState(false);
  const [vaccineName, setVaccineName] = useState('');
  const [dateOfVaccination, setDateOfVaccination] = useState('');

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/students');
      setStudents(response.data);
    } catch (error) {
      console.error('Failed to fetch students:', error);
    }
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/students', {
        name,
        className,
        studentId,
        isVaccinated,
        vaccineName,           
        dateOfVaccination,     
      });
      setName('');
      setClassName('');
      setStudentId('');
      setIsVaccinated(false);
      setVaccineName('');        
      setDateOfVaccination('');  
      fetchStudents(); // refresh list
    } catch (error) {
      console.error('Failed to add student:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Student Management</h1>

      {/* Add Student Form */}
      <form onSubmit={handleAddStudent} className="mb-6">
        <input
          className="border p-2 mr-2"
          placeholder="Student Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="border p-2 mr-2"
          placeholder="Class Name"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
        />
        <input
          className="border p-2 mr-2"
          placeholder="Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Vaccine Name"
          value={vaccineName}
          onChange={(e) => setVaccineName(e.target.value)}
        />

        <input
          type="date"
          placeholder="Date of Vaccination"
          value={dateOfVaccination}
          onChange={(e) => setDateOfVaccination(e.target.value)}
        />

        <label className="mr-2">
          <input
            type="checkbox"
            checked={isVaccinated}
            onChange={(e) => setIsVaccinated(e.target.checked)}
            className="mr-1"
          />
          Vaccinated
        </label>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Add Student
        </button>
      </form>

      {/* Student List */}
      <h2 className="text-xl font-semibold mb-2">Student List</h2>
      <table className="table-auto w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Class</th>
            <th className="px-4 py-2">Student ID</th>
            <th className="px-4 py-2">Vaccinated</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td className="border px-4 py-2">{student.name}</td>
              <td className="border px-4 py-2">{student.className}</td>
              <td className="border px-4 py-2">{student.studentId}</td>
              <td className="border px-4 py-2">{student.isVaccinated ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentPage;