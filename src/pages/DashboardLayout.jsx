import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const DashboardLayout = () => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem('userRole');
  const firstName = localStorage.getItem('firstName');
  const lastName = localStorage.getItem('lastName');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="flex h-screen">
      <nav className="w-64 bg-gray-900 text-white flex flex-col justify-between p-4">
        <div className="space-y-4">
          <Link to="/dashboard" className="block px-4 py-2 rounded hover:bg-gray-800">
            Dashboard Summary
          </Link>
          {userRole !== 'RESIDENT' && (
            <Link to="/dashboard/createUser" className="block px-4 py-2 rounded hover:bg-gray-800">
              Create User
            </Link>
          )}
          <Link to="/dashboard/createTicket" className="block px-4 py-2 rounded hover:bg-gray-800">
            Create Ticket
          </Link>
          <Link to="/dashboard/tickets" className="block px-4 py-2 rounded hover:bg-gray-800">
            See All Tickets
          </Link>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-700">
          <div className="text-sm text-gray-400 mb-2">
            Logged in as: <strong>{firstName} {lastName}</strong>
          </div>
          <button
            className="w-full py-2 bg-red-600 text-white rounded hover:bg-red-700"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </nav>
      <main className="flex-1 bg-gray-100 p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
