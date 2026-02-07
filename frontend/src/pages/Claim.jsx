import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const API_BASE = import.meta.env.VITE_API_BASE;

export default function Claim() {
  const [form, setForm] = useState({
    policyId: "",
    claimType: "",
    claimAmount: "",
    description: "",
    accountHolderName: "",
    bankName: "",
    bankAccountNumber: "",
    ifscCode: "",
    mobile: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [userMobile, setUserMobile] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const mobile = localStorage.getItem("userMobile");
    if (mobile) {
      setUserMobile(mobile);
      setForm((prev) => ({ ...prev, mobile }));
    } else {
      setMessage("⚠️ Please login again to submit a claim.");
    }
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.policyId.trim()) {
      setMessage("⚠️ Policy ID or Number is required.");
      return;
    }
    if (form.claimAmount <= 0) {
      setMessage("⚠️ Claim amount must be greater than 0.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`${API_BASE}/api/claims`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "user-mobile": userMobile,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok && data.message?.includes("Claim created successfully")) {
        setMessage(
          `✅ Claim submitted successfully!\nClaim ID: ${data.claimId}\nStatus: ${data.status}`
        );
        setForm({
          policyId: "",
          claimType: "",
          claimAmount: "",
          description: "",
          accountHolderName: "",
          bankName: "",
          bankAccountNumber: "",
          ifscCode: "",
          mobile: userMobile,
        });
      } else {
        setMessage(data.message || "❌ Failed to create claim. Try again.");
      }
    } catch (err) {
      console.error("Error submitting claim:", err);
      setMessage("⚠️ Unable to connect to backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        {/* 🔙 Back Button */}
        <button style={styles.backButton} onClick={() => navigate("/dashboard")}>
          ← Back to Dashboard
        </button>

        <h2 style={styles.heading}>💰 File a Claim</h2>
        <p style={styles.subtext}>
          Enter your <b>Policy ID</b> or <b>Policy Number</b> exactly as shown
          in your policies.
        </p>

        <form onSubmit={handleSubmit}>
          <label>Policy ID / Policy Number:</label>
          <input
            name="policyId"
            placeholder="e.g. POL-2025-ABC123"
            value={form.policyId}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <label>Claim Type:</label>
          <select
            name="claimType"
            value={form.claimType}
            onChange={handleChange}
            required
            style={styles.input}
          >
            <option value="">-- Select Type --</option>
            <option value="Health">Health</option>
            <option value="Accident">Accident</option>
            <option value="Vehicle">Vehicle</option>
            <option value="Life">Life</option>
            <option value="Property">Property</option>
          </select>

          <label>Claim Amount:</label>
          <input
            type="number"
            name="claimAmount"
            placeholder="Enter amount"
            value={form.claimAmount}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <label>Description:</label>
          <textarea
            name="description"
            placeholder="Describe your claim"
            value={form.description}
            onChange={handleChange}
            required
            style={styles.textarea}
          />

          <h3 style={styles.bankHeading}>🏦 Bank Account Details</h3>

          <input
            name="accountHolderName"
            placeholder="Account Holder Name"
            value={form.accountHolderName}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            name="bankName"
            placeholder="Bank Name"
            value={form.bankName}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            name="bankAccountNumber"
            placeholder="Account Number"
            value={form.bankAccountNumber}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            name="ifscCode"
            placeholder="IFSC Code"
            value={form.ifscCode}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <label>Mobile (Auto-Filled):</label>
          <input
            name="mobile"
            value={form.mobile}
            readOnly
            style={{
              ...styles.input,
              backgroundColor: "#f3f4f6",
              cursor: "not-allowed",
            }}
          />

          <button
            type="submit"
            disabled={loading || !userMobile}
            style={{
              ...styles.button,
              backgroundColor: loading ? "#93c5fd" : "#2563eb",
            }}
          >
            {loading ? "Submitting..." : "Submit Claim"}
          </button>
        </form>

        {message && (
          <p
            style={{
              marginTop: "15px",
              color: message.includes("✅") ? "green" : "red",
              whiteSpace: "pre-line",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

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
    padding: "35px 40px",
    width: "90%",
    maxWidth: "700px",
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
    marginBottom: "10px",
  },
  subtext: {
    textAlign: "center",
    color: "#555",
    marginBottom: "25px",
    fontSize: "14px",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "15px",
    background: "#f9fafb",
  },
  textarea: {
    width: "100%",
    height: "80px",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "15px",
    background: "#f9fafb",
    resize: "vertical",
  },
  button: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  bankHeading: {
    color: "#007bff",
    marginTop: "10px",
    marginBottom: "15px",
  },
};

