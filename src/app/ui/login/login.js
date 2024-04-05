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

// const parser = new DOMParser();
// const fetchAuth = () => {
//   fetchHtmlFile("auth.html", function (htmlString) {
//     // root.innerHTML = htmlString;
//     console.log("string -> ", htmlString);
//     const doc = parser.parseFromString(htmlString, "text/html");
//     console.log(doc.body);
//     // root.innerHTML = doc;
//     var script = document.createElement("script");
//     // script.defer = true;
//     script.src = "./auth.js";
//     script.type = "module";
//     // script.async = true;

//     doc.body.appendChild(script);
//     console.log(doc.body.children[0]);
//     document.body.appendChild(doc.body.children[1]);
//     root.appendChild(doc.body.children[0]);
//     // addStyles("./auth.css");
//     // addScript("../../service/loginApi.js");
//     // addScript("./auth.js");
//     console.log("again", doc.body);

//     document.addEventListener("DOMContentLoaded", (e) => {
//       console.log("now add script");
//     });
//   });
// };

// const fetchAuth = () => {
//   fetch("auth.html")
//     .then((res) => {
//       // console.log(res.text());
//       return res.text();
//     })
//     .then((html) => {
//       console.log(html);
//       const parser = new DOMParser();
//       const doc = parser.parseFromString(html, "text/html");
//       console.log("body", doc.body);
//       // root.innerHTML = toStringify(doc);

//       var script = document.createElement("script");
//       // script.defer = true;
//       script.src = "./auth.js";
//       script.type = "module";
//       // script.async = true;
//       doc.body.appendChild(script);

//       // console.log("c", doc.body.children);
//       // console.log("c", doc.body.childNodes);
//       // console.log("c", doc.body.children.length);
//       // document.body.appendChild(doc.body.children[1]);
//       // console.log("first", doc.body.children[0]);
//       console.log("second", doc.body.children[1]);

//       root.appendChild(doc.body.children[0]);
//       // addStyles("./auth.css");
//       // addScript("../../service/loginApi.js");
//       // addScript("./auth.js");
//       console.log("again", doc.body);
//     });
// };

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
