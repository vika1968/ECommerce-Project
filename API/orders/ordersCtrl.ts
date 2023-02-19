import express from "express";
import OrdersModel from "./ordersModel";
import ProductsModel from "./../products/productsModel";

//---- Save order ----
export async function saveOrder(req: express.Request, res: express.Response) {
  try {
    const { iduser, idproduct, date: currentDate, price, totalprice, ordernumber: orderNumber } = req.body;

    if (!iduser || !idproduct || !currentDate || !price || !totalprice || !orderNumber) throw new Error("Not all requered fields from client on FUNCTION saveOrder in file ordersCtrl");

    const orderToSave = await OrdersModel.create({ iduser, idproduct, date: currentDate, price, totalprice, ordernumber: orderNumber });

    if (!orderToSave) throw new Error("Order wasn't saved");

    if (orderToSave) {
      res.send({ success: true });
    } else {
      res.send({ success: false });
    }
    
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
}

//---- Find orders by user ----
export async function showOrders(req: express.Request, res: express.Response) {
  try {
    const { iduser: userID } = req.body;
    if (!userID) throw new Error("Not all requered fields from client on FUNCTION showOrders in file ordersCtrl");
   
    const ordersDB = await OrdersModel.find({ iduser: userID });

    res.send({ success: true, ordersDB });

  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
}

//---- Get product by id ----
export async function getProductById(req: express.Request, res: express.Response) {
  try {
    const prodID = await ProductsModel.findById(req.params._id);

    res.send({ prodID });

  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}





