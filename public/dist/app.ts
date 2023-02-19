
let whatClicked: string = `undefined`;
const loginHeader = document.querySelector(`.loginHeader`) as HTMLHeadElement;
loginHeader.addEventListener(`click`, makeActiveLogin);
const registerHeader = document.querySelector(`.registerHeader`) as HTMLHeadElement;
registerHeader.addEventListener(`click`, makeActiveRegister);
const frmLogin = document.querySelector(`.frmLogin`) as HTMLFormElement;
frmLogin.addEventListener(`submit`, handleLoginOrRegister);
const button = document.querySelector(`.signin`) as HTMLButtonElement;

//---- Login or Register user ----
async function handleNewUserOrAlreadyRegistered() {
  try {

    //@ts-ignore
    const { data } = await axios.get("/api/v1/users/get-user-by-cookie");
    const { userDB } = data;

    //@ts-ignore
    if (userDB && (performance.getEntriesByType("navigation")[0].type == "reload" || performance.getEntriesByType("navigation")[0].type == "navigate")) {
      console.log(`The page was manually reloaded or first entry to the page.`);
      window.location.href = "./products.html";
    }

  } catch (error) {
    console.error(error);
  }
}

//----- Case user chosed Login option-----
function makeActiveLogin(event: any) {
  try {

    whatClicked = `Login`;
    loginHeader.style.borderBottom = `2px solid white`;
    loginHeader.style.color = `white`;
    registerHeader.style.borderBottom = `none`;
    registerHeader.style.color = `rgba(255, 255, 255, 0.5)`;
    button.innerHTML = `Login`;

  } catch (error) {
    console.error(error);
  }
}

//----- Case user chosed Register option-----
function makeActiveRegister(event: any) {
  try {

    whatClicked = `Register`;
    registerHeader.style.borderBottom = `2px solid white`;
    registerHeader.style.color = `white`;
    loginHeader.style.borderBottom = `none`;
    loginHeader.style.color = `rgba(255, 255, 255, 0.5)`;
    button.innerHTML = `Register`;

  } catch (error) {
    console.error(error);
  }
}

//---- Login old user or rgister new user ----
async function handleLoginOrRegister(event: any) {
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

    let rout: string;

    if (whatClicked == `Register`) {
      rout = "/api/v1/users/register";
    }
    else {
      rout = "/api/v1/users/login";
    }

    //@ts-ignore
    const { data } = await axios.post(rout, { username, password });
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

  } catch (error) {
    console.error(error);
  }
}
