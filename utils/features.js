import jwt from "jsonwebtoken";


export const sendCookie =(user,res,statusCode,message)=>{
    
    const token = jwt.sign({_id:user._id},process.env.JWT_SECRET);//on the spot v secret v de skte hai

    res.status(statusCode).cookie("token",token,{
        httpOnly:true,
        maxAge:15*60*1000,
        sameSite: process.env.NODE_ENV==="development" ? "lax" : "none",
        secure: process.env.NODE_ENV==="development"? false: true,
    }).json({
        success:true,
        message,
    })
}