import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
const ApiContext = createContext();
export const ApiProvider = ({ children }) => {
  const { accessToken, logout } = useAuth();
  const [userData, setUserData] = useState(null);
  console.log("accesstoken", accessToken);
  const fetchUserProfile = async () => {
    if (accessToken) {
      try {
        const response = await fetch("http://localhost:3000/api/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            accessToken: accessToken,
          },
        });

        const data = await response.json();

        if (data.success) {
          setUserData(data.data);
          console.log("profile", data.data);
        } else {
          console.error("API Error:", data.message);
        }
      } catch (error) {
        console.error("Network Error:", error.message);
      }
    }
  };
  useEffect(() => {
    fetchUserProfile();
  }, [accessToken]);

  return (
    <ApiContext.Provider value={{ userData, fetchUserProfile }}>
      {children}
    </ApiContext.Provider>
  );
};
export const useApi = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error("useApi must be used within an ApiProvider");
  }
  return context;
};
