import React from "react";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="login-required">
        <h2>Por favor, inicia sesión</h2>
        <p>Necesitas iniciar sesión para acceder al tablero Kanban</p>
        <button onClick={() => window.google.accounts.id.prompt()}>
          Iniciar sesión con Google
        </button>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
