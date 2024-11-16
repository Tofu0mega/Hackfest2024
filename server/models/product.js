import mongoose from "mongoose"
const {Schema}=mongoose

const productSchema= new Schema({
    itemName:{
        type:String,
        required:true
    },
    itemType:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    itemSize:{
        type:String,
        required:true
    },
    itemPrice: {
        type: Number,
        default: 0,
    },  
    stockQuantity:{
        type:Number,
        required:true
    },
    displayImage:{
        type:String,
        
    },
    filterImage:{
        type:[String],
        
    },
   
},{timestamps:true,versionKey:false})
const Product=mongoose.model('Product',productSchema)
export default Product;