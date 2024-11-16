import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Simulated database
const products = [
  { id: 1, name: "T-Shirt", category: "clothing", price: 19.99 },
  { id: 2, name: "Jeans", category: "clothing", price: 49.99 },
  { id: 3, name: "Sneakers", category: "shoes", price: 79.99 },
  { id: 4, name: "Watch", category: "accessories", price: 129.99 },
  { id: 5, name: "Sunglasses", category: "accessories", price: 39.99 },
];

// Endpoint to get all products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// Endpoint to filter products by category
app.get('/api/products/category/:category', (req, res) => {
  const category = req.params.category.toLowerCase();
  const filteredProducts = products.filter(product => product.category.toLowerCase() === category);
  
  if (filteredProducts.length === 0) {
    return res.status(404).json({ message: "No products found in this category" });
  }
  
  res.json(filteredProducts);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});