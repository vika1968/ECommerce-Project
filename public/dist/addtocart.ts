let cart: any = [];
let userID: string;
let totalMoney: number = 0;

//----Generate random order number----
const generateRandomOrderNumber = (minValue: number, maxValue: number) => {
    let randomNumber: number = Math.floor(Math.random() * (maxValue - minValue) + minValue);
    return Math.round(randomNumber);
};

const selectElement = document.querySelector('.selectBox') as HTMLSelectElement;
selectElement.addEventListener('change', function handleChange(event: any) {
    handleChangeCategory(selectElement.options[selectElement.selectedIndex].value);
});

//----Change product category----
function handleChangeCategory(value: any) {
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

    } catch (error) {
        console.error(error);
    }
}

//----- Get current user by cookie-----
async function getUserFromCookie() {
    try {

        //@ts-ignore
        const { data } = await axios.get("/api/v1/products/get-user-by-cookie");
        const { userDB } = data;
        userID = userDB._id;

        //@ts-ignore
        const user = document.querySelector(".userCookie") as HTMLHeadElement;

        if (userDB) {
            user.innerText = `Welcome : ${userDB.username}`;
        }
        else {
            window.location.href = "./index.html";
        }

    } catch (error) {
        console.error(error);
    }
}

//---- Get all products -----
async function handleGetAllProducts() {
    try {

        //@ts-ignore
        const { data } = await axios.get("/api/v1/products");
        const productsArray = data.productsDB;

        showAllProducts(productsArray);

    } catch (error) {
        console.error(error);
    }
}

handleGetAllProducts();

//---- Show chosed category only -----
async function handleGetChosedProducts(chosedCategory: string) {
    try {

        //@ts-ignore    
        const { data } = await axios.post(`/api/v1/products/chosed`, { category: chosedCategory });
        const productsArray = data.productsDB;
        console.log(productsArray);

        showAllProducts(productsArray);

    } catch (error) {
        console.error(error);
    }
}

//---- Get product by id -----
async function handleGetProductById(prodID: string) {
    try {

        //@ts-ignore
        const { data } = await axios.get(`/api/v1/products/find/${prodID}`);

        return data.prodID;

    } catch (error) {
        console.error(error);
    }
}

//---- Show all products -----
function showAllProducts(product: []) {
    try {

        document.getElementById('root')!.innerHTML = ``;

        let i: number = 0;
        product.forEach((el: any) => {

            document.getElementById('root')!.innerHTML +=
            `<div class = 'box'>
            <div class ='img-box'>
                <img class ='images' src = ${el.image}></img>
            </div>
            <div class ='bottom'>
                <p>${el.title}</p>
                <h2>$ ${el.price}.00</h2>` +
                "<button onclick='addToCart(`" + el._id + "`, `" + (i++) + "`)'>Add to cart</button>" +
                `</div>
        </div>`
        });

    } catch (error) {
        console.error(error);
    }
}

//---- Add the selected product to the cart -----
async function addToCart(productId: string) {
    try {

        let prod = await handleGetProductById(productId);
        cart.push(prod);
        displayCart(cart);

    } catch (error) {
        console.error(error);
    }
}

//---- Remove the selected product fro the cart -----
function delElement(a: any) {
    try {

        cart.splice(a, 1);
        displayCart(cart);

    } catch (error) {
        console.error(error);
    }
}

//---- Display cart -----
function displayCart(a: any) {
    try {

        let j: number = 0, total: number = 0;

        (document.getElementById("count") as HTMLParagraphElement).innerText = cart.length;
        if (cart.lenght == 0) {
            (document.getElementById('cartitem') as HTMLDivElement).innerHTML = "Your cart is empty";
            document.getElementById('total')!.innerHTML = "$ " + 0 + ".00";
        }
        else {
            (document.getElementById('cartitem') as HTMLDivElement).innerHTML = ``;
            (document.getElementById('cartitem') as HTMLHeadElement).innerHTML = ``;

            cart.forEach((el: any) => {
                total = total + el.price;
                (document.getElementById('cartitem') as HTMLDivElement).innerHTML +=
                    `<div class = 'cart-item'>
                    <div class = 'row-img'>
                         <img class ='rowimg' src = ${el.image}></img>
                    </div>
                    <p style = 'font-size:12px;'>${el.title}</p>
                    <h2 style = 'font-size:15px;'>$ ${el.price}.00</h2>` +
                    "<i class ='fa-solid fa-trash' onclick ='delElement(" + (j++) + ")'></i> " +
                    "</div>"
            }
            );
            document.getElementById('total')!.innerHTML = "$ " + total + ".00";
            totalMoney = total;
        }

    } catch (error) {
        console.error(error);
    }
}

const readyOrder = document.querySelector(`.readyOrder`) as HTMLButtonElement;
const viewOrders = document.querySelector(`.viewOrders`) as HTMLButtonElement;

readyOrder.addEventListener(`click`, handleSaveCurrentOrder);
viewOrders.addEventListener(`click`, handleViewAllOrders);

//----Generate an order----- 
async function handleSaveCurrentOrder() {
    try {

        let keys = Object.keys(cart);

        if (keys.length == 0) {
            alert(`You have not selected any product.`);
            return
        }
        else {
            let idproduct: string;
            const date = new Date();
            let day = date.getDate();
            let month = date.getMonth();
            let year = date.getFullYear();
            let currentDate = `${day}-${month}-${year}`;
            let price: number;
            const totalprice: number = totalMoney;
            const orderNumber: number = generateRandomOrderNumber(10000, 40000);

            cart.forEach((el: any) => {
                idproduct = el._id;
                price = el.price;

                insertOrderIntoDB(idproduct, currentDate, price, totalprice, orderNumber);
            }
            );

            alert(`Your order was successfuly saved.`);

            cart = [];
            displayCart(cart);
        }

    } catch (error) {
        console.error(error);
    }
}

//---- Insert order into DB----- 
async function insertOrderIntoDB(idproduct: string, currentDate: string, price: number, totalprice: number, orderNumber: number) {
    try {

        //@ts-ignore
        const { data } = await axios.post("/api/v1/orders/save-order", { iduser: userID, idproduct, date: currentDate, price, totalprice, ordernumber: orderNumber });
        const { success } = data;

        console.log(data);
        if (success) {
            console.log(`${idproduct} product was successfuly saved`);
        }
        else {
            console.log("We have a problem with saving your order.");
        }

    } catch (error) {
        console.error(error);
    }
}

//---- Show all orders of current user----- 
async function handleViewAllOrders() {
    try {

        //@ts-ignore
        const { data } = await axios.post("/api/v1/orders/show-order-history", { iduser: userID });
        const { success, ordersDB } = data;

        if (success) {
            sessionStorage.setItem('orders', JSON.stringify(data.ordersDB));
            console.log("All orders have been successfully uploaded");
            window.location.href = `./orders.html`;
        }
        else {
            console.log("Warning.Error!!!!");
        }

    } catch (error) {
        console.error(error);
    }
}

const homePage = document.querySelector(`.homePage`) as HTMLDivElement;
console.log(homePage)
homePage.addEventListener(`click`, handleLogout);

//---- Logout User ----- 
async function handleLogout() {
    try {
      //@ts-ignore
      const { data } = await axios.get("/api/v1/users/logout");
      const { logout } = data;
      if (logout) window.location.href = "./index.html"
    } catch (error) {
      console.error(error);
    }
  }
