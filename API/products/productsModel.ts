import mongoose from "mongoose";

const ProductsSchema = new mongoose.Schema({   
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

const ProductsModel = mongoose.model("products", ProductsSchema);

export default ProductsModel;





