import {
  fetchHtmlFile,
  addScript,
  addStyles,
  validateToken,
} from "../../util/util.js";

const root = document.getElementById("root");

(function initLogin() {
  if (validateToken() == false) {
    fetchHtmlFile("auth.html", function (htmlString) {
      root.innerHTML = htmlString;
      addStyles("./auth.css");
      addScript("../../service/loginApi.js");
      addScript("./auth.js");
    });
  } else {
    window.location.href = ".././home/home.html";
  }
})();
