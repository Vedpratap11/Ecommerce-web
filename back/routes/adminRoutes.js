import express from "express"
import {loginAdmin} from "../controllers/admin.js"
import {checkAdmin} from "../middleWares/auth.js"

const adminRouter = express.Router()

adminRouter.post("/login" , loginAdmin)
adminRouter.post("/logout", async(req, res)=>{
    try{
        res.clearCookie("adminToken" , {
            httpOnly: false,
            secure: false,
            sameSite: "strict",
            

        })
        res.status(200).send({message : "Logged Out"})
    }catch(error){
        console.log(error)
        return res.status(500).send({message: error.message})
    }
})
adminRouter.get("/check" , checkAdmin,((req, res)=>{res.send({message: "admin authenticated"})}))
export default adminRouter