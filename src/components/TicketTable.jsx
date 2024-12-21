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

  if (loading) return <p className="text-center text-gray-600">Loading tickets...</p>;

  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Tickets</h2>

      {/* Filters */}
      <div className="flex gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Priority:
          </label>
          <select
            name="priority"
            value={filters.priority}
            onChange={handleFilterChange}
            className="block w-full mt-1 p-2 border rounded-md"
          >
            <option value="">All</option>
            <option value="URGENT">URGENT</option>
            <option value="HIGH">HIGH</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="LOW">LOW</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Status:
          </label>
          <select
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            className="block w-full mt-1 p-2 border rounded-md"
          >
            <option value="">All</option>
            <option value="OPEN">OPEN</option>
            <option value="IN_PROGRESS">IN_PROGRESS</option>
            <option value="COMPLETED">COMPLETED</option>
            <option value="REJECTED">REJECTED</option>
            <option value="CLOSED">CLOSED</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <table className="min-w-full table-auto border-collapse border border-gray-200 bg-secondary">
        <thead className="bg-gray-100">
          <tr>
            {["ID", "Apartment", "Title", "Description", "Priority", "Status", "Created At", "Actions"].map((heading) => (
              <th key={heading} className="px-4 py-2 border border-gray-300 text-left text-sm font-medium text-gray-800">
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredTickets.map((ticket) => (
            <tr key={ticket.id} className="hover:bg-gray-50">
              <td className="px-4 py-2 border">{ticket.id}</td>
              <td className="px-4 py-2 border">{ticket.apartmentNumber}</td>
              <td className="px-4 py-2 border">{ticket.title}</td>
              <td className="px-4 py-2 border">{ticket.description}</td>
              <td className="px-4 py-2 border">{ticket.priority}</td>
              <td className="px-4 py-2 border">{ticket.ticketStatus}</td>
              <td className="px-4 py-2 border">
                {new Date(ticket.createdAt).toLocaleString()}
              </td>
              <td className="px-4 py-2 border">
                <button
                  onClick={() => handleEditClick(ticket)}
                  className="px-2 py-1 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {isModalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold mb-4">Edit Ticket</h3>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Title:</label>
                <input
                  type="text"
                  value={selectedTicket.title}
                  onChange={(e) =>
                    setSelectedTicket((prev) => ({ ...prev, title: e.target.value }))
                  }
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Description:</label>
                <textarea
                  value={selectedTicket.description}
                  onChange={(e) =>
                    setSelectedTicket((prev) => ({ ...prev, description: e.target.value }))
                  }
                  className="w-full p-2 border rounded-md"
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium">Priority:</label>
                <select
                  value={selectedTicket.priority}
                  onChange={(e) =>
                    setSelectedTicket((prev) => ({ ...prev, priority: e.target.value }))
                  }
                  className="w-full p-2 border rounded-md"
                >
                  <option value="URGENT">URGENT</option>
                  <option value="HIGH">HIGH</option>
                  <option value="MEDIUM">MEDIUM</option>
                  <option value="LOW">LOW</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium">Status:</label>
                <select
                  value={selectedTicket.ticketStatus}
                  onChange={(e) =>
                    setSelectedTicket((prev) => ({ ...prev, ticketStatus: e.target.value }))
                  }
                  className="w-full p-2 border rounded-md"
                >
                  <option value="OPEN">OPEN</option>
                  <option value="IN_PROGRESS">IN_PROGRESS</option>
                  <option value="COMPLETED">COMPLETED</option>
                  <option value="REJECTED">REJECTED</option>
                  <option value="CLOSED">CLOSED</option>
                </select>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={handleModalClose}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketTable;
