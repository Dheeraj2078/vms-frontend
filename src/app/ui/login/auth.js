import { login } from "../../service/loginApi.js";
import { localStorageKeys, baseUrlLogin } from "../../util/constants.js";
import {
  addScript,
  addStyles,
  decodeJwt,
  fetchHtmlFile,
} from "../../util/util.js";
const eye = document.getElementsByClassName("closedEyeImage")[0];

const emailRef = document.getElementById("email");
const passwordRef = document.getElementById("password");
const notEmailPassword =
  document.getElementsByClassName("not-email-password")[0];
const notEmail = document.getElementsByClassName("not-email")[0];
const notPassword = document.getElementsByClassName("not-password")[0];
const loginBtn = document.getElementsByClassName("login-button")[0];
const forgotPassword = document.getElementById("forgotPassword");
const loginForm = document.getElementsByClassName("login-form")[0];

let email = "";
let password = "";

function removeCredientialInfo() {
  if (!notEmailPassword.classList.contains("hidden")) {
    notEmailPassword.classList.add("hidden");
  }
  if (!notEmail.classList.contains("hidden")) {
    notEmail.classList.add("hidden");
  }
  if (!notPassword.classList.contains("hidden")) {
    notPassword.classList.add("hidden");
  }
}

emailRef.addEventListener("input", (e) => {
  if (emailRef.classList.contains("empty-field-border")) {
    emailRef.classList.remove("empty-field-border");
  }

  removeCredientialInfo();
  email = e.target.value;
});

passwordRef.addEventListener("input", (e) => {
  if (passwordRef.classList.contains("empty-field-border")) {
    passwordRef.classList.remove("empty-field-border");
  }

  removeCredientialInfo();
  password = e.target.value;
});

loginBtn.addEventListener("click", async (e) => {
  const loginData = {
    email,
    password,
  };

  if (email == "" && password == "") {
    emailRef.classList.add("empty-field-border");
    passwordRef.classList.add("empty-field-border");
    notEmailPassword.classList.remove("hidden");
    return;
  }

  if (email == "") {
    emailRef.classList.add("empty-field-border");
    notEmail.classList.remove("hidden");
    return;
  }

  if (password == "") {
    passwordRef.classList.add("empty-field-border");
    notPassword.classList.remove("hidden");
    return;
  }

  try {
    const response = await login(loginData);
    const token = response.data.token.token;

    if (token) {
      try {
        const tokenInfo = decodeJwt(token);
        localStorage.setItem(localStorageKeys.token, token);
        localStorage.setItem(
          localStorageKeys.unique_name,
          tokenInfo.payload.unique_name
        );
        localStorage.setItem(localStorageKeys.role, tokenInfo.payload.role);
        localStorage.setItem(localStorageKeys.email, tokenInfo.payload.email);

        const rememberMeCheckbox =
          document.getElementById("rememberMeCheckbox");

        if (rememberMeCheckbox.checked) {
          localStorage.setItem(localStorageKeys.rememberMe, token);
        }

        sessionStorage.setItem(localStorageKeys.token, token);
        window.location.href = `../home/home.html`;
      } catch (error) {
        console.error("Failed to decode JWT token:", error.message);
      }
    } else {
      notEmailPassword.classList.remove("hidden");
    }
  } catch (error) {
    notEmailPassword.classList.remove("hidden");
  }
});

forgotPassword.addEventListener("click", (e) => {
  fetchHtmlFile("forgotPassword.html", function (htmlString) {
    loginForm.innerHTML = htmlString;
    addScript("./forgotPassword.js");
  });
});

eye.addEventListener("click", (e) => {
  if (passwordRef.type == "text") {
    passwordRef.type = "password";
    eye.src = "./../../../../assets/openEye.png";
  } else {
    passwordRef.type = "text";
    eye.src = "./../../../../assets/closedEye.png";
  }
});
