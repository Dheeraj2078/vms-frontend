import { changeBackgroundOnModal } from "../../../../common/components/goToRoute";
import vendorFormHtml from "./vendorForm.html";
import { handleCross, handleDataChange } from "./vendorForm";
import { handleMultipleDropdown } from "./vendorForm";
import { handleUpdateVendor } from "./vendorForm";

export function updateVendorModal(vendorDetail) {
  console.log(vendorFormHtml);
  console.log(vendorDetail);

  const vendor = vendorDetail.item1;
  const vendorFormOutput = document.getElementById("form-output");
  vendorFormOutput.innerHTML = vendorFormHtml;
  vendorFormOutput.classList.remove("hidden");
  changeBackgroundOnModal();

  const vendorFormCross = document.getElementById("form-cross");
  vendorFormCross.addEventListener("click", (e) => {
    handleCross();
  });
  const vendorFormCancel = document.getElementsByClassName("form-cancel")[0];
  vendorFormCancel.addEventListener("click", (e) => {
    handleCross();
  });

  const addVendorHeading = document.getElementById("add-vendor-heading");
  addVendorHeading.innerHTML = "Update Vendor";

  const vendorOrganizationName = document.getElementById(
    "vendor-organization-name"
  );
  vendorOrganizationName.value = vendor.organizationName;

  const allVendorTypes = document.getElementById("all-vendor-types");
  console.log("aaaa", allVendorTypes);
  allVendorTypes.value = vendor.vendorType.name;

  let string = "";
  vendorDetail.item2.forEach((c) => {
    console.log(c);
    string += c;
    string += ";";
  });

  const allCategory = document.getElementById("all-category");
  allCategory.value = string;

  const relationshipDuration = document.getElementById("relationship-duration");
  relationshipDuration.value = vendor.relationshipDuration;

  const contactPerson = document.getElementById("contact-person");
  contactPerson.value = vendor.contactPersonName;

  const contactEmail = document.getElementById("contact-email");
  contactEmail.value = vendor.contactPersonEmail;

  const contactPhoneNumber = document.getElementById("contact-phone-number");
  contactPhoneNumber.value = vendor.contactPersonNumber;

  const vendorAddress = document.getElementById("vendor-address");
  vendorAddress.value = vendor.address;

  handleMultipleDropdown();
  handleDataChange();

  const addVendorBtn = document.getElementById("add-to-db");
  addVendorBtn.innerHTML = "Update Vendor";
  addVendorBtn.addEventListener("click", () => handleUpdateVendor(vendor.id));
}
