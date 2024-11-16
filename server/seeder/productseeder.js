// seeder.js
import mongoose from 'mongoose';
import Product from '../models/product.js'; // Adjust the path if needed
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const seedProducts = async () => {
    try {
        // Connect to the MongoDB database
        await mongoose.connect("mongodb://localhost:27017/VCR", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        // Clear existing products (optional)
        await Product.deleteMany();

        // Helper function to generate random numbers within a range
        const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

        // Helper function to generate random gibberish descriptions
        const generateRandomDescription = (length = 20) => {
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz ';
            let description = '';
            for (let i = 0; i < length; i++) {
                description += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return description.trim();
        };

        // Product data generation
        const types = ['Glassware', 'Necklace', 'Earring'];
        const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
        const products = [];

        for (let i = 1; i <= 100; i++) {
            const product = {
                itemName: `Sample Product ${i}`,
                itemType: types[getRandomNumber(0, types.length - 1)],
                itemSize: sizes[getRandomNumber(0, sizes.length - 1)],
                itemPrice: parseFloat((getRandomNumber(5, 500) + Math.random()).toFixed(2)), // Random price between 5 and 500
                stockQuantity: getRandomNumber(1, 100),
                displayImage: `productImage${i}`,
                filterImage: `filterImage${i}`,
                description: generateRandomDescription(50) // Generates a 50-character gibberish description
            };
            products.push(product);
        }

        // Insert the generated data into the database
        await Product.insertMany(products);

        console.log('100 Products have been successfully seeded.');
        process.exit();
    } catch (e) {
        console.error('Error seeding products:', e);
        process.exit(1);
    }
};

seedProducts();
