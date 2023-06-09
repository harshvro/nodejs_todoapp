import jwt from "jsonwebtoken";
import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";

export const login = async(req,res,next)=>{
    try {
        const {email,password} = req.body;
    const user  = await User.findOne({email}).select("+password");
    if(!user)return next( new ErrorHandler("invalid email or password",400));
    

    const isMatch = await bcrypt.compare(password,user.password);

    
    if(!isMatch)return next( new ErrorHandler("invalid email or password",400));
    

    sendCookie(user,res,200,`Welcome back ${user.name}`);
    } catch (error) {
        next(error);
    }
}
export const register = async(req,res)=>{
    try {
        const {name,email,password} = req.body;
    let user = await User.findOne({email});
    if(user)return next( new ErrorHandler("user already exist",400));
    
    const hashPassword = await bcrypt.hash(password,10);
    user = await User.create({name,email,password:hashPassword});
    sendCookie(user,res,201,"Registered Successfully");
    } catch (error) {
        next(error);
    }
}

export const getMyProfile = (req,res)=>{
    // const id = "myid";
    res.status(200).json({
        success:true,
        user:req.user
        ,
    })
    
}

export const logout = (req,res,next)=>{
    res.status(200).cookie("token","",{expires:new Date(Date.now())}).json({//token se empty aur istant token expire
        success:true,
        user:req.user,
        sameSite: process.env.NODE_ENV==="development" ? "lax" : "none",
        secure: process.env.NODE_ENV==="development"? false: true,
    })
}

