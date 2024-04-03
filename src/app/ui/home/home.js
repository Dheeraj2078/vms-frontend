import { baseUrlLogin } from "../../util/constants.js";

const logout = document.getElementById("logout");

logout.addEventListener("click", (e) => {
  localStorage.clear();
  location.href = baseUrlLogin;
});
