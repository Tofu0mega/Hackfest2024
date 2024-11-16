import express from 'express'
import * as auth from '../controllers/auth.js'


const router=express.Router()

router
    .post("/signup",auth.Signup)
    .post("/signin",auth.Signin)
 
    
   

export default router