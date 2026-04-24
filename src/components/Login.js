import React, { useState } from "react";
import axios from "axios";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Enter email & password");
      return;
    }

    try {
      // 🔐 Call backend login API
      await axios.post("http://localhost:5000/login", { email, password });

      // 💾 Save email (used later for booking/email)
      localStorage.setItem("userEmail", email);

      // 🔐 ROLE CHECK (IMPORTANT)
      if (email === "admin@gmail.com" && password === "admin123") {
        localStorage.setItem("role", "admin");
      } else {
        localStorage.setItem("role", "user");
      }

      // ✅ Move to next page
      onLogin(true);

    } catch (e) {
      alert("Login failed");
    }
  };

  return (
    <div className="card">
      <h2>🔐 Login – Datanex'26</h2>

      <input
        type="email"
        placeholder="Email"
        onChange={e => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={e => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}