import React from "react";
import NavBar from "../navbar/NavBar"; // Importing the NavBar component
import "./Header.css"; // Importing the Header.css file

function Header() {
  return (
    <header className="header">
      <NavBar /> {/* Including NavBar inside a container div */}
    </header>
  );
}

export default Header;