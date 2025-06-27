"use client";

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const tokenGet = localStorage.getItem("token");
    setToken(tokenGet);
    setIsAuthenticated(!!tokenGet);
    setLoading(false);
  }, []);

  const login = (jwt) => {
    localStorage.setItem("token", jwt);
    setToken(jwt);
    setIsAuthenticated(!!tokenGet);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, isAuthenticated, setIsAuthenticated, loading  }}>
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth() {
  return useContext(AuthContext);
}
// export const useAuth = () => useContext(AuthContext);
