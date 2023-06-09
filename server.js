
import { app } from "./app.js";
import { Db } from "./data/database.js";

Db();

app.listen(process.env.PORT,()=>{
    console.log(`server is working on port ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
});