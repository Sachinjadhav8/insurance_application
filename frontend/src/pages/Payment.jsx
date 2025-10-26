import React, { useState, useEffect } from "react";

export default function Payment() {
  const [form, setForm] = useState({
    policyId: "",
    amount: "",
    method: "",
    mobile: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const userMobile = localStorage.getItem("userMobile");

  useEffect(() => {
    if (userMobile) {
      setForm((prev) => ({ ...prev, mobile: userMobile }));
    } else {
      setMessage("⚠️ Please login again to make a payment.");
    }
  }, [userMobile]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.policyId.trim()) {
      setMessage("⚠️ Policy ID or Policy Number is required.");
      return;
    }
    if (form.amount <= 0) {
      setMessage("⚠️ Please enter a valid amount greater than 0.");
      return;
    }
    if (!form.method) {
      setMessage("⚠️ Please select a payment method.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://13.234.122.128:8080/api/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "user-mobile": userMobile, // ✅ Required for backend linkage
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      console.log("Payment API Response:", data);

      if (res.ok && data.message?.includes("Payment successful")) {
        setMessage(
          `✅ Payment successful!\nTransaction ID: ${
            data.transactionId || "N/A"
          }\nAmount: ₹${data.amount || form.amount}\nStatus: ${
            data.status || "SUCCESS"
          }`
        );
        setForm({
          policyId: "",
          amount: "",
          method: "",
          mobile: userMobile,
        });
      } else {
        setMessage(data.message || "❌ Payment failed. Try again.");
      }
    } catch (err) {
      console.error("Payment Error:", err);
      setMessage("⚠️ Unable to connect to backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>💳 Make a Payment</h2>
        <p style={styles.subtitle}>
          Enter your <b>Policy ID</b> or <b>Policy Number</b> as shown in your
          policies.
        </p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>Policy ID / Policy Number:</label>
          <input
            name="policyId"
            placeholder="e.g. POL-2025-797B5E or 68fdcf2708003553f4b96556"
            value={form.policyId}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <label style={styles.label}>Amount (₹):</label>
          <input
            type="number"
            name="amount"
            placeholder="Enter amount"
            value={form.amount}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <label style={styles.label}>Payment Method:</label>
          <select
            name="method"
            value={form.method}
            onChange={handleChange}
            required
            style={styles.input}
          >
            <option value="">-- Select Payment Method --</option>
            <option value="Credit Card">💳 Credit Card</option>
            <option value="Debit Card">🏦 Debit Card</option>
            <option value="Net Banking">🌐 Net Banking</option>
            <option value="UPI">📱 UPI</option>
            <option value="Cash">💵 Cash</option>
          </select>

          <label style={styles.label}>Mobile (Auto-Filled):</label>
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
              backgroundColor: loading ? "#94a3b8" : "#2563eb",
            }}
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>
        </form>

        {message && (
          <p
            style={{
              marginTop: "20px",
              textAlign: "center",
              color: message.includes("✅") ? "#16a34a" : "#dc2626",
              whiteSpace: "pre-line",
              fontWeight: "bold",
              fontSize: "16px",
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
    background:
      "linear-gradient(135deg, #3b82f6 0%, #2563eb 50%, #1e3a8a 100%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },
  card: {
    width: "100%",
    maxWidth: "500px",
    background: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(10px)",
    borderRadius: "15px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
    padding: "30px 40px",
  },
  title: {
    textAlign: "center",
    color: "#1e3a8a",
    fontSize: "26px",
    marginBottom: "10px",
  },
  subtitle: {
    textAlign: "center",
    color: "#555",
    fontSize: "14px",
    marginBottom: "25px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    fontWeight: "bold",
    marginBottom: "5px",
    color: "#374151",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "15px",
    outline: "none",
    transition: "0.3s",
  },
  button: {
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
};

