import {user} from "../models/user.js";
import { sendCookie } from "../utils/feature.js";
import errorHandlor from "../middlewares/error.js"
import bcrypt from "bcrypt";

export const Register=async (req,res,next)=>{
    try {
        const {name,email,password}=req.body
        let User=await user.findOne({email})
        /*if (User)
        {
            return res.status(404).json({
                success:false,
                Message:"Your are already registered",
            })
        }*/
        if(User)
        {
            return next(new errorHandlor("Your are already registered",400))
        }
        const hashedPassword=await bcrypt.hash(password,10)
        User=await user.create({
            name,
            email,
            password:hashedPassword,
        })
        sendCookie(User,res,"Registered Successfully",201)

    } catch (error) {
        next(error)
    }
}

export const Login=async (req,res,next)=>{
    try {
        const {email,password}=req.body
        const User=await user.findOne({email}).select("+password")
        if (!User)
        {
            return next(new errorHandlor("invalid email or password",400))
        }
        const isMatch=await bcrypt.compare(password,User.password)
        if (!isMatch)
        {
           return next(new errorHandlor("invalid email or password",400))
        }
        sendCookie(User,res,`welcome back, ${User.name}`,201)

    } catch (error) {
        next(error)
    }
}

export const getMyProfile=(req,res)=>{
    res.status(200).json({
        success:true,
        User:req.User,
    })
}

export const Logout=(req,res)=>{
    res
    .status(200)
    .cookie("token",null,{
        expires:new Date(Date.now()),
        sameSite:process.env.NODE_ENV==="Development"?"lax":"none",
        secure:process.env.NODE_ENV==="Development"?false:true,
    })
    .json({
        success:true,
        Message:"successfully logged out",
    })
}
