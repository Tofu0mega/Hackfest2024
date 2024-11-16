import mongoose from "mongoose";
import Product from "./path/to/your/ProductModel.js"; // Adjust the path as needed

// Connect to your MongoDB database
mongoose.connect("your_connection_string_here", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedProducts = async () => {
  const products = [
    {
      itemName: "Crystal Wine Glass",
      itemType: "Glassware",
      itemSize: "Medium",
      itemPrice: 25.99,
      stockQuantity: 100,
      displayImage: "wine_glass.jpg",
      filterImage: "wine_glass_filter.jpg",
    },
    {
      itemName: "Gold Pendant Necklace",
      itemType: "Necklace",
      itemSize: "Adjustable",
      itemPrice: 150.0,
      stockQuantity: 50,
      displayImage: "gold_necklace.jpg",
      filterImage: "gold_necklace_filter.jpg",
    },
    // Add more product objects here as needed
  ];

  for (const productData of products) {
    try {
      const product = new Product(productData);
      await product.save();
      console.log(`Product ${product.itemName} added successfully!`);
    } catch (error) {
      console.error(`Error adding product ${productData.itemName}:`, error);
    }
  }

  // Close the database connection
  mongoose.connection.close();
};

// Execute the seed function
seedProducts();
