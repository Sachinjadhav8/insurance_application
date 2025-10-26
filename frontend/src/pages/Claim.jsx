import React, { useState, useEffect } from "react";

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

  // ✅ Load logged-in user mobile
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
      const res = await fetch("http://13.234.122.128:8080/api/claims", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "user-mobile": userMobile, // ✅ backend expects this header
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      console.log("Claim API response:", data);

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
    <div style={styles.container}>
      <h2 style={styles.heading}>💰 File a Claim</h2>
      <p style={{ color: "#555" }}>
        Enter your <b>Policy ID</b> or <b>Policy Number</b> exactly as shown on
        your Policies page.
      </p>

      <form onSubmit={handleSubmit}>
        <label>Policy ID / Policy Number:</label>
        <input
          name="policyId"
          placeholder="e.g. POL-2025-797B5E or 68fdcf2708003553f4b96556"
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
          placeholder="Describe the reason for your claim"
          value={form.description}
          onChange={handleChange}
          required
          style={styles.textarea}
        />

        <h3 style={{ color: "#007bff" }}>🏦 Bank Account Details</h3>
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
          style={{ ...styles.input, backgroundColor: "#f5f5f5" }}
        />

        <button
          type="submit"
          disabled={loading || !userMobile}
          style={{
            ...styles.button,
            backgroundColor: loading ? "#999" : "#007bff",
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
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "650px",
    margin: "40px auto",
    padding: "25px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    background: "#fff",
    boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
  },
  heading: {
    textAlign: "center",
    marginBottom: "15px",
    color: "#333",
  },
  input: {
    display: "block",
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    border: "1px solid #ccc",
    borderRadius: "6px",
  },
  textarea: {
    display: "block",
    width: "100%",
    height: "80px",
    padding: "10px",
    margin: "10px 0",
    border: "1px solid #ccc",
    borderRadius: "6px",
    resize: "vertical",
  },
  button: {
    width: "100%",
    padding: "12px",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
  },
};

