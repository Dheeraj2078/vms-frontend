import vendorHtml from "../vendors/vendors.html";
import vendorFormHtml from "../vendors/vendorFrom/vendorForm.html";
import {
  handleCross,
  handleMultipleDropdown,
  handleAddVendor,
} from "./vendorFrom/vendorForm.js";

export default function goToVendor() {
  const vendorRoute = document.getElementById("vendorRoute");
  const homeRoot = document.getElementById("home-root");
  homeRoot.innerHTML = vendorHtml;

  const vendorFormOutput = document.getElementById("form-output");
  vendorFormOutput.innerHTML = vendorFormHtml;

  const addVendorsButton = document.getElementById("add-button");
  addVendorsButton.addEventListener("click", (e) => {
    vendorFormOutput.classList.remove("hidden");
    const vendorFormCross = document.getElementById("form-cross");
    vendorFormCross.addEventListener("click", (e) => {
      handleCross();
    });

    const vendorFormCancel = document.getElementsByClassName("form-cancel")[0];
    vendorFormCancel.addEventListener("click", (e) => {
      handleCross();
    });

    const mainContainer = document.getElementById("main-container");
    mainContainer.classList.add("blur-background");
  });

  const addVendorBtn = document.getElementById("add-vendor");
  addVendorBtn.addEventListener("click", handleAddVendor);

  handleMultipleDropdown();
  createVendorTable();
}

const createVendorTable = () => {
  const vendorTable = document.getElementsByClassName(
    "vendor-table-container"
  )[0];
};
