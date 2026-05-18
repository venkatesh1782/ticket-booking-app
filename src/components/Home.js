import React from "react";
import { useNavigate } from "react-router-dom";
import bg from "../assets/bg.jpg";

export default function Home() {
  const navigate = useNavigate();

  const events = [
    { id: 1, name: "Datanex'26" },
    { id: 2, name: "TechFest'26" },
    { id: 3, name: "AI Summit" },
    { id: 4, name: "Hackathon 24H" }
  ];

  return (
    <div style={styles.bg}>
      
      {/* 🔥 STRONG OVERLAY */}
      <div style={styles.overlay}></div>

      <div className="container py-5" style={{ position: "relative" }}>

        {/* ✅ FIXED TITLE */}
        <h1 style={styles.title}>
          🎟️ Ticket Booking System
        </h1>

        {/* EVENTS */}
        <div className="row justify-content-center">
          {events.map((event) => (
            <div key={event.id} className="col-md-6 col-lg-3 mb-4">

              <div
                style={styles.card}
                onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-8px)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
              >
                <h4 style={styles.eventTitle}>{event.name}</h4>

                <button
                  style={styles.button}
                  onClick={() => navigate(`/event/${event.id}`)}
                >
                  View & Book
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

// 🎨 STYLES
const styles = {
  bg: {
    minHeight: "100vh",
    backgroundImage: `url(${bg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative"
  },

  // 🔥 DARKER OVERLAY (KEY FIX)
  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    background: "linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0.7))"
  },

  // ✅ BIG CLEAN TITLE
  title: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: "38px",
    marginBottom: "40px",
    letterSpacing: "1px"
  },

  // 🔥 MODERN CARD
  card: {
    background: "rgba(255,255,255,0.1)",
    backdropFilter: "blur(12px)",
    borderRadius: "15px",
    padding: "30px",
    textAlign: "center",
    color: "white",
    boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
    transition: "0.3s",
    cursor: "pointer"
  },

  eventTitle: {
    marginBottom: "20px",
    fontWeight: "bold"
  },

  // 🔥 BETTER BUTTON
  button: {
    padding: "10px 20px",
    borderRadius: "8px",
    border: "none",
    background: "linear-gradient(45deg, #ff7e5f, #feb47b)",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer"
  }
};