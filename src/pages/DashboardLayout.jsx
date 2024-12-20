import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const DashboardLayout = () => {
  const navigate = useNavigate(); // React Router's navigation hook

  // Fetch user information from localStorage
  const userRole = localStorage.getItem('userRole'); // e.g., "RESIDENT", "ADMINISTRATOR"
  const firstName = localStorage.getItem('firstName'); // e.g., "Dheynoshan"
  const lastName = localStorage.getItem('lastName'); // e.g., "Nadarajah"

  // Logout functionality
  const handleLogout = () => {
    // Clear all user data from localStorage
    localStorage.clear();
    // Redirect to the login page
    navigate('/');
  };

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'row',
      height: '100vh',
      margin: 0,
    },
    sidebar: {
      width: '250px',
      backgroundColor: '#333',
      color: '#fff',
      padding: '1rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between', // Space between links and user info
    },
    navLinks: {
      display: 'flex',
      flexDirection: 'column', // Stack the menu items vertically
      gap: '1rem', // Add spacing between items
    },
    mainContent: {
      flex: 1,
      backgroundColor: '#f9f9f9',
      padding: '1rem',
    },
    link: {
      color: '#fff',
      textDecoration: 'none',
      fontSize: '1rem',
      padding: '0.5rem 0',
      borderBottom: '1px solid #444',
    },
    userInfo: {
      marginTop: '1rem',
      borderTop: '1px solid #444',
      paddingTop: '1rem',
      fontSize: '0.9rem',
      color: '#ccc',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
    },
    logoutButton: {
      padding: '0.5rem',
      backgroundColor: '#e74c3c', // Red button
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      fontSize: '0.9rem',
      cursor: 'pointer',
      textAlign: 'center',
    },
  };

  return (
    <div style={styles.container}>
      <nav style={styles.sidebar}>
        <div style={styles.navLinks}>
          <Link to="/dashboard" style={styles.link}>
            Dashboard Summary
          </Link>

          {/* Conditionally render "Create User" link */}
          {userRole !== 'RESIDENT' && (
            <Link to="/dashboard/createUser" style={styles.link}>
              Create User
            </Link>
          )}

          <Link to="/dashboard/createTicket" style={styles.link}>
            Create Ticket
          </Link>
          <Link to="/dashboard/tickets" style={styles.link}>
            See All Tickets
          </Link>
        </div>

        {/* Display logged-in user's name and logout button */}
        <div style={styles.userInfo}>
          <div>
            Logged in as: <strong>{firstName} {lastName}</strong>
          </div>
          <button style={styles.logoutButton} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      <div style={styles.mainContent}>
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
