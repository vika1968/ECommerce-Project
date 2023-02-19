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
exports.getAllUsersProducts = exports.getProductByCategory = exports.getProductById = exports.getAllProducts = exports.insertProducts = exports.showUser = void 0;
const productsModel_1 = __importDefault(require("./productsModel"));
const userModel_1 = __importDefault(require("../users/userModel"));
const jwt_simple_1 = __importDefault(require("jwt-simple"));
//--- Show user ----
function showUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const secret = process.env.JWT_SECRET;
            if (!secret)
                throw new Error("Couldn't load secret from .env");
            const { userID } = req.cookies;
            if (!userID)
                throw new Error("Couldn't find user from cookies");
            const decodedUserId = jwt_simple_1.default.decode(userID, secret);
            const { userId } = decodedUserId;
            const userDB = yield userModel_1.default.findById(userId);
            if (!userDB)
                throw new Error(`Couldn't find user id with the id: ${userID}`);
            res.send({ userDB });
        }
        catch (error) {
            res.send({ error: error.message });
        }
    });
}
exports.showUser = showUser;
//--- Insert products into DB ----
function insertProducts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { category, image, title, price } = req.body;
            if (!category || !image || !title || !price)
                throw new Error("Problem on FUNCTION insertProducts in file productsCtrl");
            const productsCollection = yield productsModel_1.default.create({ category, image, title, price });
            if (!productsCollection)
                throw new Error("ProductsModel table with products wasn't created");
            if (productsCollection) {
                res.send({ success: true });
            }
            else {
                res.send({ success: false });
            }
        }
        catch (error) {
            res.status(500).send({ error: error.message });
        }
    });
}
exports.insertProducts = insertProducts;
//---- Get all produsta
function getAllProducts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const productsDB = yield productsModel_1.default.find();
            res.send({ productsDB });
        }
        catch (error) {
            res.status(500).send({ error: error.message });
        }
    });
}
exports.getAllProducts = getAllProducts;
//--- Get product by id
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
//--- Get product by category ----
function getProductByCategory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { category: chosedCategory } = req.body;
            const productsDB = yield productsModel_1.default.find({ 'category': chosedCategory });
            if (productsDB) {
                res.send({ success: true, productsDB });
            }
            else {
                res.send({ success: false });
            }
        }
        catch (error) {
            res.status(500).send({ error: error.message });
        }
    });
}
exports.getProductByCategory = getProductByCategory;
let products = [];
//--- Get all products ----
function getAllUsersProducts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { productsId } = req.body;
            yield productsId.forEach((product) => __awaiter(this, void 0, void 0, function* () {
                let productInfo = yield productsModel_1.default.findById(product.idproduct);
                products.push({ iduser: product.iduser, idproduct: product.idproduct, date: product.date, price: product.price, totalprice: product.totalprice, ordernumber: product.ordernumber, matchedTitle: productInfo.title, matchedCategory: productInfo.category });
            }));
            res.send({ success: true, productsArray: products });
            products = [];
        }
        catch (error) {
            res.status(500).send({ success: false, error: error.message });
        }
    });
}
exports.getAllUsersProducts = getAllUsersProducts;
