import {User} from '../models/user.js'
import bcrypt from 'bcrypt'
import { sendCookie } from '../utils/features.js'
import {createError} from '../middlewares/errorHandaler.js'
export const login = async(req, res ,next) =>{
    try {
        const {email , password} = req.body
        const user = await User.findOne({email}).select("+password")
        if(!user){
            return next(createError(404, "User does not exist"))
        }
        const isMatch = await bcrypt.compare(password , user.password)
        if(!isMatch){
            return next (createError(404, "Invalid email or password"))
        }
        sendCookie(user , res , `Welcome back ${user.name}` , 200)
    } catch (error) {
        next(error)
    }
}

export const register = async(req, res, next) =>{
    try {
        const {name,email,password} = req.body
        let user = await User.findOne({email})
        if(user){
            return next(createError(404, "User already exist"))
        }
        const hasedPassword = await bcrypt.hash(password, 10)
        user = await User.create({name , email, password:hasedPassword})
        sendCookie(user , res, "Registered successfully", 201)
    } catch (error) {
        next(error)
    }
}
export const getMyDetails = (req, res , next) =>{
    try {
        res.status(200).json({
            success:true,
            user:req.user
        })
    } catch (error) {
        next(error)
    }
}
export const logout = (req, res , next) =>{
    try {
        res.status(200).cookie("token", "", {expires: new Date(Date.now()),
            sameSite:process.env.NODE_ENV === "Development" ? "lax": "none",
            secure:process.env.NODE_ENV === "Development" ? false: true
        }).json({
            success:true,
            message:"log out successfully"
        })
    } catch (error) {
        next(error)
    }
}
