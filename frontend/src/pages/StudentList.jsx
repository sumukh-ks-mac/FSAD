import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({ name: '', className: '', studentId: '', isVaccinated: false ,vaccineName: '', dateOfVaccination: ''});

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/students');
      setStudents(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setNewStudent({ ...newStudent, [e.target.name]: e.target.value });
  };

  const addStudent = async () => {
    try {
      await axios.post('http://localhost:8000/api/students', newStudent);
      setNewStudent({ name: '', className: '', studentId: '', isVaccinated: false });
      fetchStudents();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteStudent = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/students/${id}`);
      fetchStudents();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Student Management</h2>

      <div className="mb-6">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newStudent.name}
          onChange={handleChange}
          className="border p-2 m-2"
        />
        <input
          type="text"
          name="className"
          placeholder="Class Name"
          value={newStudent.className}
          onChange={handleChange}
          className="border p-2 m-2"
        />
        <input
          type="text"
          name="studentId"
          placeholder="Student ID"
          value={newStudent.studentId}
          onChange={handleChange}
          className="border p-2 m-2"
        />
        <input 
          type="text" 
          name="vaccineName" 
          placeholder="Vaccine Name (optional)" 
          value={newStudent.vaccineName} 
          onChange={handleChange} 
        />

        <input 
          type="date" 
          name="dateOfVaccination" 
          placeholder="Date of Vaccination (optional)" 
          value={newStudent.dateOfVaccination} 
          onChange={handleChange} 
        />
        <button onClick={addStudent} className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Student
        </button>
      </div>

      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Class</th>
            <th className="py-2 px-4 border-b">Student ID</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((stu) => (
            <tr key={stu._id}>
              <td className="py-2 px-4 border-b">{stu.name}</td>
              <td className="py-2 px-4 border-b">{stu.className}</td>
              <td className="py-2 px-4 border-b">{stu.studentId}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => deleteStudent(stu._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;