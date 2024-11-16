import User from "../models/user.js";


import dotenv from 'dotenv';

import bcrypt from "bcrypt";

import jwt from 'jsonwebtoken'

export  async function Signup(req,res){
    const { email, password,userName } = req.body;
   
    try {
        //Checking if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        //Salt
        const salt = await bcrypt.genSalt();

        //Hashing the password
        const hashedpassword = await bcrypt.hash(password, salt);

        //Creating the user in the database
        const newUser = await User.create({  userName: userName,email:email, password: hashedpassword});

        //Generating a JWT token
        const token = jwt.sign({ email: newUser.email, id: newUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: '30d' });

        res.status(201).json({ _id:newUser._id, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
    
}

export  async function Signin(req,res){
    const { email, password } = req.body;
   
    try {
        //Checking if the user already exists
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ message: 'User dosent exists' });
        }

        const passwordbool=await bcrypt.compare(password,existingUser.password)
        if(!passwordbool){
            return res.status(400).json({message:`Invalid Credentials`})
        }
       

       
        

        //Generating a JWT token
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: '30d' });

        return res
        .status(200)
        .json({ message: "Successfully Logged In", _id: existingUser._id, token });

        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}