import express from "express";
import UserModel, { UserValidation } from "./userModel";
import bcrypt from "bcrypt";
import jwt from "jwt-simple";
const saltRounds = 10;


//---- Register new user -----
export async function register(req: express.Request, res: express.Response) {
  try {

    const { username, password } = req.body;

    if (!username || !password) throw new Error("Not all requered fields from client on FUNCTION register in file userCtrl");

    const { error } = UserValidation.validate({
      username,
      password
    });
    if (error) throw error;

    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    const userDB = new UserModel({ username, password: hash });
    await userDB.save();

    const cookie = { userId: userDB._id };
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("Couldn't load secret from .env");
    if (!userDB) throw new Error("No user was created");

    const JWTCookie = jwt.encode(cookie, secret);

    if (userDB) {
      res.cookie("userID", JWTCookie);
      res.send({ success: true, userDB });
    } else {
      res.send({ register: false });
    }

  } catch (error: any) {
    res.status(500).send({ success: false, error: error.message });
  }
}


//---- Login user -----
export async function login(req: express.Request, res: express.Response) {
  try {

    const { username, password } = req.body;

    const userDB = await UserModel.findOne({ username });
    if (!userDB) throw new Error("Username (email) don't match");

    const isMatch = await bcrypt.compare(password, userDB.password!);
    if (!isMatch) throw new Error("Username (email) and Password don't match");

    const cookie = { userId: userDB._id };
    const secret = process.env.JWT_SECRET;

    if (!secret) throw new Error("Couldn't load secret from .env");
    const JWTCookie = jwt.encode(cookie, secret);

    res.cookie("userID", JWTCookie);
    res.send({ success: true, userDB: userDB });
  } catch (error: any) {
    res.status(500).send({ success: false, error: error.message });
  }
}

//---- Get user by Cookie-----
export async function getUser(req: express.Request, res: express.Response) {
  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("Couldn't load secret from .env");

    const { userID } = req.cookies;
    console.log(userID);
    if (!userID) throw new Error("Couldn't find user from cookies");

    const decodedUserId = jwt.decode(userID, secret);
    const { userId } = decodedUserId;

    const userDB = await UserModel.findById(userId);
    if (!userDB)
      throw new Error(`Couldn't find user id with the id: ${userID}`);

    res.send({ userDB });

  } catch (error) {
    res.send({ error: error.message });
  }
}

//---- Logout user-----
export async function logoutUser(req: express.Request, res: express.Response) {
  try {

    res.clearCookie("userID");
    res.send({ logout: true });

  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
}




