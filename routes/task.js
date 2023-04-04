import express from 'express'
import { createtask, deletetask, mytask, updatetask } from '../controllers/task.js'

import {isAuthenticated} from '../middlewares/auth.js'

const router = express.Router()

router.get("/mytask", isAuthenticated, mytask)
router.post("/newtask", isAuthenticated, createtask)
router.put("/:id" , isAuthenticated, updatetask)
router.delete("/:id", isAuthenticated, deletetask)

export default router