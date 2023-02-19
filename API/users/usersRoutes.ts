import express from "express";
import { getUser, login, register, logoutUser } from "./usersCtrl";

const router = express.Router();

router
  .get("/logout", logoutUser)
  .get("/get-user-by-cookie", getUser)
  .post("/login", login)
  .post("/register", register) 

export default router;

 