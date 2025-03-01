import express from "express";

import {
  addProduct,
  fetchCategories,
  fetchProduct,
  addCategory,
  fetchHotDeals,
} from "../controllers/product.js";

import { upload } from "../middleWares/multer.js";

const productRouter = express.Router();

productRouter.post("/add", upload.single("image"), addProduct);
productRouter.get("/get", fetchProduct);
productRouter.get("/product/:id", fetchProduct);
productRouter.get("/category", fetchCategories);
productRouter.post("/category/add", upload.single("image"), addCategory);
// productRouter.get("/hotDeals", fetchHotDeals)

export default productRouter;
