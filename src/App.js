import React, { useState, useEffect } from "react";
import axios from "axios";

import Login from "./components/Login";
import Admin from "./components/Admin";
import EventDetails from "./components/EventDetails";
import BookingForm from "./components/BookingForm";
import BookingSummary from "./components/BookingSummary";
import "./App.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [availableTickets, setAvailableTickets] = useState(0);
  const [bookingData, setBookingData] = useState(null);

  // 🔄 Fetch tickets from backend
  useEffect(() => {
    axios.get("http://localhost:5000/remaining-tickets")
      .then(res => setAvailableTickets(res.data.remaining));
  }, []);

  // 🔐 Login
  if (!loggedIn) {
    return <Login onLogin={setLoggedIn} />;
  }

  // 📊 Admin view
  if (isAdmin) {
    return (
      <div className="container">
        <button onClick={() => setIsAdmin(false)}>⬅ Back to User</button>
        <Admin />
      </div>
    );
  }

  // 🎟️ Event
  const event = {
    name: "Datanex'26",
    department: "CSE - Data Science",
    date: "25 April 2026",
    time: "10:00 AM",
    venue: "Auditorium Hall",
    price: 200
  };

  return (
    <div className="container">
      <h1>🎟️ Ticket Booking System</h1>

      {/* 🔐 Admin access only */}
      {localStorage.getItem("role") === "admin" && (
        <button onClick={() => setIsAdmin(true)}>Admin View</button>
      )}

      <EventDetails event={event} availableTickets={availableTickets} />

      <BookingForm
        event={event}
        availableTickets={availableTickets}
        setAvailableTickets={setAvailableTickets}
        setBookingData={setBookingData}
      />

      {bookingData && <BookingSummary data={bookingData} />}
    </div>
  );
}

export default App;