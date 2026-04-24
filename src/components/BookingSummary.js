import React from "react";

function BookingSummary({ data }) {
  return (
    <div className="card success">
      <h2>✅ Booking Confirmed!</h2>
      <p><b>Name:</b> {data.name}</p>
      <p><b>Event:</b> {data.eventName}</p>
      <p><b>Tickets:</b> {data.tickets}</p>
      <p><b>Total Amount:</b> ₹{data.total}</p>
    </div>
  );
}

export default BookingSummary;