import { baseUrl } from "../../../util/constants.js";

const backToLogin = document.getElementsByClassName("back-to-login")[0];

backToLogin.addEventListener("click", (e) => {
  location.href = baseUrl;
});
