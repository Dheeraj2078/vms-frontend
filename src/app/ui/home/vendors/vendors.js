import vendorHtml from "../vendors/vendors.html";
import vendorFormHtml from "../vendors/vendorFrom/vendorForm.html";
import { handleCross } from "./vendorFrom/vendorForm.js";

export default function goToVendor() {
  const vendorRoute = document.getElementById("vendorRoute");
  const homeRoot = document.getElementById("home-root");
  homeRoot.innerHTML = vendorHtml;

  const vendorFormOutput = document.getElementById("vendor-form-output");
  vendorFormOutput.innerHTML = vendorFormHtml;

  console.log(vendorHtml);
  console.log(vendorRoute);

  const addVendorsButton = document.getElementById("add-vendors-button");
  addVendorsButton.addEventListener("click", (e) => {
    console.log("adding vendors...");

    vendorFormOutput.classList.remove("hidden");
    const vendorFormCross = document.getElementById("vendor-form-cross");
    vendorFormCross.addEventListener("click", (e) => {
      handleCross();
    });

    const mainContainer = document.getElementById("main-container");
    mainContainer.classList.add("blur-background");
  });
}
