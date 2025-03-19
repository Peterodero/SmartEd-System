import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import StudentResults from './components/StudentResults';
import MessageTeacher from './components/Message';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleLogin = (userData) => {
    // In a real app, you would validate credentials with a backend
    setIsAuthenticated(true);
    setCurrentUser(userData);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  return (
    <Router>
      <div className="app">
        {isAuthenticated && <Navbar onLogout={handleLogout} userName={currentUser?.name} />}
        <Routes>
          <Route 
            path="/" 
            element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />} 
          />
          <Route 
            path="/dashboard" 
            element={isAuthenticated ? <Dashboard user={currentUser} /> : <Navigate to="/" />} 
          />
          <Route 
            path="/results" 
            element={isAuthenticated ? <StudentResults user={currentUser} /> : <Navigate to="/" />} 
          />
          <Route 
            path="/messages" 
            element={isAuthenticated ? <MessageTeacher user={currentUser} /> : <Navigate to="/" />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;