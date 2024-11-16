import dotenv from 'dotenv'
import cloudinary from 'cloudinary'

dotenv.config();


export default async function ConnectCloud(){

    try{

        await cloudinary.config({
            cloud_name: process.env.Cloud_Name,
            api_key: process.env.Cloudinary_API_Key,
            api_secret: process.env.Cloudinary_API_Secreat,
        });
        console.log("CloudinaryConnected")
        
    }catch(error){
        console.log(error)
    }
}