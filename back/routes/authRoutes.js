import express from "express"

const authRouter = express.Router()

authRouter.get("/check" , (req,res)=>{
    console.log("cookies" , req.cookies)
})

export default authRouter