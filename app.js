import express from "express"
import userRouter from "./routers/user.js"
import taskRouter from "./routers/task.js"
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";

export const app=express();

config({
    path:"./data/config.env",
});

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true,
}
))

app.use("/api/v1/users",userRouter);
app.use("/api/v1/Task",taskRouter);

app.get("/",(req,res)=>{
    res.send("<h1>nice working</h1>");
})

app.use(errorMiddleware)
