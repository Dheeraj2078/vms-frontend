import { validateToken } from "../../util/util.js";
import authHtml from "./auth.html";
import { localStorageKeys } from "../../util/constants.js";
const root = document.getElementById("root");

const fetchAuth = () => {
  root.innerHTML = authHtml;
  import("./auth.js")
    .then((module) => {
      console.log("auth js imported");
    })
    .catch((error) => {
      console.log("An error occured while loading the module", error);
    });
};

(function initLogin() {
  const token = localStorage.getItem(localStorageKeys.token);
  if (token == null) {
    fetchAuth();
    return;
  }

  if (validateToken() == false) {
    fetchAuth();
  } else {
    window.location.href = "/dist/home.html";
  }
  
})();
