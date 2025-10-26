import React, { useEffect, useState } from "react";

export default function PolicyList() {
  const [policies, setPolicies] = useState([]);
  const [message, setMessage] = useState("Loading policies...");

  useEffect(() => {
    const userMobile = localStorage.getItem("userMobile");

    if (!userMobile) {
      setMessage("⚠️ Please log in again to view your policies.");
      return;
    }

    fetch("http://13.234.122.128:8080/api/policies", {
      headers: {
        "Content-Type": "application/json",
        "user-mobile": userMobile, // ✅ Backend filter
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
    <div style={styles.container}>
      <h2 style={styles.heading}>📄 My Policies</h2>

      {message && (
        <p style={{ textAlign: "center", color: "#666", fontWeight: 500 }}>
          {message}
        </p>
      )}

      <div style={styles.grid}>
        {policies.map((p) => (
          <div key={p.id || p._id} style={styles.card}>
            <h3 style={{ color: "#007bff" }}>{p.policyType}</h3>
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
  );
}

const styles = {
  container: {
    maxWidth: "1100px",
    margin: "auto",
    padding: "2rem",
    backgroundColor: "#fff",
    borderRadius: "10px",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "20px",
  },
  card: {
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    boxShadow: "0 3px 8px rgba(0,0,0,0.1)",
    backgroundColor: "#fafafa",
  },
};

