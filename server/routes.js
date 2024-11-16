import { Router } from "express";
// import auth from "./Routes/Auth.js"
// import users from "./Routes/Users.js"
import users from "./routes/user.js"

const router =Router()


// router.use('/auth', auth);
router.use('/users', users);

export default router