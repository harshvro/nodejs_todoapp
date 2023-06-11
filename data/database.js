import mongoose from "mongoose";

export const Db  =()=> {mongoose.connect(process.env.MONGO_URI,{
    dbName:"backendApi",

})
.then((c)=>console.log(`database connected with ${c.connection.host}`))
.catch((e)=>console.log(e));
}
