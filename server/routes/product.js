import express from 'express'
import * as product from '../controllers/product.js'


const router=express.Router()

router
    .post("/",product.create)
    .get("/",product.getAll)
    .get("/:id",product.getById)
    .get("/searchbytype/:type",product.getByType)
    .get("/searchbyname/:name",product.getByName)
    .post("/addtoCart",product.addToCart)
    .post("/removeFromCart",product.removeFromCart)
    
   

export default router