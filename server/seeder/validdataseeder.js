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
      itemName: "Radiant Flower Stud Earrings",
      itemType: "Earrings",
      itemSize: "Small",
      itemPrice: 85.99,
      stockQuantity: 120,
      displayImage: "radiant_flower_stud.jpg",
      filterImage: "radiant_flower_stud_filter.jpg",
      description: "These elegant Radiant Flower Stud Earrings are crafted with a gold-tone finish and adorned with sparkling crystals. Their intricate floral design adds a delicate touch to any outfit, making them perfect for both casual and formal occasions. Lightweight and comfortable, they are ideal for all-day wear. The versatile design ensures they pair effortlessly with other jewelry. A thoughtful gift for loved ones, these earrings are a timeless addition to any accessory collection, providing charm and sophistication with every wear. Whether dressing up or down, these studs are a must-have staple for jewelry enthusiasts."
    },
    {
      itemName: "Teardrop Crystal Drop Earrings",
      itemType: "Earrings",
      itemSize: "Medium",
      itemPrice: 99.99,
      stockQuantity: 80,
      displayImage: "teardrop_crystal_drop.jpg",
      filterImage: "teardrop_crystal_drop_filter.jpg",
      description: "Teardrop Crystal Drop Earrings offer a blend of elegance and modern style. Featuring a crystal-studded stud paired with a gold teardrop pendant, these earrings are designed to catch the light beautifully. Perfect for evening events, date nights, or formal gatherings, they exude sophistication while maintaining subtle charm. The adjustable fit ensures comfort, making them suitable for prolonged wear. Crafted with precision, these earrings make a stunning gift for special occasions like anniversaries or birthdays. Add a touch of glamour to your jewelry collection with these versatile and dazzling drop earrings."
    },
    {
      itemName: "Celestial Star Dangle Earrings",
      itemType: "Earrings",
      itemSize: "Medium",
      itemPrice: 89.99,
      stockQuantity: 90,
      displayImage: "celestial_star_dangle.jpg",
      filterImage: "celestial_star_dangle_filter.jpg",
      description: "Celestial Star Dangle Earrings are a tribute to the beauty of the night sky. These silver-tone earrings feature a delicate star charm suspended from a shimmering chain. Lightweight and stylish, they are perfect for adding a whimsical yet elegant touch to any outfit. Ideal for casual outings or festive events, these earrings are a wonderful gift for dreamers and stargazers. Their intricate craftsmanship ensures durability, while the versatile design complements various looks. Elevate your accessory game with these celestial-inspired earrings, blending modern style with timeless charm."
    },
    {
      itemName: "Crystal Cross Stud Earrings",
      itemType: "Earrings",
      itemSize: "Small",
      itemPrice: 95.99,
      stockQuantity: 100,
      displayImage: "crystal_cross_stud.jpg",
      filterImage: "crystal_cross_stud_filter.jpg",
      description: "Crystal Cross Stud Earrings are an embodiment of grace and elegance. Featuring a cross-shaped design adorned with sparkling crystals, these earrings are both timeless and versatile. They are ideal for religious occasions or as a meaningful fashion statement. The lightweight build ensures comfort for daily wear, while the intricate detailing showcases superior craftsmanship. These earrings make a thoughtful gift for birthdays, confirmations, or holidays. Pair them with casual or formal attire to add a subtle yet striking touch to your ensemble. A true classic, these studs are a must-have in every jewelry collection."
    },
    {
      itemName: "Golden Cross Drop Earrings",
      itemType: "Earrings",
      itemSize: "Medium",
      itemPrice: 105.99,
      stockQuantity: 70,
      displayImage: "golden_cross_drop.jpg",
      filterImage: "golden_cross_drop_filter.jpg",
      description: "Golden Cross Drop Earrings combine spiritual symbolism with modern elegance. Crafted from gold-tone metal and embellished with crystals, these earrings feature a delicate chain design for a chic and graceful look. Perfect for formal events, religious ceremonies, or casual outings, they exude sophistication and charm. The lightweight structure ensures comfortable wear throughout the day. A thoughtful gift for loved ones, these earrings make a meaningful addition to any accessory collection. Their versatile design allows for pairing with various outfits, adding a hint of luxury and spirituality to your style."
    },
    {
      itemName: "Halo Diamond Stud Earrings",
      itemType: "Earrings",
      itemSize: "Small",
      itemPrice: 115.99,
      stockQuantity: 60,
      displayImage: "halo_diamond_stud.jpg",
      filterImage: "halo_diamond_stud_filter.jpg",
      description: "Halo Diamond Stud Earrings feature a radiant centerpiece surrounded by smaller sparkling stones, offering a timeless and luxurious design. Perfect for weddings, formal events, or as an everyday statement piece, these earrings bring elegance to any outfit. Their lightweight and secure fit ensure comfort and durability. A classic gift for anniversaries, birthdays, or special milestones, these studs symbolize sophistication and style. Meticulously crafted, they enhance your natural beauty while making a lasting impression. Add these versatile earrings to your collection for a touch of glamour and refinement."
    },
    {
      itemName: "Pearl Saturn Orbit Earrings",
      itemType: "Earrings",
      itemSize: "Medium",
      itemPrice: 129.99,
      stockQuantity: 50,
      displayImage: "pearl_saturn_orbit.jpg",
      filterImage: "pearl_saturn_orbit_filter.jpg",
      description: "Pearl Saturn Orbit Earrings are a unique fusion of elegance and modernity. Inspired by planetary orbits, these earrings feature a pearl drop accent suspended from a metallic ring. Their futuristic design makes them a standout accessory for special occasions or everyday wear. Lightweight and comfortable, they offer a sophisticated yet playful vibe. Ideal for gifting, these earrings are perfect for those who love celestial themes and chic styles. Their versatile appeal allows them to pair effortlessly with both formal and casual outfits, making them a must-have addition to any jewelry collection."
    },
    {
      itemName: "Geometric Black Diamond Earrings",
      itemType: "Earrings",
      itemSize: "Large",
      itemPrice: 109.99,
      stockQuantity: 75,
      displayImage: "geometric_black_diamond.jpg",
      filterImage: "geometric_black_diamond_filter.jpg",
      description: "Geometric Black Diamond Earrings showcase bold and modern design. Featuring a diamond-shaped black pendant, these earrings are perfect for those who love minimalist yet striking accessories. Their lightweight build ensures all-day comfort, making them ideal for both casual and formal occasions. The geometric design adds an edgy flair, suitable for contemporary fashion enthusiasts. Crafted with precision and durability, these earrings are a statement piece that highlights individuality. A great gift for trendsetters, they bring a touch of modern sophistication to any look. Elevate your style with these unique and versatile earrings."
    },
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
