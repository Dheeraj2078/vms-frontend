import vendorDetailsHtml from "../vendors/vendorForm/vendorDetails.html";
import otherDetailsHtml from "../vendors/vendorForm/otherDetails.html";
import addressDetailsHtml from "../vendors/vendorForm/addressDetails.html";
import { handleMultipleDropdownForOther } from "./vendorForm/otherDetails";
import { handleMultipleDropdownForAddress } from "./vendorForm/addressDetails";
import { handleMultipleDropdown } from "./vendorForm/vendorForm";

export const changeVendorRoute = () => {
  const vendorFormTabs = document.getElementsByClassName("vendor-form-tabs")[0];
  vendorFormTabs.innerHTML = vendorDetailsHtml;

  const vendorDetailsRoute = document.getElementById("vendorDetailsRoute");
  vendorDetailsRoute.addEventListener("click", (e) => {
    vendorFormTabs.innerHTML = vendorDetailsHtml;
    handleMultipleDropdown();
  });

  const otherDetailsRoute = document.getElementById("otherDetailsRoute");
  otherDetailsRoute.addEventListener("click", (e) => {
    vendorFormTabs.innerHTML = otherDetailsHtml;
    handleMultipleDropdownForOther();
  });

  const addressDetailsRoute = document.getElementById("addressDetailsRoute");
  addressDetailsRoute.addEventListener("click", (e) => {
    vendorFormTabs.innerHTML = addressDetailsHtml;
    handleMultipleDropdownForAddress();
  });
};
