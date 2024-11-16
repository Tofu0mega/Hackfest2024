import React from 'react';
import Card from './Card';
import { useParams } from 'react-router-dom';

function Details() {
    const product = 
        {
          id: 1,
          category: "Laptops",
          productName: "Dell XPS 15",
          currentPrice: 1200.0,
          originalPrice: 1500.0,
          discount: 20,
          imageUrl: "https://via.placeholder.com/250x150?text=Dell+XPS+15"
        }
      
  const { id } = useParams(); // Extract the product ID from the route parameters.

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Product Details</h1>
      <p>Product ID: {product.id}</p>
      <p>Product Discount:{product.discount}</p>
    
      {/* Add more details about the product here based on the ID */}
    </div>
  );
}

export default Details;
