import React, { useState } from "react";
import "./Navbar.css";
import cartIcon from "../assets/Frontend_Assets/cart_icon.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menu, setMenu] = useState(""); // Track active menu

  return (
    <div className="navbar">
      <p>VIRTUAL CHANGING ROOM</p>

      <ul className="nav-menu">
        <li
          className={menu === "try" ? "active" : ""}
          onClick={() => setMenu("try")}
        >
          <Link to="/">virtualChangingRoom</Link>
        </li>
        <li
          className={menu === "Sunglasses" ? "active" : ""}
          onClick={() => setMenu("Sunglasses")}
        >
          <Link to="/Sunglasses">Sunglasses</Link>
        </li>
        <li
          className={menu === "Earrings" ? "active" : ""}
          onClick={() => setMenu("Earrings")}
        >
          <Link to="/Earrings">Earrings</Link>
        </li>
        <li
          className={menu === "Necklace" ? "active" : ""}
          onClick={() => setMenu("Necklace")}
        >
          <Link to="/Necklace">Necklace</Link>
        </li>
      </ul>

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