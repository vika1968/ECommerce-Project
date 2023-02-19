"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usersCtrl_1 = require("./usersCtrl");
const router = express_1.default.Router();
router
    .get("/logout", usersCtrl_1.logoutUser)
    .get("/get-user-by-cookie", usersCtrl_1.getUser)
    .post("/login", usersCtrl_1.login)
    .post("/register", usersCtrl_1.register);
exports.default = router;
