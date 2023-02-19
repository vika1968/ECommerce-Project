"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductById = exports.showOrders = exports.saveOrder = void 0;
const ordersModel_1 = __importDefault(require("./ordersModel"));
const productsModel_1 = __importDefault(require("./../products/productsModel"));
//---- Save order ----
function saveOrder(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { iduser, idproduct, date: currentDate, price, totalprice, ordernumber: orderNumber } = req.body;
            if (!iduser || !idproduct || !currentDate || !price || !totalprice || !orderNumber)
                throw new Error("Not all requered fields from client on FUNCTION saveOrder in file ordersCtrl");
            const orderToSave = yield ordersModel_1.default.create({ iduser, idproduct, date: currentDate, price, totalprice, ordernumber: orderNumber });
            if (!orderToSave)
                throw new Error("Order wasn't saved");
            if (orderToSave) {
                res.send({ success: true });
            }
            else {
                res.send({ success: false });
            }
        }
        catch (error) {
            res.status(500).send({ success: false, error: error.message });
        }
    });
}
exports.saveOrder = saveOrder;
//---- Find orders by user ----
function showOrders(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { iduser: userID } = req.body;
            if (!userID)
                throw new Error("Not all requered fields from client on FUNCTION showOrders in file ordersCtrl");
            const ordersDB = yield ordersModel_1.default.find({ iduser: userID });
            res.send({ success: true, ordersDB });
        }
        catch (error) {
            res.status(500).send({ success: false, error: error.message });
        }
    });
}
exports.showOrders = showOrders;
//---- Get product by id ----
function getProductById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const prodID = yield productsModel_1.default.findById(req.params._id);
            res.send({ prodID });
        }
        catch (error) {
            res.status(500).send({ error: error.message });
        }
    });
}
exports.getProductById = getProductById;
