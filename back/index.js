import express from "express"
import cors from "cors"

import { connectDB } from "./connection/db.js"
import productRouter from "./routes/productRoutes.js"
import userRouter from "./routes/userRoutes.js"

import "dotenv/config"
import authRouter from "./routes/authRoutes.js"
// //Schema is a blueprint of how the data will be stored in the database
// const productSchema = new mongoose.Schema({
//     title:{
//         type: String,
//         required: true,
//     },
//     brand: {
//         type: String,
//         required: true,
//     },
//     category: {
//         type: String,
//         required: true,
//     },
//     usualPrice : {
//         type: Number,
//         required: true,
//     },
//     discountedPrice: {
//         type: Number,
        
//     }


// })

// //Model is a class with which we construct documents
// const Product = mongoose.model("Product", productSchema)

const port = process.env.PORT
const app = express()

const corsOptions = {
    origin: process.env.FRONTEND_URI,
    credentials : true,
    methods: ["GET", "PUT" , "POST" , "DELETE" , "OPTIONS"]
}

app.use(cors(corsOptions))

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/api/product", productRouter)
app.use("/api/user", userRouter)
app.use("/api/auth", authRouter)


connectDB()
app.listen(port, ()=> console.log("Sever started"))

