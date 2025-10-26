import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({ name: "", mobile: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.mobile || !form.password) {
      setMessage("⚠️ Please fill in all fields.");
      return;
    }

    if (!/^[0-9]{6,15}$/.test(form.mobile)) {
      setMessage("⚠️ Enter a valid mobile number (6–15 digits).");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://13.234.122.128:8080/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      setMessage(data.message);

      if (data.message?.toLowerCase().includes("successful")) {
        setTimeout(() => navigate("/login"), 1500);
      }
    } catch (err) {
      console.error("Signup error:", err);
      setMessage("⚠️ Unable to reach server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>🧾 Create Your Account</h2>
        <p style={styles.subtitle}>Join us to manage your policies easily.</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <input
            name="mobile"
            placeholder="Mobile Number"
            value={form.mobile}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.button,
              background: loading ? "#93c5fd" : "#2563eb",
            }}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        {message && (
          <p
            style={{
              marginTop: "15px",
              color:
                message.includes("⚠️") || message.includes("exists")
                  ? "#dc2626"
                  : "#16a34a",
              fontWeight: "600",
            }}
          >
            {message}
          </p>
        )}

        <p style={styles.footerText}>
          Already have an account?{" "}
          <Link to="/login" style={styles.link}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

/* ---------- Improved Styles ---------- */
const styles = {
  page: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background:
      "linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)",
    fontFamily: "Poppins, Arial, sans-serif",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    padding: "40px 35px",
    width: "360px",
    textAlign: "center",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
  },
  title: {
    fontSize: "24px",
    marginBottom: "8px",
    color: "#1e3a8a",
  },
  subtitle: {
    fontSize: "14px",
    color: "#6b7280",
    marginBottom: "25px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    background: "#f9fafb",
    fontSize: "15px",
    outline: "none",
  },
  button: {
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "16px",
    transition: "0.3s",
  },
  footerText: {
    marginTop: "20px",
    fontSize: "14px",
    color: "#4b5563",
  },
  link: {
    color: "#2563eb",
    textDecoration: "none",
    fontWeight: "bold",
  },
};

