import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // ✅ import navigation

export default function CreatePolicy() {
  const [form, setForm] = useState({
    policyType: "",
    coverageAmount: "",
    premium: "",
    premiumFrequency: "",
    startDate: "",
    endDate: "",
    holderName: "",
    holderDOB: "",
    mobile: "",
    email: "",
    nomineeName: "",
    nomineeRelation: "",
    createdByMobile: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // ✅ useNavigate hook

  useEffect(() => {
    const userMobile = localStorage.getItem("userMobile");
    if (userMobile) {
      setForm((prev) => ({
        ...prev,
        mobile: userMobile,
        createdByMobile: userMobile,
      }));
    }
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.coverageAmount <= 0 || form.premium <= 0) {
      setMessage("⚠️ Coverage and Premium must be positive values.");
      return;
    }
    if (!form.startDate || !form.endDate) {
      setMessage("⚠️ Please select valid start and end dates.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://13.234.122.128:8080/api/policies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "user-mobile": form.createdByMobile,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(
          `✅ Policy created successfully!\nPolicy ID: ${data.policyId}\nPolicy Number: ${data.policyNumber}`
        );

        const userMobile = localStorage.getItem("userMobile");
        setForm({
          policyType: "",
          coverageAmount: "",
          premium: "",
          premiumFrequency: "",
          startDate: "",
          endDate: "",
          holderName: "",
          holderDOB: "",
          mobile: userMobile || "",
          email: "",
          nomineeName: "",
          nomineeRelation: "",
          createdByMobile: userMobile || "",
        });
      } else {
        setMessage(data.message || "⚠️ Failed to create policy. Try again.");
      }
    } catch (err) {
      console.error("Error creating policy:", err);
      setMessage("❌ Unable to connect to backend server.");
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

        <h2 style={styles.title}>📝 Create New Policy</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          <label>Policy Type:</label>
          <select
            name="policyType"
            value={form.policyType}
            onChange={handleChange}
            required
            style={styles.input}
          >
            <option value="">-- Select Policy Type --</option>
            <option value="Health Insurance">Health Insurance</option>
            <option value="Life Insurance">Life Insurance</option>
            <option value="Car Insurance">Car Insurance</option>
            <option value="Bike Insurance">Bike Insurance</option>
            <option value="Home Insurance">Home Insurance</option>
            <option value="Travel Insurance">Travel Insurance</option>
            <option value="Term Insurance">Term Insurance</option>
            <option value="Accident Insurance">Accident Insurance</option>
            <option value="Business Insurance">Business Insurance</option>
          </select>

          <label>Premium Frequency:</label>
          <select
            name="premiumFrequency"
            value={form.premiumFrequency}
            onChange={handleChange}
            required
            style={styles.input}
          >
            <option value="">-- Select Frequency --</option>
            <option value="Monthly">Monthly</option>
            <option value="Quarterly">Quarterly</option>
            <option value="Half-Yearly">Half-Yearly</option>
            <option value="Annually">Annually</option>
          </select>

          <label>Coverage Amount:</label>
          <input
            type="number"
            name="coverageAmount"
            value={form.coverageAmount}
            onChange={handleChange}
            placeholder="e.g., 500000"
            required
            style={styles.input}
          />

          <label>Premium Amount:</label>
          <input
            type="number"
            name="premium"
            value={form.premium}
            onChange={handleChange}
            placeholder="e.g., 1200"
            required
            style={styles.input}
          />

          <label>Policy Start Date:</label>
          <input
            type="date"
            name="startDate"
            value={form.startDate}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <label>Policy End Date:</label>
          <input
            type="date"
            name="endDate"
            value={form.endDate}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <label>Holder Full Name:</label>
          <input
            name="holderName"
            value={form.holderName}
            onChange={handleChange}
            placeholder="e.g., Akshay Sharma"
            required
            style={styles.input}
          />

          <label>Email Address:</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="e.g., user@example.com"
            required
            style={styles.input}
          />

          <label>Nominee Name:</label>
          <input
            name="nomineeName"
            value={form.nomineeName}
            onChange={handleChange}
            placeholder="e.g., Riya Sharma"
            required
            style={styles.input}
          />

          <label>Nominee Relation:</label>
          <select
            name="nomineeRelation"
            value={form.nomineeRelation}
            onChange={handleChange}
            required
            style={styles.input}
          >
            <option value="">-- Select Relation --</option>
            <option value="Wife">Wife</option>
            <option value="Husband">Husband</option>
            <option value="Son">Son</option>
            <option value="Daughter">Daughter</option>
            <option value="Father">Father</option>
            <option value="Mother">Mother</option>
            <option value="Brother">Brother</option>
            <option value="Sister">Sister</option>
            <option value="Other">Other</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.button,
              backgroundColor: loading ? "#93c5fd" : "#2563eb",
            }}
          >
            {loading ? "Creating Policy..." : "Create Policy"}
          </button>
        </form>

        {message && (
          <p
            style={{
              marginTop: "20px",
              textAlign: "center",
              color: message.includes("✅") ? "green" : "red",
              fontWeight: "bold",
              whiteSpace: "pre-line",
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
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    padding: "40px",
    width: "90%",
    maxWidth: "750px",
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
  title: {
    textAlign: "center",
    color: "#1e3a8a",
    marginBottom: "25px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "8px 0 15px 0",
    borderRadius: "6px",
    border: "1px solid #ccc",
    background: "#f9fafb",
  },
  button: {
    width: "100%",
    padding: "12px",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
  },
};

