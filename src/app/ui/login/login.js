import {
  fetchHtmlFile,
  addScript,
  addStyles,
  validateToken,
} from "../../util/util.js";

import { localStorageKeys } from "../../util/constants.js";
const root = document.getElementById("root");

const fetchAuth = () => {
  fetchHtmlFile("auth.html", function (htmlString) {
    root.innerHTML = htmlString;
    addStyles("./../../../scss/login.css");
    addScript("../../service/loginApi.js");
    addScript("./auth.js");
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
    window.location.href = ".././home/home.html";
  }
})();
