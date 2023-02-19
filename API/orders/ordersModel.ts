import mongoose from "mongoose";

const OrdersSchema = new mongoose.Schema({
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
    }
    ,
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

const OrdersModel = mongoose.model("orders", OrdersSchema);

export default OrdersModel;