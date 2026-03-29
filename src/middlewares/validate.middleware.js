import userQuerySchema from "../validators/user.validator.js"

export const validate = (userQuerySchema) => (req,res,next)=>{

    try{
        userQuerySchema.parse(req.query)
        next()
    }
    catch(err){
        res.status(400).json({
            success:false,
            message:err.errors[0].message
        })
    }
}