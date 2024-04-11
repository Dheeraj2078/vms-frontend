import { loadNavBar } from "../../util/util.js";
loadNavBar();
import("../../common/navbar.js")
  .then((module) => {
    console.log("Navbar js imported");
  })
  .catch((error) => {
    console.log("An error occured while loading the module", error);
  });
