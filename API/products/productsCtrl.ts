import express from "express";
import ProductsModel from "./productsModel";
import UserModel from "../users/userModel";
import jwt from "jwt-simple";

//--- Show user ----
export async function showUser(req: express.Request, res: express.Response) {
  try {

    const secret = process.env.JWT_SECRET;

    if (!secret) throw new Error("Couldn't load secret from .env");

    const { userID } = req.cookies;

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

//--- Insert products into DB ----
export async function insertProducts(req: express.Request, res: express.Response) {
  try {

    const { category, image, title, price } = req.body;

    if (!category || !image || !title || !price) throw new Error("Problem on FUNCTION insertProducts in file productsCtrl");

    const productsCollection = await ProductsModel.create({ category, image, title, price });
    if (!productsCollection) throw new Error("ProductsModel table with products wasn't created");

    if (productsCollection) {
      res.send({ success: true });
    } else {
      res.send({ success: false });
    }

  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
}

//---- Get all produsta
export async function getAllProducts(req: express.Request, res: express.Response) {
  try {
    
    const productsDB = await ProductsModel.find();
    res.send({ productsDB });

  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

//--- Get product by id
export async function getProductById(req: express.Request, res: express.Response) {
  try {

    const prodID = await ProductsModel.findById(req.params._id);
    res.send({ prodID });

  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

//--- Get product by category ----
export async function getProductByCategory(req: express.Request, res: express.Response) {
  try {

    const { category: chosedCategory } = req.body;

    const productsDB = await ProductsModel.find({ 'category': chosedCategory });

    if (productsDB) {
      res.send({ success: true, productsDB });
    } else {
      res.send({ success: false });
    }

  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
}

let  products: any[] = [];


//--- Get all products ----
export async function getAllUsersProducts(req: express.Request, res: express.Response) {
  try {

     const { productsId } = req.body;      
   
     await productsId.forEach( async (product: any) => {
   
     let productInfo = await ProductsModel.findById(product.idproduct);  
      
     products.push({ iduser: product.iduser, idproduct: product.idproduct, date: product.date, price: product.price, totalprice: product.totalprice, ordernumber: product.ordernumber, matchedTitle: productInfo!.title, matchedCategory: productInfo!.category});
   
    })

    res.send({ success: true, productsArray: products});
    products = [];

  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
}



