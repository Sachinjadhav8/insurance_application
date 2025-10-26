import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({ mobile: "", password: "" });
  const [message, setMessage] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

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

      // ✅ Check using lowercase for flexibility
      if (
        data.message &&
        data.message.toLowerCase().includes("login successful")
      ) {
        // ✅ Store user info locally
        localStorage.setItem("userMobile", data.mobile);
        localStorage.setItem("userName", data.name);
        localStorage.setItem("userId", data.userId);

        // ✅ Update auth context
        login(form.mobile, form.password);

        setMessage("✅ Login successful! Redirecting...");
        setTimeout(() => navigate("/dashboard"), 1500);
      } else {
        setMessage(
          "❌ " + (data.message || "Invalid credentials. Try again!")
        );
      }
    } catch (err) {
      console.error("Login error:", err);
      setMessage("⚠️ Unable to reach server. Please try again later.");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🔐 User Login</h2>
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
          Login
        </button>
      </form>

      {message && (
        <p
          style={{
            color: message.includes("❌") ? "red" : "green",
            marginTop: "10px",
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
  );
}

const styles = {
  container: {
    padding: "40px",
    textAlign: "center",
    maxWidth: "400px",
    margin: "80px auto",
    border: "1px solid #ddd",
    borderRadius: "12px",
    backgroundColor: "#ffffff",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
  title: {
    marginBottom: "20px",
    color: "#007bff",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    margin: "10px 0",
    padding: "12px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  button: {
    marginTop: "15px",
    padding: "12px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
  },
  link: {
    color: "#007bff",
    textDecoration: "none",
    fontWeight: "500",
  },
};

