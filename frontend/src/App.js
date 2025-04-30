import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import Layout from './Layout';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import Drives from './pages/Drives';
import Reports from './pages/Reports';
import Login from './pages/Login';
import ProtectedRoute from './ProtectedRoute';
import StudentList from './pages/StudentList';




const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Route */}
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/students" element={<Students />} />
              <Route path="/drives" element={<Drives />} />
              <Route path="reports" element={<Reports />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/studentlist" element={<ProtectedRoute><StudentList /></ProtectedRoute>} />
          </Route>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
