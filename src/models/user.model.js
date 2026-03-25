import mongoose from "mongoose"

const userSchema = new mongoose.Schema({

    name:{
        type:String,
        maxLength:45
    },

    age:{
        type:Number,
        min:21,
        max:70
    },

    about:[String],

    bio:[
        {
            EngBackground:{
                type:String
            },
        },
        {
            ContactNo:{
                type:Number,
                unique:true,
            },
        },
    ],

    email:{
        type:String,
        unique:true,
        required:true
    },

    password:{
        type:String
    }
})

const User = new mongoose.model("User",userSchema)

export default User