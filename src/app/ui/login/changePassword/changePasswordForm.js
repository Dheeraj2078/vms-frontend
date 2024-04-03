import {
  updatePassword,
  validateNewuserToken,
} from "../../../service/loginApi.js";
import { addStyles, addScript, fetchHtmlFile } from "../../../util/util.js";

const resetPasswordBtn = document.getElementById("reset-password-button");
const firstPasswordRef = document.getElementsByClassName("firstPassword")[0];
const secondPasswordRef = document.getElementsByClassName("secondPassword")[0];
const notSamePassword = document.getElementsByClassName("not-same-password")[0];
const emptyPassword = document.getElementsByClassName("empty-password")[0];
const loginForm = document.getElementsByClassName("auth-right")[0];
const firstEye = document.getElementsByClassName("firstEye")[0];
const secondEye = document.getElementsByClassName("secondEye")[0];

let firstPassword = "";
let secondPassword = "";
let userEmail = "";

const removeCredientialInfo = () => {
  if (!notSamePassword.classList.contains("hidden")) {
    notSamePassword.classList.add("hidden");
  }

  if (!emptyPassword.classList.contains("hidden")) {
    emptyPassword.classList.add("hidden");
  }
};

firstPasswordRef.addEventListener("input", (e) => {
  removeCredientialInfo();
  firstPassword = e.target.value;
});

secondPasswordRef.addEventListener("input", (e) => {
  removeCredientialInfo();
  secondPassword = e.target.value;
});

const getUserToken = () => {
  const url = window.location.href;
  let i = url.indexOf("#");
  const token = url.substring(i + 2);
  return token;
};

console.log(resetPasswordBtn);
resetPasswordBtn.addEventListener("click", async (e) => {
  console.log(firstPassword);
  console.log(secondPassword);

  if (firstPassword == "" || secondPassword == "") {
    emptyPassword.classList.remove("hidden");
    return;
  }

  if (firstPassword != secondPassword) {
    notSamePassword.classList.remove("hidden");
    return;
  }

  const token = getUserToken();
  const loginData = {
    email: userEmail,
    password: firstPassword,
  };

  try {
    const updatedPassword = await updatePassword(token, loginData);
    console.log(updatedPassword);

    fetchHtmlFile("changePasswordSuccess.html", function (htmlString) {
      loginForm.innerHTML = htmlString;
      addScript("./changePasswordSuccess.js");
      addStyles("./changePasswordSuccess.css");
    });
  } catch (error) {
    console.log(error);
  }
});

async function validate() {
  const token = getUserToken();
  console.log("t", token);
  const response = await validateNewuserToken(token);
  console.log("validate new user token", response);
  const email = response.data.email;
  if (email == null) {
    alert("email doesn't exist");
  }

  //   showEmail.innerHTML = email;
  userEmail = email;
}

validate();

firstEye.addEventListener("click", (e) => {
  if (firstPasswordRef.type == "text") {
    firstPasswordRef.type = "password";
    firstEye.src = "./../../../../../assets/openEye.png";
  } else {
    firstPasswordRef.type = "text";
    firstEye.src = "./../../../../../assets/closedEye.png";
  }
});

secondEye.addEventListener("click", (e) => {
  if (secondPasswordRef.type == "text") {
    secondPasswordRef.type = "password";
    secondEye.src = "./../../../../../assets/openEye.png";
  } else {
    secondPasswordRef.type = "text";
    secondEye.src = "./../../../../../assets/closedEye.png";
  }
});
