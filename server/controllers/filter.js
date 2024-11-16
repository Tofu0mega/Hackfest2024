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

// Get all unique categories
const categories = [...new Set(products.map(product => product.category))];

// Endpoint to get all products with optional category filter
app.get('/api/products', (req, res) => {
  try {
    const { category } = req.query;
    let filteredProducts = products;

    if (category && category !== 'all') {
      const lowercaseCategory = category.toLowerCase();
      filteredProducts = products.filter(product => 
        product.category.toLowerCase() === lowercaseCategory
      );
    }

    // Prepare response object
    const response = {
      products: filteredProducts,
      categories: ['all', ...categories],
      currentCategory: category || 'all'
    };

    res.json(response);
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// Test the endpoint
const testEndpoint = async () => {
  try {
    // Test without category (all products)
    let response = await fetch('http://localhost:3000/api/products');
    let data = await response.json();
    console.log('All products response:', data);

    // Test with category filter
    response = await fetch('http://localhost:3000/api/products?category=clothing');
    data = await response.json();
    console.log('Clothing products response:', data);

  } catch (error) {
    console.error('Error testing endpoint:', error);
  }
};

testEndpoint();