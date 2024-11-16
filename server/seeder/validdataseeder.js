import mongoose from "mongoose";
import Product from "../models/product.js"; // Adjust the path as needed

// Connect to your MongoDB database
mongoose.connect("mongodb://localhost:27017/5AM", {
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
      displayImage: "https://res.cloudinary.com/dtauaal8p/image/upload/v1731778751/5AM/Tops/sdggfds_guaauu.png",
      filterImage: "https://res.cloudinary.com/dtauaal8p/image/upload/v1731778751/5AM/Tops/sdggfds_guaauu.png",
      description: "These elegant Radiant Flower Stud Earrings are crafted with a gold-tone finish and adorned with sparkling crystals. Their intricate floral design adds a delicate touch to any outfit, making them perfect for both casual and formal occasions. Lightweight and comfortable, they are ideal for all-day wear. The versatile design ensures they pair effortlessly with other jewelry. A thoughtful gift for loved ones, these earrings are a timeless addition to any accessory collection, providing charm and sophistication with every wear. Whether dressing up or down, these studs are a must-have staple for jewelry enthusiasts."
    },
    {
      itemName: "Teardrop Crystal Drop Earrings",
      itemType: "Earrings",
      itemSize: "Medium",
      itemPrice: 99.99,
      stockQuantity: 80,
      displayImage: "https://res.cloudinary.com/dtauaal8p/image/upload/v1731778750/5AM/Tops/asfdfsdaasfd_qdnizb.png",
      filterImage: "https://res.cloudinary.com/dtauaal8p/image/upload/v1731778750/5AM/Tops/asfdfsdaasfd_qdnizb.png",
      description: "Teardrop Crystal Drop Earrings offer a blend of elegance and modern style. Featuring a crystal-studded stud paired with a gold teardrop pendant, these earrings are designed to catch the light beautifully. Perfect for evening events, date nights, or formal gatherings, they exude sophistication while maintaining subtle charm. The adjustable fit ensures comfort, making them suitable for prolonged wear. Crafted with precision, these earrings make a stunning gift for special occasions like anniversaries or birthdays. Add a touch of glamour to your jewelry collection with these versatile and dazzling drop earrings."
    },
    {
      itemName: "Celestial Star Dangle Earrings",
      itemType: "Earrings",
      itemSize: "Medium",
      itemPrice: 89.99,
      stockQuantity: 90,
      displayImage: "https://res.cloudinary.com/dtauaal8p/image/upload/v1731778750/5AM/Tops/afdsfadsfdas_tygbcq.png",
      filterImage: "https://res.cloudinary.com/dtauaal8p/image/upload/v1731778750/5AM/Tops/afdsfadsfdas_tygbcq.png",
      description: "Celestial Star Dangle Earrings are a tribute to the beauty of the night sky. These silver-tone earrings feature a delicate star charm suspended from a shimmering chain. Lightweight and stylish, they are perfect for adding a whimsical yet elegant touch to any outfit. Ideal for casual outings or festive events, these earrings are a wonderful gift for dreamers and stargazers. Their intricate craftsmanship ensures durability, while the versatile design complements various looks. Elevate your accessory game with these celestial-inspired earrings, blending modern style with timeless charm."
    },
    {
      itemName: "Crystal Cross Stud Earrings",
      itemType: "Earrings",
      itemSize: "Small",
      itemPrice: 95.99,
      stockQuantity: 100,
      displayImage: "https://res.cloudinary.com/dtauaal8p/image/upload/v1731778750/5AM/Tops/dafsafdasd_lyemij.png",
      filterImage: "https://res.cloudinary.com/dtauaal8p/image/upload/v1731778750/5AM/Tops/dafsafdasd_lyemij.png",
      description: "Crystal Cross Stud Earrings are an embodiment of grace and elegance. Featuring a cross-shaped design adorned with sparkling crystals, these earrings are both timeless and versatile. They are ideal for religious occasions or as a meaningful fashion statement. The lightweight build ensures comfort for daily wear, while the intricate detailing showcases superior craftsmanship. These earrings make a thoughtful gift for birthdays, confirmations, or holidays. Pair them with casual or formal attire to add a subtle yet striking touch to your ensemble. A true classic, these studs are a must-have in every jewelry collection."
    },
    {
      itemName: "Golden Cross Drop Earrings",
      itemType: "Earrings",
      itemSize: "Medium",
      itemPrice: 105.99,
      stockQuantity: 70,
      displayImage: "https://res.cloudinary.com/dtauaal8p/image/upload/v1731778749/5AM/Tops/fadfadasfd_cr298j.png",
      filterImage: "https://res.cloudinary.com/dtauaal8p/image/upload/v1731778749/5AM/Tops/fadfadasfd_cr298j.png",
      description: "Golden Cross Drop Earrings combine spiritual symbolism with modern elegance. Crafted from gold-tone metal and embellished with crystals, these earrings feature a delicate chain design for a chic and graceful look. Perfect for formal events, religious ceremonies, or casual outings, they exude sophistication and charm. The lightweight structure ensures comfortable wear throughout the day. A thoughtful gift for loved ones, these earrings make a meaningful addition to any accessory collection. Their versatile design allows for pairing with various outfits, adding a hint of luxury and spirituality to your style."
    },
    {
      itemName: "Halo Diamond Stud Earrings",
      itemType: "Earrings",
      itemSize: "Small",
      itemPrice: 115.99,
      stockQuantity: 60,
      displayImage: "https://res.cloudinary.com/dtauaal8p/image/upload/v1731778749/5AM/Tops/fdasdsfsfda_p4cihd.png",
      filterImage: "https://res.cloudinary.com/dtauaal8p/image/upload/v1731778749/5AM/Tops/fdasdsfsfda_p4cihd.png",
      description: "Halo Diamond Stud Earrings feature a radiant centerpiece surrounded by smaller sparkling stones, offering a timeless and luxurious design. Perfect for weddings, formal events, or as an everyday statement piece, these earrings bring elegance to any outfit. Their lightweight and secure fit ensure comfort and durability. A classic gift for anniversaries, birthdays, or special milestones, these studs symbolize sophistication and style. Meticulously crafted, they enhance your natural beauty while making a lasting impression. Add these versatile earrings to your collection for a touch of glamour and refinement."
    },
    {
      itemName: "Pearl Saturn Orbit Earrings",
      itemType: "Earrings",
      itemSize: "Medium",
      itemPrice: 129.99,
      stockQuantity: 50,
      displayImage: "https://res.cloudinary.com/dtauaal8p/image/upload/v1731778748/5AM/Tops/afdafds_yth74p.png",
      filterImage: "https://res.cloudinary.com/dtauaal8p/image/upload/v1731778748/5AM/Tops/afdafds_yth74p.png",
      description: "Pearl Saturn Orbit Earrings are a unique fusion of elegance and modernity. Inspired by planetary orbits, these earrings feature a pearl drop accent suspended from a metallic ring. Their futuristic design makes them a standout accessory for special occasions or everyday wear. Lightweight and comfortable, they offer a sophisticated yet playful vibe. Ideal for gifting, these earrings are perfect for those who love celestial themes and chic styles. Their versatile appeal allows them to pair effortlessly with both formal and casual outfits, making them a must-have addition to any jewelry collection."
    },
   
    {
      itemName: "Vibrant Green Retro Glasses",
      itemType: "Glasses",
      itemSize: "Medium",
      itemPrice: 29.99,
      stockQuantity: 150,
      displayImage: "https://res.cloudinary.com/dtauaal8p/image/upload/v1731775875/5AM/Glasses/glasses_zoymgq.png",
      filterImage: "https://res.cloudinary.com/dtauaal8p/image/upload/v1731775875/5AM/Glasses/glasses_zoymgq.png",
      description: "Bright and bold, these green retro Glasses feature a classic wayfarer design with tinted black lenses for UV protection. Lightweight and durable, they are perfect for making a statement at outdoor events or summer outings."
    },
    {
      itemName: "Classic Black Round Glasses",
      itemType: "Glasses",
      itemSize: "Medium",
      itemPrice: 19.99,
      stockQuantity: 200,
      displayImage: "https://res.cloudinary.com/dtauaal8p/image/upload/v1731775875/5AM/Glasses/unnamed_vmrcx2.png",
      filterImage: "https://res.cloudinary.com/dtauaal8p/image/upload/v1731775875/5AM/Glasses/unnamed_vmrcx2.png",
      description: "Timeless and sophisticated, these black round glasses are a versatile accessory for both casual and professional settings. Their lightweight frame ensures comfort for extended wear, blending elegance with practicality."
    },
    {
      itemName: "Sleek Aviator Glasses",
      itemType: "Glasses",
      itemSize: "Large",
      itemPrice: 49.99,
      stockQuantity: 100,
      displayImage: "https://res.cloudinary.com/dtauaal8p/image/upload/v1731775876/5AM/Glasses/glass2_ggydbm.png",
      filterImage: "https://res.cloudinary.com/dtauaal8p/image/upload/v1731775876/5AM/Glasses/glass2_ggydbm.png",
      description: "Stylish and iconic, these silver aviator Glasses come with reflective lenses and a lightweight metal frame. Ideal for sunny days, they offer both fashion and functionality, making them a must-have accessory."
    },
    {
      itemName: "Chic Gradient Glasses",
      itemType: "Glasses",
      itemSize: "Medium",
      itemPrice: 39.99,
      stockQuantity: 120,
      displayImage: "https://res.cloudinary.com/dtauaal8p/image/upload/v1731775876/5AM/Glasses/glass3_jvvuxw.png",
      filterImage: "https://res.cloudinary.com/dtauaal8p/image/upload/v1731775876/5AM/Glasses/glass3_jvvuxw.png",
      description: "These chic Glasses feature a gradient lens with a glossy red and gold frame. Designed for modern elegance, they offer UV protection while enhancing your style for casual or formal outings."
    },
    {
      itemName: "Cool Blue Mirror Glasses",
      itemType: "Glasses",
      itemSize: "Medium",
      itemPrice: 34.99,
      stockQuantity: 140,
      displayImage: "https://res.cloudinary.com/dtauaal8p/image/upload/v1731775877/5AM/Glasses/glass4_sks3iv.png",
      filterImage: "https://res.cloudinary.com/dtauaal8p/image/upload/v1731775877/5AM/Glasses/glass4_sks3iv.png",
      description: "Bold and trendy, these blue mirror Glasses feature a sleek black frame. Perfect for outdoor adventures, they provide both comfort and a reflective shield from the sun."
    },
    {
      itemName: "Gold Classic Aviators",
      itemType: "Glasses",
      itemSize: "Large",
      itemPrice: 59.99,
      stockQuantity: 80,
      displayImage: "https://res.cloudinary.com/dtauaal8p/image/upload/v1731775878/5AM/Glasses/glass5_zfifyl.png",
      filterImage: "https://res.cloudinary.com/dtauaal8p/image/upload/v1731775878/5AM/Glasses/glass5_zfifyl.png",
      description: "Sophisticated and sturdy, these gold aviator Glasses feature polarized lenses for maximum sun protection. Designed for both style and practicality, they are perfect for everyday wear."
    },
    {
      itemName: "All-Black Wayfarer Glasses",
      itemType: "Glasses",
      itemSize: "Medium",
      itemPrice: 24.99,
      stockQuantity: 170,
      displayImage: "https://res.cloudinary.com/dtauaal8p/image/upload/v1731775875/5AM/Glasses/glass1_rtypiw.png",
      filterImage: "https://res.cloudinary.com/dtauaal8p/image/upload/v1731775875/5AM/Glasses/glass1_rtypiw.png",
      description: "Simple yet timeless, these all-black wayfarer Glasses provide a sleek look. Comfortable and versatile, they are ideal for adding a subtle edge to any outfit."
    },
    {
      itemName: "Minimalist Aviator Silhouette",
      itemType: "Glasses",
      itemSize: "Large",
      itemPrice: 44.99,
      stockQuantity: 90,
      displayImage: "https://res.cloudinary.com/dtauaal8p/image/upload/v1731775875/5AM/Glasses/glass7_o6jguy.png",
      filterImage: "https://res.cloudinary.com/dtauaal8p/image/upload/v1731775875/5AM/Glasses/glass7_o6jguy.png",
      description: "A bold silhouette for everyday style, these minimalist aviator Glasses feature a clean black design. Lightweight and durable, they’re a go-to choice for any occasion."
    },
    {
      itemName: "Regal Gold Temple Necklace",
      itemType: "Necklace",
      itemSize: "Large",
      itemPrice: 499.99,
      stockQuantity: 50,
      displayImage: "https://res.cloudinary.com/dtauaal8p/image/upload/v1731778701/5AM/Necklaces/sgdaasdgaesgfe_p4vckd.png",
      filterImage: "https://res.cloudinary.com/dtauaal8p/image/upload/v1731778701/5AM/Necklaces/sgdaasdgaesgfe_p4vckd.png",
      description: "Exquisite traditional gold necklace featuring intricate temple-inspired designs and dangling accents. Perfect for weddings and grand celebrations, it embodies cultural elegance."
    },
    {
      itemName: "Floral Mesh Bridal Necklace",
      itemType: "Necklace",
      itemSize: "Medium",
      itemPrice: 459.99,
      stockQuantity: 60,
      displayImage: "https://res.cloudinary.com/dtauaal8p/image/upload/v1731778699/5AM/Necklaces/sfdasdfaasdf_rjahuq.png",
      filterImage: "https://res.cloudinary.com/dtauaal8p/image/upload/v1731778699/5AM/Necklaces/sfdasdfaasdf_rjahuq.png",
      description: "A stunning gold necklace adorned with floral patterns and an ornate teardrop pendant, ideal for bridal wear or festive occasions. It highlights a blend of tradition and sophistication."
    },
    {
      itemName: "Diamond Vine Statement Necklace",
      itemType: "Necklace",
      itemSize: "Medium",
      itemPrice: 599.99,
      stockQuantity: 40,
      displayImage: "https://res.cloudinary.com/dtauaal8p/image/upload/v1731778699/5AM/Necklaces/kisspng-jewellery-necklace-jewelry-design-earring-antique-collier-haute-joaillerie-collier-or-gris-une-tou-5b65f8367dc264.7171467115334093345151_owuqdy.png",
      filterImage: "https://res.cloudinary.com/dtauaal8p/image/upload/v1731778699/5AM/Necklaces/kisspng-jewellery-necklace-jewelry-design-earring-antique-collier-haute-joaillerie-collier-or-gris-une-tou-5b65f8367dc264.7171467115334093345151_owuqdy.png",
      description: "Modern diamond necklace with a unique vine-like design and teardrop accents, perfect for formal events. Its sleek and stylish look adds a touch of glamour."
    },
    {
      itemName: "Golden Peacock Choker Necklace",
      itemType: "Necklace",
      itemSize: "Large",
      itemPrice: 529.99,
      stockQuantity: 30,
      displayImage: "https://res.cloudinary.com/dtauaal8p/image/upload/v1731778701/5AM/Necklaces/asgasdgasgdagsd_bebflf.png",
      filterImage: "https://res.cloudinary.com/dtauaal8p/image/upload/v1731778701/5AM/Necklaces/asgasdgasgdagsd_bebflf.png",
      description: "Richly crafted gold necklace featuring intricate peacock motifs and red gem embellishments. A bold accessory for cultural or traditional ceremonies."
    },
    {
      itemName: "Elegant Gold Filigree Necklace",
      itemType: "Necklace",
      itemSize: "Medium",
      itemPrice: 399.99,
      stockQuantity: 70,
      displayImage: "https://res.cloudinary.com/dtauaal8p/image/upload/v1731778697/5AM/Necklaces/asdsdasgdagsda_dpzzqd.png",
      filterImage: "https://res.cloudinary.com/dtauaal8p/image/upload/v1731778697/5AM/Necklaces/asdsdasgdagsda_dpzzqd.png",
      description: "A delicate gold filigree necklace with intricate details and a central ornamental motif. Its timeless beauty makes it suitable for formal and casual attire."
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
