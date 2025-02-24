import express from "express"


import { addProduct } from "../controllers/product.js"
import { upload } from "../middleWares/multer.js"

const productRouter = express.Router()

productRouter.post("/product/add", upload.single("image") ,addProduct)
export default productRouter