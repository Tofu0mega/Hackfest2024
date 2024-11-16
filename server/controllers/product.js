
import Product from "../models/product.js"
import { uploadImage } from "../middleware/uploadpng.js"

export async function create(req,res){
    try {
        const {itemName,itemType,itemSize,itemPrice,stockQuantity,displayImage}=req.body
        const displayImageURL=await uploadImage(displayImage)
        const newProduct= await Product.create({itemName:itemName,itemType:itemType,itemSize:itemSize,itemPrice:itemPrice,stockQuantity:stockQuantity,displayImage:displayImageURL,filterImage:displayImageURL})



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


