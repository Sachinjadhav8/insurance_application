import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({ mobile: "", password: "" });
  const [message, setMessage] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://13.234.122.128:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      console.log("🔍 Backend login response:", data);

      if (data.message && data.message.toLowerCase().includes("login successful")) {
        localStorage.setItem("userMobile", data.mobile);
        localStorage.setItem("userName", data.name);
        localStorage.setItem("userId", data.userId);

        login(form.mobile, form.password);
        setMessage("✅ Login successful! Redirecting...");
        setTimeout(() => navigate("/dashboard"), 1500);
      } else {
        setMessage("❌ " + (data.message || "Invalid credentials. Try again!"));
      }
    } catch (err) {
      console.error("Login error:", err);
      setMessage("⚠️ Unable to reach server. Please try again later.");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>🔐 Insurance Portal Login</h2>
        <p style={styles.subtitle}>Welcome back! Please login to continue.</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            name="mobile"
            placeholder="Enter Mobile Number"
            value={form.mobile}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            name="password"
            type="password"
            placeholder="Enter Password"
            value={form.password}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            {message.includes("✅") ? "Logging In..." : "Login"}
          </button>
        </form>

        {message && (
          <p
            style={{
              color: message.includes("❌") ? "#dc2626" : "#16a34a",
              marginTop: "10px",
              fontWeight: "500",
            }}
          >
            {message}
          </p>
        )}

        <p style={{ marginTop: "20px" }}>
          Don’t have an account?{" "}
          <Link to="/signup" style={styles.link}>
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    height: "100vh",
    background: "linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Poppins, Arial, sans-serif",
  },
  card: {
    width: "100%",
    maxWidth: "380px",
    backgroundColor: "#ffffff",
    padding: "40px 35px",
    borderRadius: "15px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  title: {
    color: "#1e3a8a",
    fontSize: "24px",
    fontWeight: "600",
    marginBottom: "5px",
  },
  subtitle: {
    color: "#6b7280",
    fontSize: "14px",
    marginBottom: "25px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    fontSize: "15px",
    outline: "none",
    transition: "0.2s",
  },
  button: {
    marginTop: "10px",
    padding: "12px",
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "500",
    transition: "0.3s",
  },
  link: {
    color: "#2563eb",
    textDecoration: "none",
    fontWeight: "500",
  },
};

