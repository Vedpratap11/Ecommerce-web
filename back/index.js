import express from "express"
import cors from "cors"

import { connectDB } from "./connection/db.js"
import productRouter from "./routes/productRoutes.js"
import userRouter from "./routes/userRoutes.js"

import "dotenv/config"
import authRouter from "./routes/authRouter.js"
import cookieParser from "cookie-parser"
const port = process.env.PORT
const app = express()

const corsOptions = {
    origin: process.env.FRONTEND_URI,
    credentials : true,
    methods: ["GET", "PUT" , "POST" , "DELETE" , "OPTIONS"]
}

app.use(cors(corsOptions))
app.use(cookieParser())

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/api/product", productRouter)
app.use("/api/user", userRouter)
app.use("/api/auth", authRouter)


connectDB()
app.listen(port, ()=> console.log("Sever started"))

