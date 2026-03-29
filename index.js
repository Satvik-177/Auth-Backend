import express from "express"
import dotenv from "dotenv"
import connectToDB from "./src/config/db.js"
import authRoutes from "../BackendProj_Wibe/src/routes/auth.routes.js"
import userRoutes from "./src/routes/user.routes.js"
import { errorHandler } from "./src/middlewares/error.middlewares.js"
import morgan from "morgan"
import {limiter} from "../BackendProj_Wibe/src/middlewares/rateLimiter.js"

const app = express()

dotenv.config()
app.use(express.json())

if(process.env.NODE_ENV == "development"){
    app.use(morgan("dev"))
}

app.use(limiter)

app.use("/api/auth",authRoutes)
app.use("/api/users",userRoutes)


app.use(errorHandler)

let port = process.env.PORT || 4000

const startServer = async(req,res)=>{

    await connectToDB()

    app.listen(port,()=>{
        console.log(`Server is listening on port ${port}`)
    })
}

startServer()