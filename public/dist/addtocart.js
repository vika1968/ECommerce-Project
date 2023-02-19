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
let cart = [];
let userID;
let totalMoney = 0;
//----Generate random order number----
const generateRandomOrderNumber = (minValue, maxValue) => {
    let randomNumber = Math.floor(Math.random() * (maxValue - minValue) + minValue);
    return Math.round(randomNumber);
};
const selectElement = document.querySelector('.selectBox');
selectElement.addEventListener('change', function handleChange(event) {
    handleChangeCategory(selectElement.options[selectElement.selectedIndex].value);
});
//----Change product category----
function handleChangeCategory(value) {
    try {
        if (value == "3") {
            handleGetChosedProducts('parfume');
        }
        else if (value == "4") {
            handleGetChosedProducts('lipstik');
        }
        else if (value == "5") {
            handleGetChosedProducts('mascara');
        }
        else if (value == "1" || value == "2") {
            handleGetAllProducts();
        }
    }
    catch (error) {
        console.error(error);
    }
}
//----- Get current user by cookie-----
function getUserFromCookie() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //@ts-ignore
            const { data } = yield axios.get("/api/v1/products/get-user-by-cookie");
            const { userDB } = data;
            userID = userDB._id;
            //@ts-ignore
            const user = document.querySelector(".userCookie");
            if (userDB) {
                user.innerText = `Welcome : ${userDB.username}`;
            }
            else {
                window.location.href = "./index.html";
            }
        }
        catch (error) {
            console.error(error);
        }
    });
}
//---- Get all products -----
function handleGetAllProducts() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //@ts-ignore
            const { data } = yield axios.get("/api/v1/products");
            const productsArray = data.productsDB;
            showAllProducts(productsArray);
        }
        catch (error) {
            console.error(error);
        }
    });
}
handleGetAllProducts();
//---- Show chosed category only -----
function handleGetChosedProducts(chosedCategory) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //@ts-ignore    
            const { data } = yield axios.post(`/api/v1/products/chosed`, { category: chosedCategory });
            const productsArray = data.productsDB;
            console.log(productsArray);
            showAllProducts(productsArray);
        }
        catch (error) {
            console.error(error);
        }
    });
}
//---- Get product by id -----
function handleGetProductById(prodID) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //@ts-ignore
            const { data } = yield axios.get(`/api/v1/products/find/${prodID}`);
            return data.prodID;
        }
        catch (error) {
            console.error(error);
        }
    });
}
//---- Show all products -----
function showAllProducts(product) {
    try {
        document.getElementById('root').innerHTML = ``;
        let i = 0;
        product.forEach((el) => {
            document.getElementById('root').innerHTML +=
                `<div class = 'box'>
            <div class ='img-box'>
                <img class ='images' src = ${el.image}></img>
            </div>
            <div class ='bottom'>
                <p>${el.title}</p>
                <h2>$ ${el.price}.00</h2>` +
                    "<button onclick='addToCart(`" + el._id + "`, `" + (i++) + "`)'>Add to cart</button>" +
                    `</div>
        </div>`;
        });
    }
    catch (error) {
        console.error(error);
    }
}
//---- Add the selected product to the cart -----
function addToCart(productId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let prod = yield handleGetProductById(productId);
            cart.push(prod);
            displayCart(cart);
        }
        catch (error) {
            console.error(error);
        }
    });
}
//---- Remove the selected product fro the cart -----
function delElement(a) {
    try {
        cart.splice(a, 1);
        displayCart(cart);
    }
    catch (error) {
        console.error(error);
    }
}
//---- Display cart -----
function displayCart(a) {
    try {
        let j = 0, total = 0;
        document.getElementById("count").innerText = cart.length;
        if (cart.lenght == 0) {
            document.getElementById('cartitem').innerHTML = "Your cart is empty";
            document.getElementById('total').innerHTML = "$ " + 0 + ".00";
        }
        else {
            document.getElementById('cartitem').innerHTML = ``;
            document.getElementById('cartitem').innerHTML = ``;
            cart.forEach((el) => {
                total = total + el.price;
                document.getElementById('cartitem').innerHTML +=
                    `<div class = 'cart-item'>
                    <div class = 'row-img'>
                         <img class ='rowimg' src = ${el.image}></img>
                    </div>
                    <p style = 'font-size:12px;'>${el.title}</p>
                    <h2 style = 'font-size:15px;'>$ ${el.price}.00</h2>` +
                        "<i class ='fa-solid fa-trash' onclick ='delElement(" + (j++) + ")'></i> " +
                        "</div>";
            });
            document.getElementById('total').innerHTML = "$ " + total + ".00";
            totalMoney = total;
        }
    }
    catch (error) {
        console.error(error);
    }
}
const readyOrder = document.querySelector(`.readyOrder`);
const viewOrders = document.querySelector(`.viewOrders`);
readyOrder.addEventListener(`click`, handleSaveCurrentOrder);
viewOrders.addEventListener(`click`, handleViewAllOrders);
//----Generate an order----- 
function handleSaveCurrentOrder() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let keys = Object.keys(cart);
            if (keys.length == 0) {
                alert(`You have not selected any product.`);
                return;
            }
            else {
                let idproduct;
                const date = new Date();
                let day = date.getDate();
                let month = date.getMonth();
                let year = date.getFullYear();
                let currentDate = `${day}-${month}-${year}`;
                let price;
                const totalprice = totalMoney;
                const orderNumber = generateRandomOrderNumber(10000, 40000);
                cart.forEach((el) => {
                    idproduct = el._id;
                    price = el.price;
                    insertOrderIntoDB(idproduct, currentDate, price, totalprice, orderNumber);
                });
                alert(`Your order was successfuly saved.`);
                cart = [];
                displayCart(cart);
            }
        }
        catch (error) {
            console.error(error);
        }
    });
}
//---- Insert order into DB----- 
function insertOrderIntoDB(idproduct, currentDate, price, totalprice, orderNumber) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //@ts-ignore
            const { data } = yield axios.post("/api/v1/orders/save-order", { iduser: userID, idproduct, date: currentDate, price, totalprice, ordernumber: orderNumber });
            const { success } = data;
            console.log(data);
            if (success) {
                console.log(`${idproduct} product was successfuly saved`);
            }
            else {
                console.log("We have a problem with saving your order.");
            }
        }
        catch (error) {
            console.error(error);
        }
    });
}
//---- Show all orders of current user----- 
function handleViewAllOrders() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //@ts-ignore
            const { data } = yield axios.post("/api/v1/orders/show-order-history", { iduser: userID });
            const { success, ordersDB } = data;
            if (success) {
                sessionStorage.setItem('orders', JSON.stringify(data.ordersDB));
                console.log("All orders have been successfully uploaded");
                window.location.href = `./orders.html`;
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
const homePage = document.querySelector(`.homePage`);
console.log(homePage);
homePage.addEventListener(`click`, handleLogout);
//---- Logout User ----- 
function handleLogout() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //@ts-ignore
            const { data } = yield axios.get("/api/v1/users/logout");
            const { logout } = data;
            if (logout)
                window.location.href = "./index.html";
        }
        catch (error) {
            console.error(error);
        }
    });
}
