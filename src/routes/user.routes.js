import express from "express"
import {protect} from "../middlewares/auth.middlewares.js"
import upload from "../middlewares/upload.middleware.js"

const userRoutes = express.Router()

userRoutes.get("/profile",protect,(req,res)=>{
    res.json({
        msg:"protected data",
        user:req.user
    })
})

userRoutes.post("/upload", protect, upload.single("file"), (req, res) => {
    res.json({
        message: "File uploaded",
        file: req.file
    })
})

export default userRoutes