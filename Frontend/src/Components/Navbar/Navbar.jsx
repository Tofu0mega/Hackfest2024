import React, { useState } from "react";
import "./Navbar.css";
import cartIcon from "../assets/Frontend_Assets/cart_icon.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false); // Track hamburger menu state

  return (
    <div className="navbar">
      {/* Hamburger Menu */}
      <button
        className="hamburger"
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label="Toggle Menu"
      >
        ☰
      </button>

      {/* Navigation Menu */}
      <ul className={`nav-menu ${menuOpen ? "show" : ""}`}>
        <li>
          <Link to="/" onClick={() => setMenuOpen(false)}>
            Virtual Changing Room
          </Link>
        </li>
        <li>
          <Link to="/Sunglasses" onClick={() => setMenuOpen(false)}>
            Sunglasses
          </Link>
        </li>
        <li>
          <Link to="/Earrings" onClick={() => setMenuOpen(false)}>
            Earrings
          </Link>
        </li>
        <li>
          <Link to="/Necklace" onClick={() => setMenuOpen(false)}>
            Necklace
          </Link>
        </li>
      </ul>

      {/* Login and Cart Section */}
      <div className="nav-login-cart">
        <Link to="/login">
          <button>Login</button>
        </Link>
        <Link to="/cart">
          <img
            src={cartIcon}
            alt="Cart"
            style={{ width: "40px", height: "40px", objectFit: "cover" }}
          />
        </Link>
        <div className="nav-cart-count">0</div>
      </div>
    </div>
  );
};

export default Navbar;
