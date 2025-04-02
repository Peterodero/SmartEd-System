import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Dashboard.css';

const Dashboard = ({ user }) => {
  const [notifications, setNotifications] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const notificationsResponse = await fetch('/api/notifications');
        const eventsResponse = await fetch('/api/events');

        if (!notificationsResponse.ok || !eventsResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const notificationsData = await notificationsResponse.json();
        const eventsData = await eventsResponse.json();

        setNotifications(notificationsData);
        setUpcomingEvents(eventsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
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
        <h2><b>Quick Actions</b></h2>
        <div className="action-buttons">
          <Link
            to="results" // Relative path
            className={`action-button ${location.pathname === '/parent/results' ? 'active' : ''}`}
          >
            View Results
          </Link>
          <Link
            to="talks" // Relative path
            className={`action-button ${location.pathname === '/parent/talks' ? 'active' : ''}`}
          >
            Message Teachers
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;