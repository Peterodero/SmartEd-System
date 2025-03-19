import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = ({ onLogout, userName }) => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>Parent Dashboard</h1>
      </div>
      <div className="navbar-menu">
        <Link to="/dashboard" className="navbar-item">Dashboard</Link>
        <Link to="/results" className="navbar-item">Results</Link>
        <Link to="/messages" className="navbar-item">Messages</Link>
      </div>
      <div className="navbar-end">
        <span className="user-name">Welcome, {userName}</span>
        <button onClick={onLogout} className="logout-button">Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;