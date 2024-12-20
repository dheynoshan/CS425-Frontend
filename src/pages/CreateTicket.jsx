import React from 'react';
import TicketForm from '../components/TicketForm';

const CreateTicket = () => {
  return (
    <div>
      <TicketForm onSubmit={(ticketData) => {
        // Handle create ticket logic here
        // Example: POST to backend and redirect or show success message
        fetch('http://localhost:8080/api/v1/tickets', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          },
          body: JSON.stringify(ticketData),
        })
          .then(response => {
            if(!response.ok) {
              throw new Error('Failed to create ticket');
            }
            return response.json();
          })
          .then((data) => {
            alert('Ticket created successfully!');
          })
          .catch(err => alert(err.message));
      }}/>
    </div>
  );
};

export default CreateTicket;
