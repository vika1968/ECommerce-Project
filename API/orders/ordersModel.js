"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const OrdersSchema = new mongoose_1.default.Schema({
    iduser: {
        type: String,
        unique: false,
        requiered: true
    },
    idproduct: {
        type: String,
        unique: false,
        requiered: true
    },
    date: {
        type: String,
        unique: false,
        requiered: true
    },
    price: {
        type: Number,
        unique: false,
        requiered: true
    },
    totalprice: {
        type: Number,
        unique: false,
        requiered: true
    },
    ordernumber: {
        type: Number,
        unique: false,
        requiered: true
    },
});
const OrdersModel = mongoose_1.default.model("orders", OrdersSchema);
exports.default = OrdersModel;
