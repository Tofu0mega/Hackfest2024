import express from "express"
import * as userController from "../controllers/user.js"

const router=express.Router()

router.get("/:id",userController.getById)
router.get("/update/:id",userController.updateById)

export default router