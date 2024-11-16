import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();


const MONGODB_URI =  process.env.MONGODB_URI
const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI, {
           
        });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};


export default connectDB;