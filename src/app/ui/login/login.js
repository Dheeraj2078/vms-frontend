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
  const rememberMe = localStorage.getItem(localStorageKeys.rememberMe);
  if (rememberMe == null) {
    fetchAuth();
    return;
  }

  if (validateToken() == false) {
    fetchAuth();
  } else {
    window.location.href = "./home.html";
  }
})();
