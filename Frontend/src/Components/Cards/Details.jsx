import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function Details() {
  // Example product data
  const product = {
    id: 1,
    category: "Sunglasses",
    productName: "Ray-Ban Justin",
    description: "Ray-Ban Justin Sunglasses may just be one of the coolest looks in the Ray-Ban collection.",
    currentPrice: 1200.0,
    originalPrice: 1500.0,
    discount: 20,
    imageUrl: "https://via.placeholder.com/400x300?text=Ray-Ban+Justin", // Replace with actual image URL
  };

  const navigate = useNavigate(); // For navigation
  const { id } = useParams(); // Extract product ID from route params

  // Function to handle Try Now button click
  const handleTryNow = () => {
    navigate(`/try-on/${product.id}`, { state: { imageUrl: product.imageUrl } });
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px',
        gap: '80px',
        maxWidth: '1200px',
        margin: '0 auto',
        backgroundColor: '#f9f9f9',
        borderRadius: '10px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* Left: Product Image */}
      <div
        style={{
          flex: '1',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img
          src={product.imageUrl}
          alt={product.productName}
          style={{
            maxWidth: '100%',
            maxHeight: '500px',
            objectFit: 'contain',
            boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
          }}
        />
      </div>

      {/* Right: White Box with Product Details */}
      <div
        style={{
          flex: '1.5',
          backgroundColor: '#fff',
          padding: '40px',
          textAlign: 'left',
          border: '2px solid #e3e3e3',
          borderRadius: '8px',
          boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h1 style={{ marginBottom: '20px', color: '#212529', fontSize: '32px', fontWeight: 'bold' }}>
          {product.productName}
        </h1>
        <p
          style={{
            color: '#495057',
            fontSize: '18px',
            lineHeight: '1.8',
            marginBottom: '20px',
          }}
        >
          {product.description}
        </p>
        <p style={{ fontWeight: 'bold', color: '#343a40', fontSize: '24px', marginBottom: '15px' }}>
          Rs. {product.currentPrice.toFixed(2)}{' '}
          <span
            style={{
              textDecoration: 'line-through',
              color: '#868e96',
              fontSize: '20px',
              marginLeft: '10px',
            }}
          >
            Rs. {product.originalPrice.toFixed(2)}
          </span>
        </p>
        <p style={{ color: '#28a745', fontWeight: 'bold', fontSize: '20px', marginBottom: '40px' }}>
          Discount: {product.discount}%
        </p>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '20px' }}>
          <button style={modernButtonStyle('#007bff')}>Add to Cart</button>
          <button
            style={modernButtonStyle('#17a2b8')}
            onClick={handleTryNow} // Try Now button click handler
          >
            Try Now
          </button>
          <button style={modernButtonStyle('#dc3545')}>Buy Now</button>
        </div>
      </div>
    </div>
  );
}

// Modern Button Styling
const modernButtonStyle = (backgroundColor) => ({
  padding: '15px 35px',
  border: 'none',
  color: '#fff',
  cursor: 'pointer',
  backgroundColor,
  fontWeight: 'bold',
  fontSize: '18px',
  textTransform: 'uppercase',
  borderRadius: '4px',
  transition: 'all 0.3s ease',
  boxShadow: '0 3px 6px rgba(0, 0, 0, 0.15)',
  flex: '1',
  textAlign: 'center',
});

export default Details;


