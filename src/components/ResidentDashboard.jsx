import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ResidentDashboard = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [newTicket, setNewTicket] = useState({
    apartmentNumber: "",
    title: "",
    description: "",
    priority: "LOW",
  });

  // Fetch all tickets for the resident
  useEffect(() => {
    const fetchTickets = async () => {
      const authToken = localStorage.getItem("authToken");
      try {
        const response = await axios.get("http://localhost:8080/api/v1/tickets", {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
          },
        });
        setTickets(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };
    fetchTickets();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("role");
    navigate("/");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTicket({ ...newTicket, [name]: value });
  };

  const handleRaiseTicket = async (e) => {
    e.preventDefault();
    const authToken = localStorage.getItem("authToken");
    try {
      const response = await axios.post("http:localhost:8080/api/v1/tickets", newTicket, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setTickets((prevTickets) => [...prevTickets, response.data]);
      setNewTicket({ apartmentNumber: "", title: "", description: "", priority: "LOW" });
      alert("Ticket raised successfully!");
    } catch (error) {
      console.error("Error raising ticket:", error);
      alert("Failed to raise the ticket.");
    }
  };

  return (
    <div className="min-h-screen bg-primary text-white-100">
      <header className="bg-secondary shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Resident Dashboard</h1>
          <nav className="space-x-4">
            <button
              className="px-4 py-2 bg-tertiary text-primary font-semibold rounded-md hover:bg-opacity-80 transition duration-200"
              onClick={() => navigate("/profile")}
            >
              Profile
            </button>
            <button
              className="px-4 py-2 bg-tertiary text-primary font-semibold rounded-md hover:bg-opacity-80 transition duration-200"
              onClick={() => navigate("/notifications")}
            >
              Notifications
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition duration-200"
            >
              Logout
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-3xl font-bold mb-6">Welcome to Your Dashboard!</h2>

        <section className="mb-8">
          <h3 className="text-2xl font-bold mb-4">Raise a New Ticket</h3>
          <form
            onSubmit={handleRaiseTicket}
            className="bg-white p-6 rounded-md shadow-md"
          >
            <div className="mb-4">
              <label
                htmlFor="apartmentNumber"
                className="block text-gray-700 font-medium mb-2"
              >
                Apartment Number
              </label>
              <input
                type="text"
                id="apartmentNumber"
                name="apartmentNumber"
                value={newTicket.apartmentNumber}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-gray-700 font-medium mb-2"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={newTicket.title}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-gray-700 font-medium mb-2"
              >
                Issue Description
              </label>
              <textarea
                id="description"
                name="description"
                value={newTicket.description}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="priority"
                className="block text-gray-700 font-medium mb-2"
              >
                Priority
              </label>
              <select
                id="priority"
                name="priority"
                value={newTicket.priority}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
              </select>
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200"
            >
              Raise Ticket
            </button>
          </form>
        </section>

        <section>
          <h3 className="text-2xl font-bold mb-4">Your Tickets</h3>
          {tickets.length === 0 ? (
            <p>No tickets found.</p>
          ) : (
            <ul className="space-y-4">
              {tickets.map((ticket) => (
                <li
                  key={ticket.id}
                  className="bg-white p-4 rounded-md shadow-md"
                >
                  <h4 className="font-bold text-lg">{ticket.title}</h4>
                  <p>
                    <strong>Description:</strong> {ticket.description}
                  </p>
                  <p>
                    <strong>Priority:</strong> {ticket.priority}
                  </p>
                  <p>
                    <strong>Status:</strong> {ticket.ticketStatus}
                  </p>
                  <p>
                    <strong>Last Updated:</strong>{" "}
                    {new Date(ticket.updatedAt).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
};

export default ResidentDashboard;
