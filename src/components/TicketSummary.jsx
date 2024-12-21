import React from "react";

const TicketSummary = ({ title, count }) => {
  return (
    <div className="p-4 bg-white rounded shadow text-center">
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      <p className="text-xl font-bold text-red-600">{count}</p>
    </div>
  );
};

export default TicketSummary;
