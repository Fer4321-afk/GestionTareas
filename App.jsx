import React, { useEffect } from "react";
import { AuthProvider, useAuth } from "./src/components/Auth/AuthContext";

// Componente para manejar la autenticación
const AuthInitializer = () => {
  const { login } = useAuth();

  useEffect(() => {
    // Configurar Google One Tap
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id:
          "886689481017-tg0g07g8pmobauhna48o6mp6ch493357.apps.googleusercontent.com", // Reemplaza con tu Client ID
        callback: login,
        auto_select: true,
        cancel_on_tap_outside: false,
      });

      window.google.accounts.id.prompt();
    }
  }, [login]);

  return null;
};

// Componente principal de la app
function AppContent() {
  const { user } = useAuth();

  return (
    <div className="App">
      <AuthInitializer />
      {/* Tu aplicación aquí */}
    </div>
  );
}

// App principal envuelta en AuthProvider
function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
