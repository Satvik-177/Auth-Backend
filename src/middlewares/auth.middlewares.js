import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";

export const protect = asyncHandler(async(req,res,next)=>{

    let token;

    if(req.authorization.headers && req.authorization.headers.startsWith("Bearer ")){
        token = req.authorization.headers.split(" ")[1]
    }

    if(!token){
        res.status(401)
        throw new Error("Invalid token")
    }

    const decoded = jwt.verify(token,process.env.JWT_SECRET)

    const user = await User.findById(decoded.id).select("-password")

    if(!user){
        res.status(401)
        throw new Error("User not found")
    }

    req.user = user;

    next();
});