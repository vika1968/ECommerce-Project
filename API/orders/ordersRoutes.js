"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ordersCtrl_1 = require("./ordersCtrl");
const productsCtrl_1 = require("./../products/productsCtrl");
const usersCtrl_1 = require("./../users/usersCtrl");
const router = express_1.default.Router();
router
    .get("/logout", usersCtrl_1.logoutUser)
    .get("/find/:_id", productsCtrl_1.getProductById)
    .post("/save-order", ordersCtrl_1.saveOrder)
    .post("/show-order-history", ordersCtrl_1.showOrders);
exports.default = router;
