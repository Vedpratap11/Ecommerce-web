import express from "express"
import {registerUser, loginUser, LogoutUser} from "../controllers/user.js"

const userRouter = express.Router()


userRouter.post("/register", registerUser)
userRouter.post("/login", loginUser)
userRouter.post("/Logout", LogoutUser)

export default userRouter