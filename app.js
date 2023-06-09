import  express from "express";
// import mongoose from "mongoose";
import Routerof from "./routes/user.js"
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import taskRouter from "./routes/task.js";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";
// import { Db } from "./data/database.js";
export const app = express();
config({
    path:"./data/config.env", 
})
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:process.env.FRONTEND_URL,
    methods:["POST","GET","PUT","DELETE"],
    credentials:true,
}))
app.use("/api/v1/users",Routerof);
app.use("/api/v1/task",taskRouter);


app.get("/",(req,res)=>{
    res.send("nice one");
});
// const User =  mongoose.model("User",schema);
//using error middleware
app.use(errorMiddleware);


