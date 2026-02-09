import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_BASE;

export default function PolicyList() {
  const [policies, setPolicies] = useState([]);
  const [message, setMessage] = useState("Loading policies...");
  const navigate = useNavigate();

  useEffect(() => {
    const userMobile = localStorage.getItem("userMobile");

    if (!userMobile) {
      setMessage("⚠️ Please log in again to view your policies.");
      return;
    }

    fetch(`${API_BASE}/policies`, {
      headers: {
        "Content-Type": "application/json",
        "user-mobile": userMobile,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setPolicies(data);
          setMessage("");
        } else {
          setMessage("📄 No policies found for your account.");
        }
      })
      .catch((err) => {
        console.error("Error fetching policies:", err);
        setMessage("❌ Unable to load policies. Please try again later.");
      });
  }, []);

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        {/* 🔙 Back Button */}
        <button style={styles.backButton} onClick={() => navigate("/dashboard")}>
          ← Back to Dashboard
        </button>

        <h2 style={styles.heading}>📄 My Policies</h2>

        {message && (
          <p style={styles.message}>{message}</p>
        )}

        <div style={styles.grid}>
          {policies.map((p) => (
            <div key={p.id || p._id} style={styles.policyCard}>
              <h3 style={{ color: "#1d4ed8", textAlign: "center" }}>
                {p.policyType}
              </h3>
              <hr />
              <p>
                <strong>Policy No:</strong> {p.policyNumber || "—"}
              </p>
              <p>
                <strong>Premium:</strong> ₹{p.premium}
              </p>
              <p>
                <strong>Frequency:</strong> {p.premiumFrequency}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  style={{
                    color: p.status === "Active" ? "green" : "red",
                    fontWeight: "bold",
                  }}
                >
                  {p.status}
                </span>
              </p>
              <p>
                <strong>Coverage:</strong> ₹{p.coverageAmount}
              </p>
              <p>
                <strong>Start:</strong> {p.startDate || "N/A"} →{" "}
                <strong>End:</strong> {p.endDate || "N/A"}
              </p>
              <p>
                <strong>Nominee:</strong> {p.nomineeName} ({p.nomineeRelation})
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- Modern Styling ---------- */
const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: "50px 20px",
    fontFamily: "Poppins, Arial, sans-serif",
  },
  card: {
    background: "#ffffff",
    borderRadius: "12px",
    padding: "35px",
    width: "90%",
    maxWidth: "950px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
    position: "relative",
  },
  backButton: {
    position: "absolute",
    top: "15px",
    left: "15px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "6px",
    padding: "6px 10px",
    cursor: "pointer",
    fontSize: "14px",
  },
  heading: {
    textAlign: "center",
    color: "#1e3a8a",
    marginBottom: "25px",
  },
  message: {
    textAlign: "center",
    color: "#444",
    marginBottom: "20px",
    fontWeight: 500,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "20px",
  },
  policyCard: {
    backgroundColor: "#f9fafb",
    padding: "20px",
    border: "1px solid #e5e7eb",
    borderRadius: "10px",
    boxShadow: "0 3px 8px rgba(0,0,0,0.1)",
    transition: "transform 0.2s ease",
  },
};

