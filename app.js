import express from 'express'
import {config} from 'dotenv'
import userRouter from './routes/user.js'
import taskRouter from './routes/task.js'
import cookieParser from 'cookie-parser'
import { errorHandaler } from './middlewares/errorHandaler.js'
export const app = express()
import cors from 'cors'
config({
    path: './data/config.env'
})

app.use(express.json())
app.use(cookieParser())
app.use(
    cors({
        origin:[process.env.FRONTTEND_URL],
        methods:["GET", "POST", "PUT", "DELETE"],
        credentials:true
    })
)

app.use("/api/v1/users" , userRouter)
app.use("/api/v1/task" , taskRouter)
app.use(errorHandaler)