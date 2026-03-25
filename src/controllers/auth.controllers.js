import jwt from "jsonwebtoken"
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import asyncHandler from "../utils/asyncHandler.js"

export const register = asyncHandler(async(req,res)=>{

    const{name,email,password} = req.body 

    if(!name || !email || !password){
        res.status(400)
        throw new Error("All fields are required")
    }

    const existingUser = await User.findOne({email})

    if(existingUser){
        res.status(422)
        throw new Error("User already exists")
    }

    const hashedPassword = await bcrypt.hash(password,10)

    const user = await User.create({
        name,
        email,
        password:hashedPassword
    });

    res.status(201).json({
        message:"User created successfully",
        user:{
            id:user._id,
            name:user.name,
            email:user.email
        }
    });
})

export const login = asyncHandler(async(req,res)=>{

    const{email,password} = req.body

    if(!email || !password){
        res.status(400)
        throw new Error("All fields are required")
    }

    const user = await User.findOne({email})

    if(!user){
        res.status(404)
        throw new Error("User not found")
    }

    const matchPassword = await bcrypt.compare(password,user.password)

    if(!matchPassword){
        res.status(401)
        throw new Error("Invalid password")
    }

    const token = jwt.sign(

        {id:user._id, email:user.email},
        process.env.JWT_SECRET,
        {expiresIn: "2d"}
    );

    res.status(200).json({
        message:"Login success",
        success:true,
        token,
        user:{
            id:user._id,
            name:user.name,
            email:user.email
        }
    })
})