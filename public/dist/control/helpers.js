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
//----Temporary array for adding alements to the DB----
const product = [
    {
        category: "mascara",
        image: 'images/mascara1.jpg',
        title: 'Loreal',
        price: 55,
    },
    {
        category: "lipstik",
        image: 'images/mascara2.jpg',
        title: 'Dior',
        price: 40,
    },
    {
        category: "lipstik",
        image: 'images/mascara3.jpg',
        title: 'Giorgio Armani',
        price: 80,
    },
    {
        category: "mascara",
        image: 'images/mascara4.jpg',
        title: 'MAC Cosmetics',
        price: 45,
    },
    {
        category: "mascara",
        image: 'images/mascara5.jpg',
        title: 'Fenty Beauty',
        price: 60,
    },
    {
        category: "mascara",
        image: 'images/mascara6.jpg',
        title: 'Chanel',
        price: 90,
    },
    {
        category: "mascara",
        image: 'images/7mascara7.jpg',
        title: 'Covergirl Outlast',
        price: 35,
    },
    {
        category: "mascara",
        image: 'images/mascara8.jpg',
        title: ' Victoria Beckham',
        price: 45,
    },
    {
        category: "mascara",
        image: 'images/mascara9.jpg',
        title: 'Tom Ford',
        price: 100,
    }
];
//----- Temporal procedure for adding elements to the collection (DB)-----
function insertProductsIntoDataBase(category, image, title, price) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //@ts-ignore
            const { data } = yield axios.post("/api/v1/products/insert-products", { category, image, title, price });
            const { success } = data;
            if (!success) {
                console.log("All products were successfuly inserted");
            }
            else {
                console.log("Warning.Error!!!!");
            }
        }
        catch (error) {
            console.error(error);
        }
    });
}
// ---- Run temporal procedure for adding elements to the collection (DB) 1 time only-----
//   for (let i=0; i < product.length; i++) {
//     insertProductsToCollection(product[i].category, product[i].image, product[i].title, product[i].price)
//     console.log (product[i].category, product[i].image, product[i].title, product[i].price) 
//    }
