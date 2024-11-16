import user from "../models/user.js"

export async function getById(req,res){
    try{
        const{id}=req.params
        const result=(await user.findById(id)).toObject()
        res.status(200).json(result)
    }
    catch (error){
        console.log(error);
        res.status(500).json
        ({
            message:"Error getting your details,please try again"
        })
    }

}

 export async function updateById(req,res){
    try{
        const{id}=req.params
        const updated=await User.findByIdAndUpdate(id,req.body,{new:true}).toObject()
        delete updated.password
        res.status(200).json(updated)
    }
    catch (error){
        console.log(error);
        res.status(500).json
        ({
            message:"Error getting your details,please try again"
        })
    }


}