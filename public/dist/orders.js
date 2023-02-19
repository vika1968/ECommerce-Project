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
const sessionString = sessionStorage.getItem(`orders`);
const ordersArray = JSON.parse(sessionString);
const btnBack = document.querySelector(`.btnBack`);
btnBack.addEventListener(`click`, goBackToProductsPage);
//--- Show all orders ----
getUserHistory('all categories');
//---- Return to Products page ----
function goBackToProductsPage() {
    try {
        window.location.href = `./products.html`;
        sessionStorage.clear();
    }
    catch (error) {
        console.error(error);
    }
}
//--- Get all data to show orders ----
function getUserHistory(filter) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const productsId = ordersArray;
            //@ts-ignore
            const { data } = yield axios.post(`/api/v1/products/get-product-title`, { productsId });
            const products = data.productsArray;
            showOrders(products, filter);
        }
        catch (error) {
            console.error(error);
        }
    });
}
//---- Show orders in table (default ==> 'all categories' ==>full array of products)
function showOrders(currentArray, filter) {
    try {
        currentArray.forEach((p) => {
            if (filter === 'all categories') {
                let row = fillTable(p);
                document.querySelector("table tbody").appendChild(row);
            }
            else {
                if (p.matchedCategory === filter) {
                    let row = fillTable(p);
                    document.querySelector("table tbody").appendChild(row);
                }
            }
        });
    }
    catch (error) {
        console.error(error);
    }
}
//---- Build table  -----
function fillTable(p) {
    let row = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let td4 = document.createElement("td");
    let td5 = document.createElement("td");
    td1.textContent = p.ordernumber;
    td2.textContent = p.matchedTitle;
    td3.textContent = p.date;
    td4.textContent = `$` + p.price;
    td5.textContent = `$` + p.totalprice;
    td1.style.textAlign = "center";
    td1.style.fontWeight = "bold";
    td2.style.textAlign = "center";
    td3.style.textAlign = "center";
    td4.style.textAlign = "center";
    td5.style.textAlign = "center";
    td5.style.fontWeight = "bold";
    td1.style.width = "100px";
    td2.style.width = "160px";
    td3.style.width = "100px";
    td4.style.width = "100px";
    td5.style.width = "70px";
    td5.style.color = "red";
    row.style.height = "20px";
    row.style.color = "rgb(81, 107, 107)";
    row.appendChild(td1);
    row.appendChild(td2);
    row.appendChild(td3);
    row.appendChild(td4);
    row.appendChild(td5);
    return row;
}
function cleanTable() {
    try {
        let tablename = document.querySelector("table");
        while (tablename.tBodies[0].rows[0]) {
            tablename.tBodies[0].deleteRow(0);
        }
    }
    catch (error) {
        console.error(error);
    }
}
let tablinks = document.querySelectorAll(".tablinks");
tablinks.forEach(b => b.addEventListener("click", showChosedCategory));
let activeTab = document.getElementById(tablinks[0].textContent);
//---- Show chosed category of products -----
function showChosedCategory(e) {
    try {
        cleanTable();
        getUserHistory(e.target.textContent.toLowerCase());
        // Get all element with class="tablinks" and remove class "active"
        let tablinks = document.getElementsByClassName("tablinks");
        for (let i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        e.currentTarget.className += " active";
    }
    catch (error) {
        console.error(error);
    }
}
