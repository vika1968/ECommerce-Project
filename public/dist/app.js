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
let whatClicked = `undefined`;
const loginHeader = document.querySelector(`.loginHeader`);
loginHeader.addEventListener(`click`, makeActiveLogin);
const registerHeader = document.querySelector(`.registerHeader`);
registerHeader.addEventListener(`click`, makeActiveRegister);
const frmLogin = document.querySelector(`.frmLogin`);
frmLogin.addEventListener(`submit`, handleLoginOrRegister);
const button = document.querySelector(`.signin`);
//---- Login or Register user ----
function handleNewUserOrAlreadyRegistered() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //@ts-ignore
            const { data } = yield axios.get("/api/v1/users/get-user-by-cookie");
            const { userDB } = data;
            //@ts-ignore
            if (userDB && (performance.getEntriesByType("navigation")[0].type == "reload" || performance.getEntriesByType("navigation")[0].type == "navigate")) {
                console.log(`The page was manually reloaded or first entry to the page.`);
                window.location.href = "./products.html";
            }
        }
        catch (error) {
            console.error(error);
        }
    });
}
//----- Case user chosed Login option-----
function makeActiveLogin(event) {
    try {
        whatClicked = `Login`;
        loginHeader.style.borderBottom = `2px solid white`;
        loginHeader.style.color = `white`;
        registerHeader.style.borderBottom = `none`;
        registerHeader.style.color = `rgba(255, 255, 255, 0.5)`;
        button.innerHTML = `Login`;
    }
    catch (error) {
        console.error(error);
    }
}
//----- Case user chosed Register option-----
function makeActiveRegister(event) {
    try {
        whatClicked = `Register`;
        registerHeader.style.borderBottom = `2px solid white`;
        registerHeader.style.color = `white`;
        loginHeader.style.borderBottom = `none`;
        loginHeader.style.color = `rgba(255, 255, 255, 0.5)`;
        button.innerHTML = `Register`;
    }
    catch (error) {
        console.error(error);
    }
}
//---- Login old user or rgister new user ----
function handleLoginOrRegister(event) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            event.preventDefault();
            const username = event.target.elements.idUserName.value;
            const password = event.target.elements.idPassword.value;
            if (!username) {
                alert(`Please, fill username field!`);
                return;
            }
            if (!password) {
                alert(`Please, fill password field!`);
                return;
            }
            let rout;
            if (whatClicked == `Register`) {
                rout = "/api/v1/users/register";
            }
            else {
                rout = "/api/v1/users/login";
            }
            //@ts-ignore
            const { data } = yield axios.post(rout, { username, password });
            const { success, userDB } = data;
            if (!success) {
                if (whatClicked == `Register`) {
                    throw new Error('Something went wrong.');
                }
                else {
                    alert("UserName and Password do not match.");
                }
            }
            else {
                window.location.href = "./products.html";
            }
        }
        catch (error) {
            console.error(error);
        }
    });
}
