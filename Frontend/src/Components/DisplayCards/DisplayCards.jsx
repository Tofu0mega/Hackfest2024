import React from 'react'
import Card from '../Cards/Card';
export default function DisplayCard() {
    const products = [
        {
          id: 1,
          category: "Laptops",
          productName: "Dell XPS 15",
          currentPrice: 1200.0,
          originalPrice: 1500.0,
          discount: 20,
          imageUrl: "https://via.placeholder.com/250x150?text=Dell+XPS+15"
        },
        {
          id: 2,
          category: "Smartphones",
          productName: "iPhone 14",
          currentPrice: 999.99,
          originalPrice: 1099.99,
          discount: 10,
          imageUrl: "https://via.placeholder.com/250x150?text=iPhone+14"
        },
        {
          id: 3,
          category: "Accessories",
          productName: "Noise-Canceling Headphones",
          currentPrice: 299.0,
          originalPrice: 399.0,
          discount: 25,
          imageUrl: "https://via.placeholder.com/250x150?text=Headphones"
        },
        {
          id: 4,
          category: "Tablets",
          productName: "iPad Pro",
          currentPrice: 850.0,
          originalPrice: 1000.0,
          discount: 15,
          imageUrl: "https://via.placeholder.com/250x150?text=iPad+Pro"
        },
        {
          id: 5,
          category: "Smartwatches",
          productName: "Samsung Galaxy Watch",
          currentPrice: 199.99,
          originalPrice: 299.99,
          discount: 30,
          imageUrl: "https://via.placeholder.com/250x150?text=Galaxy+Watch"
        }
      ];
  return (
    <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '20px',
            justifyContent: 'center',
            padding: '20px'
          }}
        >
          {products.map((product) => (
            <Card
              key={product.id}
              id={product.id}
              category={product.category}
              productName={product.productName}
              currentPrice={product.currentPrice}
              originalPrice={product.originalPrice}
              discount={product.discount}
              imageUrl={product.imageUrl}
            />
          ))}
        </div>
  )
}
