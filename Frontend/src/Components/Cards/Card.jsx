import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Card.css';

const Card = ({ 
  _id, 
  itemType, 
  itemName, 
  itemPrice, 
  stockQuantity, 
  displayImage 
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log(`Navigating to details of item: ${_id}`);
    navigate(`/details/${_id}`);
  };

  return (
    <div className="card" onClick={handleClick}>
      {console.log(_id,itemType,itemName,itemPrice)}
      <div className="card-image">
        <img src={displayImage || 'https://via.placeholder.com/150'} alt={itemName || 'Product'} />
        {stockQuantity === 0 && (
          <div className="out-of-stock-badge">Out of Stock</div>
        )}
      </div>
      <div className="card-content">
        <span className="item-type">{itemType || 'Unknown Type'}</span>
        <h3 className="item-name">{itemName || 'Unnamed Product'}</h3>
        <div className="price-section">
          <span className="current-price">
            ${itemPrice ? itemPrice.toFixed(2) : 'N/A'}
          </span>
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
