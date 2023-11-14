import React, { createContext, useContext, useState , useEffect} from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // const [accessToken, setAccessToken] = useState(() => {
  //   return localStorage.getItem("accessToken") || null;
  // });
  const [accessToken, setAccessToken] = useState('');
  // useEffect(() => {
  //   localStorage.setItem("accessToken", accessToken);
  // }, [accessToken]);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    // if (token) {
      setAccessToken(token);
    //}
  }, []);

  // const setToken = (token) => {
  //   setAccessToken(token);
  // };

  // const [accessToken, setAccessToken] = useState(null);

  const logout = () => {
    setAccessToken(null);
    localStorage.removeItem("accessToken");
  };

  // useEffect(() => {
  //   const token = localStorage.getItem('accessToken');
  //   // if (token) {
  //     setAccessToken(token);
  //   //}
  // }, []);

  const isAuthenticated = !!accessToken;

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
