import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function Details() {
  const [product, setProduct] = useState(null); // Use state to store the product data
  const navigate = useNavigate(); // For navigation
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3000/product/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data:", data); // Log the fetched data
        setProduct(data); // Update state with fetched data
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
      });
  }, [id]);

  // Function to handle Try Now button click
  const handleTryNow = () => {
    if (product) {
      navigate(`/try-on/${product._id}`, { state: { imageUrl: product.imageUrl } });
    }
  };

  // Render loading state while fetching product data
  if (!product) {
    return <div>Loading...</div>;
  }

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
          src={product.displayImage}
          alt={product.itemName}
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
          {product.itemName}
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
          Rs. {product.itemPrice.toFixed(2)}
          <span
            style={{
              textDecoration: 'line-through',
              color: '#868e96',
              fontSize: '20px',
              marginLeft: '10px',
            }}
          >
            Rs. {product.itemPrice.toFixed(2)}
          </span>
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
