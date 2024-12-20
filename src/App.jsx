import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Login from './pages/Login';
import DashboardLayout from './pages/DashboardLayout';
import DashboardPage from './pages/DashboardPage';
import UserRegistration from './pages/UserRegistration';
import CreateTicket from './pages/CreateTicket';
import Tickets from './pages/Tickets';

// A simple private route component that checks for authToken
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('authToken');
  return token ? children : <Navigate to="/" replace />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Login />} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={<PrivateRoute><DashboardLayout /></PrivateRoute>}>
          {/* Default dashboard summary view */}
          <Route index element={<DashboardPage />} />

          {/* Nested routes for other dashboard views */}
          <Route path="createUser" element={<UserRegistration />} />
          <Route path="createTicket" element={<CreateTicket />} />
          <Route path="tickets" element={<Tickets />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
