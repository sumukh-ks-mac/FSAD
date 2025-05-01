import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
const Layout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div>
      {/* Navigation Bar */}
      <nav style={{ backgroundColor: '#333', padding: '10px' }}>
        <ul style={{ listStyleType: 'none', display: 'flex', justifyContent: 'space-around' }}>
          <li><Link to="/dashboard" style={{ color: 'white', textDecoration: 'none' }}>Dashboard</Link></li>
          <li><Link to="/students" style={{ color: 'white', textDecoration: 'none' }}>Students</Link></li>
          <li><Link to="/drives" style={{ color: 'white', textDecoration: 'none' }}>Drives</Link></li>
          <li><Link to="/reports" style={{ color: 'white', textDecoration: 'none' }}>Reports</Link></li>
          <li><Link to="/students" className="p-2 hover:bg-gray-200 rounded" style={{color: 'white', textDecoration: 'none'}}>Manage Students</Link></li>

          <li>
            <button
              onClick={handleLogout}
              style={{
                backgroundColor: 'red',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                cursor: 'pointer'
              }}
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>

      {/* Content Area */}
      <div style={{ padding: '20px' }}>
        {/* This will render the child routes (Dashboard, Students, etc.) */}
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
