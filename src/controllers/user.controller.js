import User from "../models/user.model.js"
import asyncHandler from "../utils/asyncHandler.js"

export const getUsers = asyncHandler(async(req,res,next)=>{

    //Query parameters are key-value pairs passed in the URL after ? to send additional data to the server.
    //Using parseInt because all values are in dtring format

    const page = parseInt(req.query.page) || 1 
    const limit = parseInt(req.query.limit) || 5
    const search = req.query.search || ""

    const skip = (page - 1) * limit  //no of initial datas we need to skip 

    const query = {

        $or:[
            {name: { $regex:search, $options:"i"}},  // i for case insensitivity means sat,SAT,SAt,etc all will get matched
            {email: { $regex:search, $options:"i"}}
        ]
    }

    const users = await User.find(query)
    .select("-password")
    .skip(skip)
    .limit(limit)
    .sort({ createdAt:-1 })//descending:-1(latest first on the basis of createdAt field), ascending:1, bydefault:not guaranteed

    const total = await User.countDocuments(query)

    res.json({
        page,
        totalPages: Math.ceil(total/limit),
        totalUsers:total,
        users
    });

});