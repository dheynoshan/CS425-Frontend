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
        const counts = data.reduce(
          (acc, ticket) => {
            acc[ticket.ticketStatus] = (acc[ticket.ticketStatus] || 0) + 1;
            return acc;
          },
          { OPEN: 0, IN_PROGRESS: 0, COMPLETED: 0, REJECTED: 0, CLOSED: 0 }
        );
        setTicketCounts(counts);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };

    fetchTickets();
  }, []);

  return (
    <div className="max-w-5xl bg-white rounded-lg shadow-lg p-8 mx-auto">
      <h2 className="text-2xl font-bold text-secondary text-center mb-8">Dashboard</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
        <TicketSummary title="Open Tickets" count={ticketCounts.OPEN} />
        <TicketSummary title="In Progress" count={ticketCounts.IN_PROGRESS} />
        <TicketSummary title="Completed" count={ticketCounts.COMPLETED} />
        <TicketSummary title="Rejected" count={ticketCounts.REJECTED} />
        <TicketSummary title="Closed" count={ticketCounts.CLOSED} />
      </div>
    </div>
  );
};

export default Dashboard;
