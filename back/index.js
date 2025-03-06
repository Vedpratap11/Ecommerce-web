import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";

import { connectDB } from "./connection/db.js";
import productRouter from "./routes/productRoutes.js";
import userRouter from "./routes/userRoutes.js";
import dealRouter from "./routes/dealRoutes.js";
import authRouter from "./routes/authRouter.js";
import adminRouter from "./routes/adminRoutes.js"
import cartRouter from "./routes/cartRoutes.js"
import bcrypt from "bcrypt"

console.log(await bcrypt.hash("1234567" , 10))

const port = process.env.PORT;
const app = express();

const corsOptions = {
  origin: process.env.FRONTEND_URI,
  credentials: true,
  methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
};

app.use(cors(corsOptions));
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/product", productRouter);
app.use("/api/deals", dealRouter);
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter)
app.use("/api/cart", cartRouter)

connectDB();
app.listen(port, () => console.log("Sever started at port: ", port));
