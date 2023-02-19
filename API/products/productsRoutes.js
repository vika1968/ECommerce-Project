"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productsCtrl_1 = require("./productsCtrl");
const router = express_1.default.Router();
router
    .get("", productsCtrl_1.getAllProducts)
    .get("/get-user-by-cookie", productsCtrl_1.showUser)
    .get("/find/:_id", productsCtrl_1.getProductById)
    .post("/get-product-title", productsCtrl_1.getAllUsersProducts)
    .post("/insert-products", productsCtrl_1.insertProducts)
    .post("/chosed", productsCtrl_1.getProductByCategory);
exports.default = router;
