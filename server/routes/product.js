import express from 'express'
import product from 'controllers/product.js'
const productController=require("../controllers/Product")
const router=express.Router()

router
    .post("/",productController.create)
    .get("/",productController.getAll)
    .get("/:id",productController.getById)
    .patch("/:id",productController.updateById)
    .patch("/undelete/:id",productController.undeleteById)
    .delete("/:id",productController.deleteById)

module.exports=router