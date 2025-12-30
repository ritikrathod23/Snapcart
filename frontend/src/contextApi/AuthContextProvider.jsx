// context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await axios.get(`${API_URL}/verify`, {
        withCredentials: true,
      });

      setUser(response.data.user);

      // Store user only (no token)
      localStorage.setItem("user", JSON.stringify(response.data.user));

    } catch (err) {
      console.error("Auth failed:", err.message);
      localStorage.removeItem("user");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    setUser,
    user,
    loading,
    isAuthenticated: !!user,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
