import { user } from "../models/user.js"
import jwt from "jsonwebtoken";

export const isAuthenticated= async (req,res,next)=>{
    const {token}=req.cookies
    if (!token)
    {
        return res.status(404).json({
            success:false,
            Message:"Login First",
        })
    }
    const decoded=jwt.verify(token,process.env.JWT_SECRET)
    req.User=await user.findById(decoded._id)
    next()
}