import React, { createContext, useState, useContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Cargar usuario desde localStorage al iniciar
  useEffect(() => {
    const savedUser = localStorage.getItem("kanban_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Guardar usuario en localStorage cuando cambia
  useEffect(() => {
    if (user) {
      localStorage.setItem("kanban_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("kanban_user");
    }
  }, [user]);

  const login = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    const userData = {
      name: decoded.name,
      email: decoded.email,
      picture: decoded.picture,
      token: credentialResponse.credential,
    };
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
