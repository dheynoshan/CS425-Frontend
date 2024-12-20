import React, { useState } from "react";

const TicketForm = ({ onSubmit }) => {
  const [ticket, setTicket] = useState({
    apartmentNumber: "",
    title: "",
    description: "",
    priority: "LOW",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTicket({ ...ticket, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const ticketData = {
      ...ticket,
      createdAt,
      updatedAt,
    };

    onSubmit(ticketData);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Create Ticket</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        {/* Apartment Number */}
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Apartment Number:</label>
          <input
            type="text"
            name="apartmentNumber"
            value={ticket.apartmentNumber}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        {/* Title */}
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Title:</label>
          <input
            type="text"
            name="title"
            value={ticket.title}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        {/* Description */}
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Description:</label>
          <textarea
            name="description"
            value={ticket.description}
            onChange={handleChange}
            required
            style={styles.textarea}
          />
        </div>

        {/* Priority */}
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Priority:</label>
          <select
            name="priority"
            value={ticket.priority}
            onChange={handleChange}
            style={styles.select}
          >
            <option value="LOW">LOW</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="HIGH">HIGH</option>
            <option value="URGENT">URGENT</option>
          </select>
        </div>

        {/* Submit Button */}
        <button type="submit" style={styles.submitButton}>
          Create Ticket
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    width: "100%",
    maxWidth: "600px",
    margin: "2rem auto",
    padding: "2rem",
    backgroundColor: "#fff", // Light background
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    fontFamily: "'Arial', sans-serif",
  },
  title: {
    textAlign: "center",
    color: "#333", // Dark text
    fontSize: "1.5rem",
    marginBottom: "1.5rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
  },
  fieldGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  label: {
    fontSize: "1rem",
    fontWeight: "bold",
    color: "#555",
  },
  input: {
    padding: "0.75rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "1rem",
    color: "#333",
    backgroundColor: "#f9f9f9",
  },
  textarea: {
    padding: "0.75rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "1rem",
    color: "#333",
    backgroundColor: "#f9f9f9",
    minHeight: "100px",
  },
  select: {
    padding: "0.75rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "1rem",
    color: "#333",
    backgroundColor: "#f9f9f9",
  },
  submitButton: {
    padding: "0.75rem",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    fontSize: "1rem",
    fontWeight: "bold",
    cursor: "pointer",
    textAlign: "center",
    transition: "background-color 0.3s",
  },
  submitButtonHover: {
    backgroundColor: "#0056b3",
  },
};

export default TicketForm;
