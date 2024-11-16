import { Router } from "express";
import Product from "./routes/product.js";

const router =Router()


router.use('/product', Product);
// router.use('/users', users);

export default router