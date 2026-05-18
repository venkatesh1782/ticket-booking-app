import React, { useState } from "react";
import axios from "axios";

export default function BookingForm({
  event,
  availableTickets,
  setAvailableTickets,
  setBookingData
}) {
  const [form, setForm] = useState({
    name: "",
    email: localStorage.getItem("userEmail") || "",
    department: "",
    tickets: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔄 Handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Validation
  const validate = () => {
    if (!form.name || !form.email || !form.department || !form.tickets) {
      return "All fields are required";
    }

    if (!/\S+@\S+\.\S+/.test(form.email)) {
      return "Invalid email format";
    }

    if (Number(form.tickets) <= 0) {
      return "Tickets must be greater than 0";
    }

    if (Number(form.tickets) > availableTickets) {
      return "Not enough tickets available";
    }

    return "";
  };

  // 💳 Booking function
  const handlePayment = async () => {
    const err = validate();
    if (err) {
      setError(err);
      setSuccess("");
      return;
    }

    setError("");
    setSuccess("");
    setLoading(true);

    const total = Number(form.tickets) * event.price;

    try {
      const res = await axios.post("http://localhost:5000/book", {
        name: form.name,
        email: form.email,
        department: form.department,
        tickets: Number(form.tickets),
        total,
        paid: true
      });

      console.log("RESPONSE:", res.data);

      // ✅ Success handling
      if (res.status === 200) {

        // Update tickets
        setAvailableTickets(prev => prev - Number(form.tickets));

        // Show summary (if used)
        if (setBookingData) {
          setBookingData({
            ...form,
            eventName: event.name,
            total
          });
        }

        // Reset form
        setForm({
          name: "",
          email: form.email,
          department: "",
          tickets: ""
        });

        setSuccess("Booking successful 🎉");
      }

    } catch (e) {
      console.log("ERROR:", e.response?.data);

      setError(
        e.response?.data?.message ||
        e.response?.data?.error ||
        "Booking failed"
      );
      setSuccess("");
    }

    setLoading(false);
  };

  return (
    <div style={styles.card} className="mt-4">

      <h3 className="text-center mb-3" style={{ fontWeight: "bold" }}>
        🎟️ Book Tickets
      </h3>

      {/* ❌ ERROR */}
      {error && (
        <p className="text-center" style={{ color: "red", fontWeight: "500" }}>
          {error}
        </p>
      )}

      {/* ✅ SUCCESS */}
      {success && (
        <p className="text-center" style={{ color: "green", fontWeight: "600" }}>
          {success}
        </p>
      )}

      {/* INPUTS */}
      <input
        className="form-control mb-3"
        name="name"
        placeholder="👤 Enter Name"
        value={form.name}
        onChange={handleChange}
        style={styles.input}
      />

      <input
        className="form-control mb-3"
        name="email"
        placeholder="📧 Enter Email"
        value={form.email}
        onChange={handleChange}
        style={styles.input}
      />

      <input
        className="form-control mb-3"
        name="department"
        placeholder="🏫 Enter Department"
        value={form.department}
        onChange={handleChange}
        style={styles.input}
      />

      <input
        className="form-control mb-4"
        type="number"
        name="tickets"
        placeholder="🎫 Number of Tickets"
        value={form.tickets}
        onChange={handleChange}
        style={styles.input}
      />

      {/* BUTTON */}
      <button
        className="btn w-100"
        onClick={handlePayment}
        disabled={loading}
        style={styles.button}
      >
        {loading ? "Processing..." : "Pay & Book"}
      </button>

      {/* AVAILABLE */}
      <p className="text-center mt-3" style={{ fontWeight: "bold" }}>
        Available Tickets: {availableTickets}
      </p>

    </div>
  );
}

// 🎨 STYLES
const styles = {
  card: {
    borderRadius: "15px",
    padding: "25px",
    background: "rgba(255,255,255,0.9)",
    backdropFilter: "blur(10px)",
    boxShadow: "0 8px 25px rgba(0,0,0,0.3)"
  },

  input: {
    borderRadius: "10px",
    padding: "10px",
    border: "1px solid #ddd"
  },

  button: {
    borderRadius: "10px",
    padding: "12px",
    fontWeight: "bold",
    background: "linear-gradient(45deg, #ff7e5f, #feb47b)",
    border: "none",
    color: "white",
    transition: "0.3s"
  }
};