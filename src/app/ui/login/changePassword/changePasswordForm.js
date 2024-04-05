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

console.log("resrt", resetPasswordBtn);
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

resetPasswordBtn.addEventListener("click", async (e) => {
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

    fetchHtmlFile("changePasswordSuccess.html", function (htmlString) {
      loginForm.innerHTML = htmlString;
      addScript("./changePasswordSuccess.js");
    });
  } catch (error) {
    console.log(error);
  }
});

async function validate() {
  const token = getUserToken();
  const response = await validateNewuserToken(token);
  console.log(response);
  const email = response.data;
  userEmail = email;
}

validate();

firstEye.addEventListener("click", (e) => {
  const use = document.querySelector("use");

  if (firstPasswordRef.type == "text") {
    firstPasswordRef.type = "password";
    use.setAttribute(
      "xlink:href",
      "../../../../../src/assets/icons/icons.svg#openEye"
    );
  } else {
    firstPasswordRef.type = "text";
    use.setAttribute(
      "xlink:href",
      "../../../../../src/assets/icons/icons.svg#closedEye"
    );
  }
});

secondEye.addEventListener("click", (e) => {
  const use = document.getElementById("secondEyeIcon");
  if (secondPasswordRef.type == "text") {
    secondPasswordRef.type = "password";
    use.setAttribute(
      "xlink:href",
      "../../../../../src/assets/icons/icons.svg#openEye"
    );
  } else {
    secondPasswordRef.type = "text";
    use.setAttribute(
      "xlink:href",
      "../../../../../src/assets/icons/icons.svg#closedEye"
    );
  }
});
