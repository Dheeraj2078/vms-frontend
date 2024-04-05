import { addScript, addStyles, fetchHtmlFile } from "../../../util/util.js";
const root = document.getElementById("root");

fetchHtmlFile("./../auth.html", function (htmlString) {
  root.innerHTML = htmlString;
  addStyles("./../../../../scss/login.css");

  const loginForm = document.getElementsByClassName("login-form")[0];

  fetchHtmlFile("./changePasswordForm.html", function (htmlString) {
    loginForm.innerHTML = htmlString;
    addScript("./changePasswordForm.js");

    const logoImage = document.getElementsByClassName("logo-image")[0];
    logoImage.src = "./../../../../assets/images/logo.png";
    const vendorImage = document.getElementsByClassName("vendor-image")[0];
    vendorImage.src = "./../../../../assets/images/vendor.png";
  });
});
