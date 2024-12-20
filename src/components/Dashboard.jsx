import React, { useEffect, useState } from "react";
import TicketSummary from "./TicketSummary";

const Dashboard = () => {
  const [ticketCounts, setTicketCounts] = useState({
    OPEN: 0,
    IN_PROGRESS: 0,
    COMPLETED: 0,
    REJECTED: 0,
    CLOSED: 0,
  });

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/v1/tickets");
        if (!response.ok) {
          throw new Error("Failed to fetch tickets");
        }
        const data = await response.json();

        // Calculate ticket counts based on their status
        const counts = data.reduce(
          (acc, ticket) => {
            acc[ticket.ticketStatus] = (acc[ticket.ticketStatus] || 0) + 1;
            return acc;
          },
          {
            OPEN: 0,
            IN_PROGRESS: 0,
            COMPLETED: 0,
            REJECTED: 0,
            CLOSED: 0,
          }
        );

        setTicketCounts(counts);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };

    fetchTickets();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Dashboard</h2>
      <div style={styles.summary}>
        <TicketSummary title="Open Tickets" count={ticketCounts.OPEN} />
        <TicketSummary title="In Progress" count={ticketCounts.IN_PROGRESS} />
        <TicketSummary title="Completed" count={ticketCounts.COMPLETED} />
        <TicketSummary title="Rejected" count={ticketCounts.REJECTED} />
        <TicketSummary title="Closed" count={ticketCounts.CLOSED} />
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%", // Ensures it takes full height of the parent
    padding: "2rem",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    width: "80%", // Restricts the width for a clean layout
    maxWidth: "800px",
    fontFamily: "'Arial', sans-serif",
  },
  header: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "1.5rem",
    textAlign: "center",
  },
  summary: {
    display: "flex",
    gap: "1.5rem",
    justifyContent: "center",
    flexWrap: "wrap", // Ensures responsiveness for smaller screens
  },
};



export default Dashboard;
