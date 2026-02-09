import React, { useEffect, useState, useContext } from "react";
import { api } from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_BASE;

export default function Dashboard() {
  const { logout } = useContext(AuthContext);
  const [counts, setCounts] = useState({ policies: 0, claims: 0, payments: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCounts = async () => {
      const userMobile = localStorage.getItem("userMobile"); // ✅ Get logged-in user
      if (!userMobile) {
        setError("⚠️ Please login again to view your dashboard.");
        setLoading(false);
        return;
      }

      try {
        const headers = { "user-mobile": userMobile };

        const [p, c, pay] = await Promise.allSettled([
          fetch(`${API_BASE}/policies`, { headers }).then(
            (r) => r.json()
          ),
          fetch(`${API_BASE}/claims`, { headers }).then(
            (r) => r.json()
          ),
          fetch(`${API_BASE}/payments`, { headers }).then(
            (r) => r.json()
          ),
        ]);

        setCounts({
          policies: Array.isArray(p.value) ? p.value.length : 0,
          claims: Array.isArray(c.value) ? c.value.length : 0,
          payments: Array.isArray(pay.value) ? pay.value.length : 0,
        });
      } catch (err) {
        console.error("Error loading dashboard:", err);
        setError("⚠️ Unable to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  const handleLogout = () => {
    logout();
    localStorage.removeItem("userMobile");
    navigate("/login");
  };

  if (loading)
    return (
      <div style={styles.page}>
        <h2 style={{ color: "white" }}>⏳ Loading Dashboard...</h2>
      </div>
    );

  if (error)
    return (
      <div style={styles.page}>
        <p style={{ color: "red" }}>{error}</p>
      </div>
    );

  return (
    <div style={styles.page}>
      <div style={styles.dashboard}>
        <h1 style={styles.title}>🏠 Dashboard</h1>
        <p style={styles.subtitle}>
          Welcome back! Here’s an overview of your insurance activity.
        </p>

        <div style={styles.cards}>
          <div style={{ ...styles.card, background: "#3b82f6" }}>
            <h3>📄 Policies</h3>
            <p style={styles.count}>{counts.policies}</p>
          </div>

          <div style={{ ...styles.card, background: "#10b981" }}>
            <h3>🧾 Claims</h3>
            <p style={styles.count}>{counts.claims}</p>
          </div>

          <div style={{ ...styles.card, background: "#f59e0b" }}>
            <h3>💳 Payments</h3>
            <p style={styles.count}>{counts.payments}</p>
          </div>
        </div>

        <div style={styles.links}>
          <Link style={styles.link} to="/policies">
            📘 View Policies
          </Link>
          <Link style={styles.link} to="/create-policy">
            ➕ Create Policy
          </Link>
          <Link style={styles.link} to="/claim">
            🧾 File Claim
          </Link>
          <Link style={styles.link} to="/payment">
            💳 Make Payment
          </Link>
        </div>

        <button onClick={handleLogout} style={styles.logout}>
          🚪 Logout
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg, #2563eb 0%, #1e40af 50%, #0f172a 100%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Poppins, Arial, sans-serif",
    color: "#fff",
    padding: "30px",
  },
  dashboard: {
    width: "100%",
    maxWidth: "850px",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: "16px",
    padding: "40px",
    boxShadow: "0 8px 30px rgba(0, 0, 0, 0.2)",
    backdropFilter: "blur(12px)",
    textAlign: "center",
  },
  title: {
    fontSize: "2.2rem",
    fontWeight: "700",
    marginBottom: "8px",
    color: "#fff",
  },
  subtitle: {
    color: "#cbd5e1",
    marginBottom: "30px",
    fontSize: "15px",
  },
  cards: {
    display: "flex",
    justifyContent: "center",
    gap: "1.5rem",
    flexWrap: "wrap",
    marginBottom: "40px",
  },
  card: {
    width: "180px",
    height: "140px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    transition: "transform 0.3s, box-shadow 0.3s",
    cursor: "pointer",
  },
  count: {
    fontSize: "2rem",
    fontWeight: "bold",
    marginTop: "5px",
  },
  link: {
    background: "rgba(255,255,255,0.15)",
    padding: "10px 15px",
    margin: "8px",
    borderRadius: "8px",
    color: "#fff",
    textDecoration: "none",
    fontWeight: "600",
    transition: "0.3s",
  },
  links: {
    marginBottom: "30px",
  },
  logout: {
    padding: "10px 25px",
    backgroundColor: "#ef4444",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
};

