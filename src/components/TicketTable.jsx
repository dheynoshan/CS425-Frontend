import React, { useState, useEffect } from "react";

const TicketTable = () => {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ priority: "", status: "" });
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/tickets")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch tickets");
        }
        return response.json();
      })
      .then((data) => {
        setTickets(data);
        setFilteredTickets(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    let updatedTickets = tickets;

    if (filters.priority) {
      updatedTickets = updatedTickets.filter(
        (ticket) => ticket.priority === filters.priority
      );
    }

    if (filters.status) {
      updatedTickets = updatedTickets.filter(
        (ticket) => ticket.ticketStatus === filters.status
      );
    }

    setFilteredTickets(updatedTickets);
  }, [filters, tickets]);

  const handleEditClick = (ticket) => {
    setSelectedTicket(ticket);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setSelectedTicket(null);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Dummy API for demonstration
    fetch(`https://jsonplaceholder.typicode.com/posts/${selectedTicket.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(selectedTicket),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update ticket");
        }
        return response.json();
      })
      .then((updatedTicket) => {
        setTickets((prevTickets) =>
          prevTickets.map((ticket) =>
            ticket.id === updatedTicket.id ? updatedTicket : ticket
          )
        );
        setFilteredTickets((prevFiltered) =>
          prevFiltered.map((ticket) =>
            ticket.id === updatedTicket.id ? updatedTicket : ticket
          )
        );
        handleModalClose();
      })
      .catch((err) => alert(err.message));
  };

  if (loading) {
    return <p>Loading tickets...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div style={{ padding: "1rem" }}>
      <h2 style={styles.title}>Tickets</h2>

      <div style={styles.filters}>
        <label style={styles.label}>
          Priority:
          <select
            name="priority"
            value={filters.priority}
            onChange={handleFilterChange}
            style={styles.select}
          >
            <option value="">All</option>
            <option value="URGENT">URGENT</option>
            <option value="HIGH">HIGH</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="LOW">LOW</option>
          </select>
        </label>
        <label style={styles.label}>
          Status:
          <select
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            style={styles.select}
          >
            <option value="">All</option>
            <option value="OPEN">OPEN</option>
            <option value="IN_PROGRESS">IN_PROGRESS</option>
            <option value="COMPLETED">COMPLETED</option>
            <option value="REJECTED">REJECTED</option>
            <option value="CLOSED">CLOSED</option>
          </select>
        </label>
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>ID</th>
            <th style={styles.th}>Apartment</th>
            <th style={styles.th}>Title</th>
            <th style={styles.th}>Description</th>
            <th style={styles.th}>Priority</th>
            <th style={styles.th}>Status</th>
            <th style={styles.th}>Created At</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTickets.map((ticket) => (
            <tr key={ticket.id} style={styles.tr}>
              <td style={styles.td}>{ticket.id}</td>
              <td style={styles.td}>{ticket.apartmentNumber}</td>
              <td style={styles.td}>{ticket.title}</td>
              <td style={styles.td}>{ticket.description}</td>
              <td style={styles.td}>{ticket.priority}</td>
              <td style={styles.td}>{ticket.ticketStatus}</td>
              <td style={styles.td}>
                {new Date(ticket.createdAt).toLocaleString()}
              </td>
              <td style={styles.td}>
                <button
                  onClick={() => handleEditClick(ticket)}
                  style={styles.editButton}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalVisible && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h3 style={styles.modalTitle}>Edit Ticket</h3>
            <form onSubmit={handleFormSubmit} style={styles.form}>
              <label style={styles.label}>
                Title:
                <input
                  type="text"
                  value={selectedTicket.title}
                  onChange={(e) =>
                    setSelectedTicket((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                  style={styles.input}
                />
              </label>
              <label style={styles.label}>
                Description:
                <textarea
                  value={selectedTicket.description}
                  onChange={(e) =>
                    setSelectedTicket((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  style={styles.textarea}
                />
              </label>
              <label style={styles.label}>
                Priority:
                <select
                  value={selectedTicket.priority}
                  onChange={(e) =>
                    setSelectedTicket((prev) => ({
                      ...prev,
                      priority: e.target.value,
                    }))
                  }
                  style={styles.select}
                >
                  <option value="URGENT">URGENT</option>
                  <option value="HIGH">HIGH</option>
                  <option value="MEDIUM">MEDIUM</option>
                  <option value="LOW">LOW</option>
                </select>
              </label>
              <label style={styles.label}>
                Status:
                <select
                  value={selectedTicket.ticketStatus}
                  onChange={(e) =>
                    setSelectedTicket((prev) => ({
                      ...prev,
                      ticketStatus: e.target.value,
                    }))
                  }
                  style={styles.select}
                >
                  <option value="OPEN">OPEN</option>
                  <option value="IN_PROGRESS">IN_PROGRESS</option>
                  <option value="COMPLETED">COMPLETED</option>
                  <option value="REJECTED">REJECTED</option>
                  <option value="CLOSED">CLOSED</option>
                </select>
              </label>
              <button type="submit" style={styles.saveButton}>
                Save
              </button>
              <button
                type="button"
                onClick={handleModalClose}
                style={styles.cancelButton}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#f8f9fa",
    color: "#212529",
  },
  th: {
    padding: "10px",
    border: "1px solid #ddd",
    backgroundColor: "#343a40",
    color: "#fff",
  },
  td: {
    padding: "10px",
    border: "1px solid #ddd",
  },
  modal: {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    width: "500px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
  },
  modalTitle: {
    marginBottom: "20px",
    textAlign: "center",
    fontSize: "1.5rem",
    color: "#343a40",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  label: {
    fontSize: "1rem",
    fontWeight: "bold",
    color: "#212529",
  },
  input: {
    padding: "10px",
    border: "1px solid #ced4da",
    borderRadius: "4px",
    fontSize: "1rem",
    width: "100%",
  },
  textarea: {
    padding: "10px",
    border: "1px solid #ced4da",
    borderRadius: "4px",
    fontSize: "1rem",
    width: "100%",
    height: "80px",
  },
  select: {
    padding: "10px",
    border: "1px solid #ced4da",
    borderRadius: "4px",
    fontSize: "1rem",
  },
  saveButton: {
    padding: "10px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  cancelButton: {
    padding: "10px",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default TicketTable;
