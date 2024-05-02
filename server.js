import {app} from "./app.js"
import { connectDB } from "./data/database.js";

connectDB();
console.log()

app.listen(process.env.PORT,()=>{
    console.log("server.js is running on http://localhost:4000");
})