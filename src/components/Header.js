import React from "react";
import logo from '../img/VectorLogoWi.svg';

function Header() {
  return (
    <header className="header">
      <img src={logo} alt="лого" className="logo logo_place_header" />
    </header>
  )
}

export default Header;