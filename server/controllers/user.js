import User from "../models/user.js";

export async function getuser(req, res) {
  
    const existingUser = await User.findById(req.params.id ).lean();
  
    if (existingUser) {
        const {password,...safedata}=existingUser
     
      res.status(200).json(safedata);
      
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  }


