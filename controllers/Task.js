import errorHandlor from "../middlewares/error.js"
import { task } from "../models/task.js"

export const newTask=async (req,res,next)=>{
    try {
        const {title,description} =req.body
        await task.create({
            title,
            description,
            user:req.User,
        })
        res.status(201).json({
            success:true,
            Message:"Task added Successfully",
        })

    } catch (error) {
        next(error)
    }
}

export const getMyTask=async (req,res,next)=>{
    try {
        const userid=req.User._id
        const tasks=await task.find({user:userid})
        res.status(200).json({
            success:true,
            tasks,
        })

    } catch (error) {
        next(error)
    }
}

export const updateTask=async (req,res,next)=>{
    try {
        const {id}=req.params
        const Task=await task.findById(id)
        if (!Task){
            return next(new errorHandlor("Invalid ID",404))
        }
        Task.isCompleted=!Task.isCompleted
        await Task.save()
        res.status(200).json({
            success:true,
            Message:"Task updated Successfully"
        })

    } catch (error) {
        next(error)
    }
}

export const deleteTask=async (req,res,next)=>{
    try {
        const {id}=req.params
        const Task=await task.findById(id)
        if (!Task){
            return next(new errorHandlor("Invalid ID",404))
        }
        await Task.deleteOne()
        res.status(200).json({
            success:true,
            Message:"Task deleted"
        })
    } catch (error) {
        next(error)
    }
}