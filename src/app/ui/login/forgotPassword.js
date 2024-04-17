import { forgotPassword } from "../../service/loginApi.js";
import { redirectUrl } from "../../util/constants.js";
import resetLinkSendHtml from "./resetLinkSend.html";

const emailRef = document.getElementById("email");
const notEmail = document.getElementsByClassName("not-email")[0];
const wrongEmail = document.getElementsByClassName("wrong-email")[0];
const resetPasswordBtn = document.getElementById("reset-password-button");
const loginForm = document.getElementsByClassName("login-form")[0];

let email = "";
emailRef.addEventListener("input", (e) => {
  if (resetPasswordBtn.classList.contains("disabled")) {
    resetPasswordBtn.classList.remove("disabled");
  }

  if (emailRef.classList.contains("empty-field-border")) {
    emailRef.classList.remove("empty-field-border");
  }

  if (!notEmail.classList.contains("hidden")) {
    notEmail.classList.add("hidden");
  }

  if (!wrongEmail.classList.contains("hidden")) {
    wrongEmail.classList.add("hidden");
  }

  email = e.target.value;
});

resetPasswordBtn.addEventListener("click", async (e) => {
  if (email == "") {
    emailRef.classList.add("empty-field-border");
    notEmail.classList.remove("hidden");
    return;
  }

  const forgotPasswordData = {
    email: email,
    redirectUrl: redirectUrl,
  };

  resetPasswordBtn.classList.add("disabled");
  try {
    const res = await forgotPassword(forgotPasswordData);
    console.log(res);
    loginForm.innerHTML = resetLinkSendHtml;
    import("./resetLinkSend.js")
      .then((module) => {
        console.log("resetLinkSend js imported");
      })
      .catch((error) => {
        console.log("An error occured while loading the module", error);
      });
  } catch (error) {
    console.log(error);
    wrongEmail.classList.remove("hidden");
    if (resetPasswordBtn.classList.contains("disabled")) {
      resetPasswordBtn.classList.remove("disabled");
    }
  }
});
