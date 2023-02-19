import express from "express";

import { getAllProducts, getProductById, showUser, insertProducts, getProductByCategory, getAllUsersProducts } from "./productsCtrl";

const router = express.Router();

router
  .get("", getAllProducts) 
  .get("/get-user-by-cookie", showUser)
  .get("/find/:_id", getProductById)
  .post("/get-product-title", getAllUsersProducts)
  .post("/insert-products", insertProducts) 
  .post("/chosed", getProductByCategory)
 
export default router; 

