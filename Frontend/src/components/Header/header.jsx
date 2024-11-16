import "./header.css";
import logo from "../../icons/Logo.jsx";
import cart from "../../icons/IconCart.jsx";
// import avatar from "../../assets/image-avatar.png";
import CartContext from "../../context/cart/CartContext.jsx";
import { useContext, useState } from "react";
import Cart from "../Cart/Cart.jsx";
import fabars from "../../icons/IconMenu.jsx";
import close from "../../icons/IconClose.jsx";

function Header() {
  const { productState } = useContext(CartContext);

  const [clicked, setClicked] = useState(false);

  const hamburgerMenu = () => {
    setClicked(!clicked);
  };

  const [showModal, setShowModal] = useState(false);

  return (
    <header className="header">
      <nav className="navbar">
        <div className="nav-left">
          <div className="hamburger" onClick={hamburgerMenu}>
            {clicked ? <img src={close} alt="" /> : <img src={fabars} alt="" />}
          </div>
          <img src={logo} alt="" />
          <ul className={clicked ? "nav-items" : "nav-items menu"}>
            <li className="nav-item">Collections</li>
            <li className="nav-item">Sunglasses</li>
            <li className="nav-item">Earrings</li>
            <li className="nav-item">Necklace</li>
            <li className="nav-item">Contact</li>
          </ul>
        </div>
        <div className="nav-right">
          <img
            onClick={() => setShowModal(!showModal)}
            className="nav-cart"
            src={cart}
            alt="cart"
          />
          {productState.cart.length === 0 ? (
            <span className="cart-item empty">{productState.cart}</span>
          ) : (
            <span className="cart-item">{productState.cart.length}</span>
          )}
          <img className="avatar" src={avatar} alt="" />
        </div>
      </nav>
      {showModal && <Cart />}
    </header>
  );
}

export default Header;
