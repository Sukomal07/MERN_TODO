import {Task} from '../models/task.js'
import { createError } from '../middlewares/errorHandaler.js'
export const createtask = async(req, res ,next) =>{
    try {
        const {title , description} = req.body
        await Task.create({
            title,
            description,
            user: req.user
        })
        res.status(201).json({
            success:true,
            message:"Task created successfully"
        })
    } catch (error) {
        next(error)
    }
}
export const updatetask = async(req, res , next) =>{
    try {
        const task = await Task.findById(req.params.id)
        if(!task){
            return next(createError(404, "Task not found"))
        }
        task.isCompleted = !task.isCompleted
        await task.save()
        res.status(200).json({
            success:true,
            message:"task updated successfully"
        })
    } catch (error) {
        next(error)
    }
}
export const deletetask = async(req, res , next) =>{
    try {
        const task = await Task.findByIdAndDelete(req.params.id)
        if(!task){
            return next(createError(404, "Task not found"))
        }
        res.status(200).json({
            success:true,
            message:"task deleted successfully"
        })
    } catch (error) {
        next(error)
    }
}
export const mytask = async(req, res , next) =>{
    try {
        const userId = req.user._id
        const tasks = await Task.find({user:userId})
        res.status(200).json({
            success:true,
            tasks,
        })
    } catch (error) {
        next(error)
    }
}