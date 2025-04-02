import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = ({ onLogout, userName }) => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1><strong>Parent Dashboard</strong></h1>
      </div>
      <div className="navbar-menu">
        <Link
          to="dashboard"
          className={`navbar-item ${location.pathname === '/parent/dashboard' || location.pathname === '/parent' ? 'active' : ''}`}
        >
          Dashboard
        </Link>
        <Link
          to="results"
          className={`navbar-item ${location.pathname === '/parent/results' ? 'active' : ''}`}
        >
          Results
        </Link>
        <Link
          to="talks"
          className={`navbar-item ${location.pathname === '/parent/talks' ? 'active' : ''}`}
        >
          Messages
        </Link>
        {}
      </div>
      <div className="navbar-end">
        <span className="user-name">Welcome, {userName}</span>
        <button onClick={onLogout} className="logout-button">Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;