import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CSVLink } from 'react-csv'; // For CSV export

const ReportPage = () => {
  const [students, setStudents] = useState([]);
  const [filterVaccine, setFilterVaccine] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 5; // ✅ Show 5 students per page

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const { data } = await axios.get('http://localhost:8000/api/students');
    setStudents(data);
  };

  const handleFilterChange = (e) => {
    setFilterVaccine(e.target.value);
    setCurrentPage(1); // Reset to page 1 on filter change
  };

  // Filter students by vaccine name
  const filteredStudents = students.filter(student =>
    filterVaccine ? (student.vaccineName || '').toLowerCase().includes(filterVaccine.toLowerCase()) : true
  );

  // Pagination
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Vaccination Report</h2>

      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Filter by Vaccine Name"
          value={filterVaccine}
          onChange={handleFilterChange}
          className="border p-2 rounded mr-4"
        />
        <CSVLink data={students} filename="vaccination_report.csv" className="bg-green-500 text-white px-4 py-2 rounded">
          Download CSV
        </CSVLink>
      </div>

      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Class</th>
            <th className="border p-2">Vaccinated</th>
            <th className="border p-2">Date of Vaccination</th>
            <th className="border p-2">Vaccine Name</th>
          </tr>
        </thead>
        <tbody>
          {currentStudents.map(student => (
            <tr key={student._id}>
              <td className="border p-2">{student.name}</td>
              <td className="border p-2">{student.className}</td>
              <td className="border p-2">{student.isVaccinated ? 'Yes' : 'No'}</td>
              <td className="border p-2">{student.dateOfVaccination ? new Date(student.dateOfVaccination).toLocaleDateString() : '-'}</td>
              <td className="border p-2">{student.vaccineName || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center mt-4">
        {[...Array(Math.ceil(filteredStudents.length / studentsPerPage)).keys()].map(number => (
          <button
            key={number}
            onClick={() => paginate(number + 1)}
            className="mx-1 px-3 py-1 border rounded bg-gray-200"
          >
            {number + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ReportPage;