import authHtml from "./../auth.html";
import changePasswordFormHtml from "./changePasswordForm.html";
const root = document.getElementById("root");

root.innerHTML = authHtml;
const loginForm = document.getElementsByClassName("login-form")[0];
loginForm.innerHTML = changePasswordFormHtml;
import("./changePasswordForm.js")
  .then((module) => {
    console.log("changePasswordForm imported");
  })
  .catch((error) => {
    console.log("An error occured while loading the module", error);
  });
