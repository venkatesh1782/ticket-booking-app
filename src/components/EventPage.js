import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import BookingForm from "./BookingForm";
import bg from "../assets/bg.jpg";

export default function EventPage() {
  const { id } = useParams();
  const [availableTickets, setAvailableTickets] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:5000/remaining-tickets")
      .then(res => setAvailableTickets(res.data.remaining))
      .catch(err => console.log(err));
  }, []);

  // 🎯 EVENTS LIST
  const events = [
    {
      name: "Datanex'26",
      department: "CSE - Data Science",
      date: "25 April 2026",
      time: "10:00 AM",
      venue: "Auditorium Hall",
      price: 100
    },
    {
      name: "TechFest'26",
      department: "CSE",
      date: "26 April 2026",
      time: "11:00 AM",
      venue: "Seminar Hall",
      price: 150
    },
    {
      name: "AI Summit",
      department: "AI & ML",
      date: "27 April 2026",
      time: "9:30 AM",
      venue: "Main Block",
      price: 200
    },
    {
      name: "Hackathon 24H",
      department: "All Departments",
      date: "28 April 2026",
      time: "8:00 AM",
      venue: "Innovation Lab",
      price: 50
    }
  ];

  // ✅ SELECT EVENT
  const event = events[id - 1];

  if (!event) {
    return <h2 style={{ color: "white", textAlign: "center" }}>Event not found</h2>;
  }

  return (
    <div style={styles.bg}>
      <div style={styles.overlay}></div>

      {/* 🔥 FULL CENTER */}
      <div style={styles.centerWrapper}>

        <div style={styles.card}>

          {/* 🎟️ EVENT DETAILS */}
          <h2 style={styles.title}>{event.name}</h2>

          <p><b>Department:</b> {event.department}</p>
          <p><b>Date:</b> {event.date}</p>
          <p><b>Time:</b> {event.time}</p>
          <p><b>Venue:</b> {event.venue}</p>
          <p><b>Price:</b> ₹{event.price}</p>
          <p><b>Available Tickets:</b> {availableTickets}</p>

          <hr />

          {/* 🧾 BOOKING FORM */}
          <BookingForm
            event={event}
            availableTickets={availableTickets}
            setAvailableTickets={setAvailableTickets}
          />

        </div>

      </div>
    </div>
  );
}

// 🎨 STYLES
const styles = {
  bg: {
    height: "100vh",
    width: "100%",
    backgroundImage: `url(${bg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative"
  },

  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.6)"
  },

  // ✅ PERFECT CENTER
  centerWrapper: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative"
  },

  // 🔥 RESPONSIVE FULL LOOK
  card: {
    width: "90%",
    maxWidth: "700px",
    padding: "35px",
    borderRadius: "20px",
    textAlign: "center",

    background: "rgba(255,255,255,0.95)",
    backdropFilter: "blur(12px)",

    boxShadow: "0 15px 40px rgba(0,0,0,0.5)"
  },

  title: {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "15px"
  }
};