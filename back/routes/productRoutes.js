import express from "express";

import {
  addProduct,
  fetchCategories,
  fetchProduct,
} from "../controllers/product.js";
import { upload } from "../middleWares/multer.js";

const productRouter = express.Router();

productRouter.post("/add", upload.single("image"), addProduct);
productRouter.get("/get", fetchProduct);
productRouter.get("/category", fetchCategories);


export default productRouter;
