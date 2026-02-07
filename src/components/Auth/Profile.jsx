import React from "react";
import { useAuth } from "../../../AuthContext";

const Profile = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <div className="profile">
        <button
          onClick={() => window.google.accounts.id.prompt()}
          className="login-btn"
        >
          Iniciar sesión con Google
        </button>
      </div>
    );
  }

  return (
    <div className="profile">
      <img
        src={user.picture}
        alt={user.name}
        className="profile-pic"
        width="40"
        height="40"
      />
      <span className="profile-name">{user.name}</span>
      <button onClick={logout} className="logout-btn">
        Cerrar sesión
      </button>
    </div>
  );
};

export default Profile;
