import React from "react";

const TicketSummary = ({ title, count }) => {
  return (
    <div style={summaryStyles.container}>
      <h3 style={summaryStyles.title}>{title}</h3>
      <p style={summaryStyles.count}>{count}</p>
    </div>
  );
};

const summaryStyles = {
  container: {
    padding: "1rem",
    borderRadius: "8px",
    backgroundColor: "#ffffff", // White background for the summary card
    boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    minWidth: "120px",
  },
  title: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#34495e", // Dark grayish-blue for titles
    marginBottom: "0.5rem",
  },
  count: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#e74c3c", // Red for emphasis
  },
};

export default TicketSummary;
