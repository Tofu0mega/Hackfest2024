import { Router } from "express";
import Product from "./routes/product.js";
import users from "./routes/user.js"
import auth from "./routes/auth.js"

const router =Router()


router.use('/product', Product);
router.use('/users', users);
router.use('/auth',auth)

export default router