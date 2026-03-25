import express from "express"
import {protect} from "../middlewares/auth.middlewares.js"

export const userRoutes = express.Router()

userRoutes.get("/profile",protect,(req,res)=>{
    res.json({
        msg:"protected data",
        user:req.user
    })
})