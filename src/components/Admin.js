import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Admin.css";

export default function Admin() {
  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState({
    totalBookings: 0,
    totalTickets: 0,
    totalRevenue: 0
  });
  const [newTickets, setNewTickets] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/bookings")
      .then(res => setBookings(res.data));

    axios.get("http://localhost:5000/stats")
      .then(res => setStats(res.data));
  }, []);

  // 🔍 Search filter
  const filteredData = bookings.filter(b =>
    b.name.toLowerCase().includes(search.toLowerCase()) ||
    b.email.toLowerCase().includes(search.toLowerCase()) ||
    b.department.toLowerCase().includes(search.toLowerCase()) ||
    String(b.tickets).includes(search)
  );
  const handleReset = async () => {
  try {
    await axios.post("http://localhost:5000/admin/reset", {
      totalTickets: newTickets
    });

    alert("System Reset Done");
    window.location.reload();
  } catch (err) {
    alert("Reset failed");
  }
};

  return (
    <div className="admin-container">
      <h1>📊 Admin Dashboard - Datanex'26</h1>
      <div style={{ margin: "20px 0" }}>
  <input
    type="number"
    placeholder="Enter total tickets"
    value={newTickets}
    onChange={(e) => setNewTickets(e.target.value)}
  />

  <button onClick={handleReset}>
    Reset Event
  </button>
</div>

      {/* Stats */}
      <div className="stats">
        <div className="card">Registrations: {stats.totalBookings}</div>
        <div className="card">Tickets: {stats.totalTickets}</div>
        <div className="card">Revenue: ₹{stats.totalRevenue}</div>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="🔍 Search by name, email, department, tickets..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-box"
      />

      {/* Table */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Tickets</th>
              <th>Amount</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.map((b, i) => (
              <tr key={i}>
                <td>{b.name}</td>
                <td>{b.email}</td>
                <td>{b.department}</td>
                <td>{b.tickets}</td>
                <td>₹{b.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}