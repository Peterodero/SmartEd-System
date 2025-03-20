import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Dashboard.css';

const Dashboard = ({ user }) => {
  const [notifications, setNotifications] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true before fetching

      try {
        // Simulate API fetch (will replace with our actual API calls)
        const notificationsResponse = await fetch('/api/notifications'); // will Replace with our API endpoint
        const eventsResponse = await fetch('/api/events'); // will Replace with our API endpoint

        if (!notificationsResponse.ok || !eventsResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const notificationsData = await notificationsResponse.json();
        const eventsData = await eventsResponse.json();

        setNotifications(notificationsData);
        setUpcomingEvents(eventsData);
      } catch (error) {
        console.error('Error fetching data:', error);
        
        // Handle error (e.g., show an error message)
      } finally {
        setLoading(false); // Set loading to false after fetching (or error)
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Render loading indicator
  }

  return (
    <div className="dashboard-container">
      <h1>Welcome to the Parent Dashboard!!</h1>

      <div className="student-info">
        <h2>Student Information</h2>
        <div className="info-card">
          <p><strong>Student Name:</strong> {user?.studentName}</p>
          <p><strong>Student Reg:</strong> {user?.studentReg}</p>
          <p><strong>Grade/Class:</strong> {user?.studentGrade}</p>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h2>Recent Notifications</h2>
          <ul className="notification-list">
            {notifications.map((notification) => (
              <li key={notification.id} className="notification-item">
                <div className="notification-content">
                  <span className="notification-title">{notification.title}</span>
                  <span className="notification-date">{notification.date}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="dashboard-card">
          <h2>Upcoming Events</h2>
          <ul className="event-list">
            {upcomingEvents.map((event) => (
              <li key={event.id} className="event-item">
                <div className="event-content">
                  <span className="event-title">{event.title}</span>
                  <span className="event-date">{event.date}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="action-buttons">
          <Link to="/results" className="action-button">
            View Results
          </Link>
          <Link to="/messages" className="action-button">
            Message Teachers
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;