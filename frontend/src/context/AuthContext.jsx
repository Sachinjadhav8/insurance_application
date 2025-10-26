import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [authHeader, setAuthHeader] = useState("");
  const [mobile, setMobile] = useState(""); // ✅ store logged-in user mobile

  // ✅ Restore login session from localStorage
  useEffect(() => {
    const storedAuth = localStorage.getItem("isAuthenticated");
    const storedHeader = localStorage.getItem("authHeader");
    const storedMobile = localStorage.getItem("mobile");

    if (storedAuth === "true" && storedHeader && storedMobile) {
      setAuthenticated(true);
      setAuthHeader(storedHeader);
      setMobile(storedMobile);
    }
  }, []);

  // ✅ Login and persist user data
  const login = (username, password) => {
    const header = "Basic " + btoa(`${username}:${password}`);
    setAuthHeader(header);
    setAuthenticated(true);
    setMobile(username);

    // persist login
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("authHeader", header);
    localStorage.setItem("mobile", username);
  };

  // ✅ Logout and clear data
  const logout = () => {
    setAuthenticated(false);
    setAuthHeader("");
    setMobile("");

    // clear from storage
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("authHeader");
    localStorage.removeItem("mobile");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        authHeader,
        mobile, // ✅ export mobile so it can be used in API headers
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

