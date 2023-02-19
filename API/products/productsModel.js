"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ProductsSchema = new mongoose_1.default.Schema({
    category: {
        type: String,
        unique: false,
        requiered: true
    },
    image: {
        type: String,
        unique: false,
        requiered: true
    },
    title: {
        type: String,
        unique: false,
        requiered: true
    },
    price: {
        type: Number,
        unique: false,
        requiered: true
    }
});
const ProductsModel = mongoose_1.default.model("products", ProductsSchema);
exports.default = ProductsModel;
