import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import PolicyList from "./pages/PolicyList";
import CreatePolicy from "./pages/CreatePolicy";
import Claim from "./pages/Claim";
import Payment from "./pages/Payment";
import { AuthContext } from "./context/AuthContext";

export default function App() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Routes>
      {/* Public routes */}
      {!isAuthenticated && (
        <>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </>
      )}

      {/* Private routes */}
      {isAuthenticated && (
        <>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/policies" element={<PolicyList />} />
          <Route path="/create-policy" element={<CreatePolicy />} />
          <Route path="/claim" element={<Claim />} />
          <Route path="/payment" element={<Payment />} />
        </>
      )}

      {/* Default fallback */}
      <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} />} />
    </Routes>
  );
}

