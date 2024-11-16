import "./productdetail.css";
import { useContext } from "react";
import minus from "../../icons/IconMinus.jsx";
import plus from "../../icons/IconPlus.jsx";
import cart from "../../icons/IconCart.jsx";
import CartContext from "../../context/cart/CartContext.jsx";

function ProductDetail() {
  const { productState, addToCart, count, setCount } = useContext(CartContext);

  return productState.productList.map((product) => (
    <div key={product.id} className="detail-container">
      <div className="detail-content">
        <div>
          <h4>Virtual try-out</h4>
          <h1>{product.title}</h1>
          <p>{product.description}</p>
          <div className="price">
            <h2>${product.price}</h2>
            <h4 className="discount">{product.discount_percentage}%</h4>
            <br />
            <span className="total-price">${product.initial_value}</span>
          </div>
          <div className="count-cart">
            <div className="count">
              <img
                onClick={() => setCount(count - 1 <= 1 ? 1 : count - 1)}
                src={minus}
                alt=""
              />
              <span>{count}</span>
              <img onClick={() => setCount(count + 1)} src={plus} alt="" />
            </div>
            <div className="addcart">
              <button
                className="cart"
                onClick={() => addToCart(product, count)}
              >
                <img src={cart} alt="" />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ));
}

export default ProductDetail;
