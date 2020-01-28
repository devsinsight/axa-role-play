import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../../assets/images/axa-travel.jpg";

const NavBar = () => {
  return (
    <nav className="navbar">
      <img src={logo} className="logo" alt="AXA Travel" />
      <strong>AXA Travel</strong>
      <ul className="navbar__links">
        <li>
          <NavLink to="/town">Town</NavLink>
        </li>
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
