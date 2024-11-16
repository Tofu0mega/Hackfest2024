import React, { useEffect, useState } from "react";
import Card from "../Components/Cards/Card";
import "./ProductListing.css";

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch product data from backend
    fetch("http://localhost:3000/product")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data:", data); // Log the fetched data
        setProducts(data.slice(0, 10)); // Set the state with the top 10 products
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (products.length === 0) return <p>No products available.</p>;

  return (
    <div className="scroller-container">
      <div className="horizontal-scroller">
        {products.map((product) => (
          <Card
            key={product._id} // Using _id as the unique identifier
            _id={product._id} // Product ID
            itemType={product.itemType} // Category of the product
            itemName={product.itemName} // Product name
            itemPrice={product.itemPrice} // Current price of the product
            stockQuantity={product.stockQuantity || 0} // Stock quantity
            displayImage={product.displayImage} // Image URL for the product
          />
        ))}
      </div>
    </div>
  );
};

export default ProductListing;
