import React, { useEffect, useState } from "react";
import Card from "../Components/Cards/Card";

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Fetch product data from backend
//     fetch("https://your-backend-url.com/api/products")
//       .then((response) => response.json())
//       .then((data) => {
//         setProducts(data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching product data:", error);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return <p>Loading products...</p>;
//   if (products.length === 0) return <p>No products available.</p>;

  return (
    <div className="card-container">
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
  );
};

export default ProductListing;
