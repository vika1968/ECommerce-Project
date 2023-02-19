import express from "express";

import { saveOrder, showOrders } from "./ordersCtrl";
import { getProductById } from "./../products/productsCtrl";
import { logoutUser } from "./../users/usersCtrl";
const router = express.Router();

router
    .get("/logout", logoutUser)
    .get("/find/:_id", getProductById)
    .post("/save-order", saveOrder)
    .post("/show-order-history", showOrders)
   
export default router; 