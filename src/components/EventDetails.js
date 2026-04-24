import React from "react";

function EventDetails({ event, availableTickets }) {
  return (
    <div className="card">
      <h2>{event.name}</h2>
      <p><b>Department:</b> {event.department}</p>
      <p><b>Date:</b> {event.date}</p>
      <p><b>Time:</b> {event.time}</p>
      <p><b>Venue:</b> {event.venue}</p>
      <p><b>Price:</b> ₹{event.price}</p>
      <p><b>Available Tickets:</b> {availableTickets}</p>
    </div>
  );
}

export default EventDetails;