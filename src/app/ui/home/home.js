import navBarHtml from "../../common/navbar.html";
// import { loadNavBar } from "../../util/util.js";
// loadNavBar();
// import("../../common/navbar.js")
//   .then((module) => {
//     console.log("Navbar js imported");
//   })
//   .catch((error) => {
//     console.log("An error occured while loading the module", error);
//   });

(() => {
  // // console.log("nabvar is added");
  // const div = document.createElement("div");
  // div.innerHTML = navBarHtml;
  // // console.log("1.", div);
  // const firstChild = document.getElementById("home-root");
  // // console.log("2.", firstChild);

  // // console.log("3.", div);

  // firstChild.appendChild(div);

  import("../../common/navbar.js")
    .then((module) => {
      console.log("Navbar js imported");
    })
    .catch((error) => {
      console.log("An error occured while loading the module", error);
    });
})();
