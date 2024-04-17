import adminHtml from "../admin/admin.html";
import adminFormHtml from "../../home/admin/adminForm/adminForm.html";
import {
  handleCross,
  handleMultipleDropdown,
  handleAddAdmin,
} from "./AdminForm/AdminForm";

export default function goToAdmin() {
  const homeRoot = document.getElementById("home-root");
  homeRoot.innerHTML = adminHtml;
  console.log("A", adminHtml);

  const vendorFormOutput = document.getElementById("vendor-form-output");
  vendorFormOutput.innerHTML = adminFormHtml;

  const addVendorsButton = document.getElementById("add-vendors-button");
  addVendorsButton.addEventListener("click", (e) => {
    vendorFormOutput.classList.remove("hidden");
    const vendorFormCross = document.getElementById("vendor-form-cross");
    vendorFormCross.addEventListener("click", (e) => {
      handleCross();
    });

    const vendorFormCancel =
      document.getElementsByClassName("vendor-form-cancel")[0];
    vendorFormCancel.addEventListener("click", (e) => {
      handleCross();
    });

    const mainContainer = document.getElementById("main-container");
    mainContainer.classList.add("blur-background");
  });

  const addVendorBtn = document.getElementById("add-admin");
  addVendorBtn.addEventListener("click", handleAddAdmin);

  handleMultipleDropdown();
}
