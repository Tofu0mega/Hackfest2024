
import Product from "../models/product.js"
import { uploadImage } from "../middleware/uploadpng.js"
import User from "../models/user.js"

export async function create(req,res){
    try {
        const {itemName,itemType,itemSize,itemPrice,stockQuantity,displayImage,itemDescription}=req.body
        const displayImageURL=await uploadImage(displayImage)
        const newProduct= await Product.create({itemName:itemName,itemType:itemType,itemSize:itemSize,itemPrice:itemPrice,stockQuantity:stockQuantity,displayImage:displayImageURL,filterImage:displayImageURL,itemDescription:itemDescription})



        res.status(201).json("Product Created")
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'Error adding product, please trying again later'})
    }
}

export async function getAll(req, res) {
    try {
        const allProducts=await Product.find()
        res.status(200).json(allProducts)
       
    
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Error fetching products, please try again later'})
    }
}

export async function getById(req,res){
    try {
        const {id}=req.params
        const result=await Product.findById(id).lean()
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Error getting product details, please try again later'})
    }
}

export async function getByType(req, res) {
    try {
        const type = req.params.type; // Retrieve the 'type' parameter from the request URL
        const filteredProducts = await Product.find({ itemType: type }); // Assuming a 'type' field exists in the Product schema
        res.status(200).json(filteredProducts);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Something went wrong" });
    }
}

export async function getByName(req, res) {
    try {
        const name = req.query.name; // Assuming the name is passed as a query parameter
        const filteredProducts = await Product.find({ name: new RegExp(name, 'i') }); // Case-insensitive search
        res.status(200).json(filteredProducts);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Something went wrong" });
    }
}


export const addToCart = async (req, res) => {
    try {
      const { userId, productId } = req.body;
  
      // Validate userId and productId
      if (!userId || !productId) {
        return res.status(400).json({ message: 'User ID and Product ID are required' });
      }
  
      // Find the user by ID
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Check if the product exists
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      // Check if the product is already in the cart
      const productExists = user.cart.some(item => item.equals(productId));
      if (productExists) {
        return res.status(400).json({ message: 'Product already in cart' });
      }
  
      // Add product to user's cart
      user.cart.push(productId);
      await user.save();
  
      return res.status(200).json({ message: 'Product added to cart', cart: user.cart });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  // Controller to remove a product from the user's cart
  export const removeFromCart = async (req, res) => {
    try {
      const { userId, productId } = req.body;
  
      // Validate userId and productId
      if (!userId || !productId) {
        return res.status(400).json({ message: 'User ID and Product ID are required' });
      }
  
      // Find the user by ID
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Check if the product is in the cart
      const productIndex = user.cart.findIndex(item => item.equals(productId));
      if (productIndex === -1) {
        return res.status(400).json({ message: 'Product not in cart' });
      }
  
      // Remove product from the cart
      user.cart.splice(productIndex, 1);
      await user.save();
  
      return res.status(200).json({ message: 'Product removed from cart', cart: user.cart });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };