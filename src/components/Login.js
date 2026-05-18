import React, { useState } from "react";
import axios from "axios";

// 📸 Background image
import bg from "../assets/bg.jpg";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Enter email & password");
      return;
    }

    try {
      await axios.post("http://localhost:5000/login", { email, password });

      localStorage.setItem("userEmail", email);

      if (email === "admin@gmail.com" && password === "admin123") {
        localStorage.setItem("role", "admin");
        window.location.href = "/admin";
      } else {
        localStorage.setItem("role", "user");
        window.location.href = "/home";
      }

    } catch (e) {
      alert("Login failed");
    }
  };

  return (
    <div style={styles.bg}>
      <div style={styles.overlay}></div>

      <div className="shadow-lg" style={styles.card}>

        <h2 style={styles.title}>Login Portal</h2>
        <p style={styles.subtitle}>Admin / Student Access</p>

        {/* 🔥 FIXED LAYOUT */}
        <div style={styles.formContainer}>

          <input
            type="email"
            placeholder="📧 Enter Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={styles.input}
          />

          <input
            type="password"
            placeholder="🔒 Enter Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={styles.input}
          />

          <button onClick={handleLogin} style={styles.button}>
            Login
          </button>

        </div>

      </div>
    </div>
  );
}

// 🎨 STYLES
const styles = {
  bg: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: `url(${bg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative"
  },

  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.5)"
  },

  card: {
    width: "400px",
    padding: "30px",
    borderRadius: "15px",
    background: "rgba(255,255,255,0.9)",
    backdropFilter: "blur(10px)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
    textAlign: "center",
    position: "relative"
  },

  title: {
    fontWeight: "bold",
    marginBottom: "10px"
  },

  subtitle: {
    color: "#555",
    marginBottom: "20px"
  },

  // ✅ THIS FIXES EVERYTHING
  formContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },

  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    fontSize: "14px"
  },

  button: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    fontWeight: "bold",
    color: "white",
    background: "linear-gradient(45deg, #4facfe, #00f2fe)",
    cursor: "pointer"
  }
};