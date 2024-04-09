import {
  updatePassword,
  validateNewuserToken,
} from "../../../service/loginApi.js";
import changePasswordSuccessHtml from "./changePasswordSuccess.html";

const resetPasswordBtn = document.getElementById("reset-password-button");
const firstPasswordRef = document.getElementsByClassName("firstPassword")[0];
const secondPasswordRef = document.getElementsByClassName("secondPassword")[0];
const notSamePassword = document.getElementsByClassName("not-same-password")[0];
const emptyPassword = document.getElementsByClassName("empty-password")[0];
const weakPassword = document.getElementsByClassName("weak-password")[0];
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

  if (!weakPassword.classList.contains("hidden")) {
    weakPassword.classList.add("hidden");
  }
};

firstPasswordRef.addEventListener("input", (e) => {
  if (firstPasswordRef.classList.contains("empty-field-border")) {
    firstPasswordRef.classList.remove("empty-field-border");
  }

  removeCredientialInfo();
  firstPassword = e.target.value;
});

secondPasswordRef.addEventListener("input", (e) => {
  if (secondPasswordRef.classList.contains("empty-field-border")) {
    secondPasswordRef.classList.remove("empty-field-border");
  }

  removeCredientialInfo();
  secondPassword = e.target.value;
});

const getUserToken = () => {
  const url = window.location.href;
  let i = url.indexOf("#");
  const token = url.substring(i + 2);
  return token;
};

function validatePassword(password) {
  // Regular expression to match the criteria
  var regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  // Test the password against the regular expression
  return regex.test(password);
}

resetPasswordBtn.addEventListener("click", async (e) => {
  if (firstPassword == "" && secondPassword == "") {
    firstPasswordRef.classList.add("empty-field-border");
    secondPasswordRef.classList.add("empty-field-border");
    emptyPassword.classList.remove("hidden");
    return;
  }

  if (firstPassword == "") {
    firstPasswordRef.classList.add("empty-field-border");
    emptyPassword.classList.remove("hidden");
    return;
  }

  if (secondPassword == "") {
    secondPasswordRef.classList.add("empty-field-border");
    emptyPassword.classList.remove("hidden");
    return;
  }

  if (firstPassword != secondPassword) {
    notSamePassword.classList.remove("hidden");
    return;
  }

  if (validatePassword(firstPassword) == false) {
    weakPassword.classList.remove("hidden");
    return;
  }

  const token = getUserToken();
  const loginData = {
    email: userEmail,
    password: firstPassword,
  };

  try {
    const updatedPassword = await updatePassword(token, loginData);

    loginForm.innerHTML = changePasswordSuccessHtml;
    import("./changePasswordSuccess.js")
      .then((module) => {
        console.log("changePasswordSuccess imported");
      })
      .catch((error) => {
        console.log("An error occured while loading the module", error);
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
    use.setAttribute("xlink:href", "./3041031725d9df0ac152.svg#openEye");
  } else {
    firstPasswordRef.type = "text";
    use.setAttribute("xlink:href", "./3041031725d9df0ac152.svg#closedEye");
  }
});

secondEye.addEventListener("click", (e) => {
  const use = document.getElementById("secondEyeIcon");
  if (secondPasswordRef.type == "text") {
    secondPasswordRef.type = "password";
    use.setAttribute("xlink:href", "./3041031725d9df0ac152.svg#openEye");
  } else {
    secondPasswordRef.type = "text";
    use.setAttribute("xlink:href", "./3041031725d9df0ac152.svg#closedEye");
  }
});
