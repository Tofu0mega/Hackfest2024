import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Card.css'; // Ensure you add styles here or use inline styles

const Card = ({ id,category, productName, currentPrice, originalPrice, discount, imageUrl }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log("Hello")
    navigate(`/details/${id}`);
  };
  return (
    <div className ="card" onClick={handleClick}>

      <div className="card-image">
        <img src={imageUrl} alt={productName} />
        {discount && (
          <div className="discount-badge">
            -{discount}%
          </div>
        )}
      </div>
      <div className="card-content">
        <span className="category">{category}</span>
        <h3 className="product-name">{productName}</h3>
        <div className="price-section">
          <span className="current-price">${currentPrice.toFixed(2)}</span>
          <span className="original-price">${originalPrice.toFixed(2)}</span>
        </div>
      </div>
      <div className="card-actions">
        <button className="icon-btn">❤</button>
        <button className="icon-btn">🛒</button>
        <button className="icon-btn">ℹ️</button>
      </div>
    
    </div>
  );
};

export default Card;
