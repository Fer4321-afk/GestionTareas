import React from "react";
import Profile from "./Auth/Profile";

const Header = () => {
  return (
    <header className="header">
      <h1>Kanban Board</h1>
      <Profile />
    </header>
  );
};

export default Header;
