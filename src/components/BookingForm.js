import React, { useState } from "react";
import axios from "axios";

export default function BookingForm({
  event, availableTickets, setAvailableTickets, setBookingData
}) {
  const [form, setForm] = useState({
    name: "",
    email: localStorage.getItem("userEmail") || "",
    department: "",
    tickets: ""
  });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    if (!form.name || !form.email || !form.department || !form.tickets) {
      return "All fields are required";
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) return "Invalid email";
    if (Number(form.tickets) <= 0) return "Tickets must be > 0";
    if (Number(form.tickets) > availableTickets) return "Not enough tickets";
    return "";
  };

 const handlePayment = async () => {
  const err = validate();
  if (err) return setError(err);

  const total = Number(form.tickets) * event.price;

  // 💳 Fake payment success
  alert("Payment Successful ✅");

  try {
    await axios.post("http://localhost:5000/book", {
      ...form,
      total,
      paid: true
    });

    // update tickets
    const remaining = availableTickets - Number(form.tickets);
    setAvailableTickets(remaining);

    // show summary
    setBookingData({
      ...form,
      eventName: event.name,
      total
    });

    // reset form
    setForm({
      name: "",
      email: form.email,
      department: "",
      tickets: ""
    });

  } catch (e) {
    setError("Booking failed");
  }
};

  return (
    <div className="card">
      <h2>Book Tickets</h2>
      {error && <p className="error">{error}</p>}

      <form >
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange}/>
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange}/>
        <input name="department" placeholder="Department" value={form.department} onChange={handleChange}/>
        <input name="tickets" type="number" placeholder="Tickets" value={form.tickets} onChange={handleChange}/>
        <button type="button" onClick={handlePayment}>
  Pay & Book
</button>
      </form>
    </div>
  );
}