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
          />

          <input
            name="mobile"
            placeholder="Mobile Number"
            value={form.mobile}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            name="password"
            placeholder="Password"
            type="password"
            value={form.password}
            onChange={handleChange}
            style={styles.input}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.button,
              background: loading ? "#9ca3af" : "#2563eb",
            }}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        {message && (
          <p
            style={{
              marginTop: "15px",
              color: message.includes("⚠️") || message.includes("exists")
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

/* ---------- Modern Styles ---------- */
const styles = {
  page: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background:
      "linear-gradient(135deg, #2563eb 0%, #1e40af 50%, #0f172a 100%)",
    fontFamily: "Poppins, Arial, sans-serif",
    color: "#fff",
  },
  card: {
    background: "rgba(255, 255, 255, 0.12)",
    borderRadius: "15px",
    padding: "40px 35px",
    width: "350px",
    textAlign: "center",
    boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
    backdropFilter: "blur(10px)",
  },
  title: {
    fontSize: "22px",
    marginBottom: "5px",
    color: "#fff",
  },
  subtitle: {
    fontSize: "14px",
    color: "#d1d5db",
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
    border: "1px solid rgba(255,255,255,0.3)",
    background: "rgba(255,255,255,0.15)",
    color: "#fff",
    outline: "none",
    transition: "0.3s",
  },
  button: {
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "15px",
    transition: "0.3s",
  },
  footerText: {
    marginTop: "20px",
    fontSize: "14px",
    color: "#d1d5db",
  },
  link: {
    color: "#60a5fa",
    textDecoration: "none",
    fontWeight: "bold",
  },
};

