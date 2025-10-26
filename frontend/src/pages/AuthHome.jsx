import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthHome() {
  const navigate = useNavigate();

  // ✅ Redirect logged-in users directly to Dashboard
  useEffect(() => {
    const mobile = localStorage.getItem("mobile");
    if (mobile) {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <div style={container}>
      <div style={card}>
        <h1>🛡️ Welcome to the Insurance Portal</h1>
        <p style={subtitle}>Manage your policies, claims, and payments easily.</p>

        <div style={buttonGroup}>
          <button style={{ ...btn, backgroundColor: "#28a745" }} onClick={() => navigate("/signup")}>
            ✍️ Sign Up
          </button>
          <button style={{ ...btn, backgroundColor: "#007bff" }} onClick={() => navigate("/login")}>
            🔐 Login
          </button>
        </div>
      </div>
    </div>
  );
}

// 🎨 Styles
const container = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  background: "linear-gradient(135deg, #e3f2fd, #f1f8e9)",
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
};

const card = {
  background: "#fff",
  padding: "40px 60px",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  textAlign: "center",
  width: "90%",
  maxWidth: "500px",
};

const subtitle = {
  color: "#555",
  fontSize: "16px",
  marginBottom: "25px",
};

const buttonGroup = {
  display: "flex",
  justifyContent: "center",
  gap: "20px",
};

const btn = {
  padding: "12px 25px",
  border: "none",
  borderRadius: "8px",
  color: "#fff",
  fontSize: "16px",
  cursor: "pointer",
  transition: "0.3s",
};

