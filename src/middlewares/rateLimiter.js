import rateLimit from "express-rate-limit";

export const limiter = rateLimit({
    windowsMs:1*60*1000,
    max:10,
    message:{
        success:false,
        message:"Too many requests , try again later"
    }
})

// Internal logic (library ke andar)

// 👉 internally something like this is going on:

// if (requestCount <= max) {
//     next()  // allow request  // going to controller
// } else {
//     res.status(429).json(message)  // block ❌
// }