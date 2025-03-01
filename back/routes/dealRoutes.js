import express from "express";

import { fetchHotDeals } from "../controllers/product.js";

const dealRouter = express.Router();
dealRouter.get("/", fetchHotDeals);

export default dealRouter;
