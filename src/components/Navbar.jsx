import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav style={styles.navbar}>
    <div style={styles.container}>
      <h1 style={styles.title}>Ticketing System</h1>
      <ul style={styles.navList}>
        <li><Link to="/dashBoard" style={styles.link}>Dashboard</Link></li>
        <li><Link to="/tickets" style={styles.link}>Tickets</Link></li>
        <li><Link to="/createTicket" style={styles.link}>Create Ticket</Link></li>
        <li><Link to="/createUser" style={styles.link}>Create User</Link></li>
        <li><Link to="/" style={styles.link}>Login</Link></li>
      </ul>
    </div>
  </nav>
);

const styles = {
  navbar: {
    position: "fixed",
    top: 0,
    width: "100%",
    background: "#333",
    color: "#fff",
    zIndex: 1000,
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0.5rem 1rem",
  },
  title: {
    fontSize: "1.5rem",
    margin: 0,
  },
  navList: {
    listStyle: "none",
    display: "flex",
    gap: "1.5rem",
    margin: 0,
    padding: 0,
  },
  link: {
    textDecoration: "none",
    color: "#fff",
    fontSize: "1rem",
    transition: "color 0.3s",
  },
  linkHover: {
    color: "#00bcd4",
  },
};

export default Navbar;
