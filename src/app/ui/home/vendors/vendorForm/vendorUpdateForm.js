import { changeBackgroundOnModal } from "../../../../common/components/goToRoute";
import vendorFormHtml from "./vendorForm.html";
import { handleCross, handleDataChange } from "./vendorForm";
import { handleMultipleDropdown } from "./vendorForm";
import { handleUpdateVendor } from "./vendorForm";
import { updateVendorObj } from "./vendorForm";
import { updateVendorOther } from "./otherDetails";
import { updateVendorB } from "./addressDetails";
import { updateVendorS } from "./addressDetailsShipping";

export function updateVendorModal(vendorDetail) {
  console.log(vendorFormHtml);
  console.log(vendorDetail);

  const obj = {};

  const vendor = vendorDetail;
  const vendorFormOutput = document.getElementById("form-output");
  // vendorFormOutput.innerHTML = vendorFormHtml;
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

  document.getElementById("salutation").value =
    vendor.primaryContact.salutation;
  obj.salutation = vendor.primaryContact.salutation;

  const vendorOrganizationName = document.getElementById(
    "vendor-organization-name"
  );
  vendorOrganizationName.value = vendor.companyName;
  obj.companyName = vendor.companyName;

  const allVendorTypes = document.getElementById("all-vendor-types");
  console.log("aaaa", allVendorTypes);
  allVendorTypes.value = vendor.type;
  obj.vendorType = vendor.type;

  let string = "";
  vendorDetail.categories.forEach((c) => {
    console.log(c);
    string += c;
    string += ";";
  });

  const allCategory = document.getElementById("all-category");
  allCategory.value = string;
  obj.categoryString = string;

  const contactPerson = document.getElementById("contact-person");
  contactPerson.value = vendor.primaryContact.firstName;
  obj.contactPerson = vendor.primaryContact.firstName;

  const lastName = document.getElementById("last-name");
  lastName.value = vendor.primaryContact.lastName;
  obj.lastName = vendor.primaryContact.lastName;

  const contactEmail = document.getElementById("contact-email");
  contactEmail.value = vendor.primaryContact.email;
  obj.contactEmail = vendor.primaryContact.email;

  const contactPhoneNumber = document.getElementById("contact-phone-number");
  contactPhoneNumber.value = vendor.primaryContact.workPhone;
  obj.contactPhoneNumber = vendor.primaryContact.workPhone;

  const relationshipDuration = document.getElementById("relationship-duration");
  relationshipDuration.value = vendor.primaryContact.mobilePhone;
  obj.mobilePhone = vendor.primaryContact.mobilePhone;

  updateVendorObj(obj);

  // SECOND
  const objOther = {};
  document.getElementById("gstin").value = vendor.gstin;
  objOther.gstin = vendor.gstin;
  document.getElementById("source-of-supply").value = "sos";
  objOther.sos = "vendor.sos";
  document.getElementById("pan").value = "vendor.pan";
  objOther.pan = "vendor.pan";
  document.getElementById("currency").value = vendor.currency;
  objOther.currency = vendor.currency;
  document.getElementById("payment-terms").value = vendor.paymentTerms;
  objOther.paymentTerms = vendor.paymentTerms;
  document.getElementById("tds").value = vendor.tds;
  objOther.tds = vendor.tds;
  updateVendorOther(objOther);

  // THIRD
  const objB = {};
  document.getElementById("b-attention").value =
    vendor.billingAddress.attention;
  objB.attention = vendor.billingAddress.attention;

  document.getElementById("b-city").value = vendor.billingAddress.city;
  objB.city = vendor.billingAddress.city;
  document.getElementById("b-state").value = vendor.billingAddress.state;
  objB.state = vendor.billingAddress.state;
  document.getElementById("b-pin-code").value = vendor.billingAddress.pinCode;
  objB.pinCode = vendor.billingAddress.pinCode;
  document.getElementById("b-fax-number").value =
    vendor.billingAddress.faxNumber;
  objB.faxNumber = vendor.billingAddress.faxNumber;
  document.getElementById("b-phone").value = vendor.billingAddress.phone;
  objB.phone = vendor.billingAddress.phone;
  document.getElementById("b-country").value = vendor.billingAddress.country;
  objB.country = vendor.billingAddress.country;
  document.getElementById("b-address-1").value =
    vendor.billingAddress.addressLine1;
  objB.addressLine1 = vendor.billingAddress.addressLine1;
  document.getElementById("b-address-2").value =
    vendor.billingAddress.addressLine2;
  objB.addressLine2 = vendor.billingAddress.addressLine2;

  updateVendorB(objB);

  // FORTH
  const objS = {};
  document.getElementById("s-attention").value =
    vendor.shippingAddress.attention;
  objS.attention = vendor.shippingAddress.attention;

  document.getElementById("s-city").value = vendor.shippingAddress.city;
  objS.city = vendor.shippingAddress.city;
  document.getElementById("s-state").value = vendor.shippingAddress.state;
  objS.state = vendor.shippingAddress.state;
  document.getElementById("s-pin-code").value = vendor.shippingAddress.pinCode;
  objS.pinCode = vendor.shippingAddress.pinCode;
  document.getElementById("s-fax-number").value =
    vendor.shippingAddress.faxNumber;
  objS.faxNumber = vendor.shippingAddress.faxNumber;
  document.getElementById("s-phone").value = vendor.shippingAddress.phone;
  objS.phone = vendor.shippingAddress.phone;
  document.getElementById("s-country").value = vendor.shippingAddress.country;
  objS.country = vendor.shippingAddress.country;
  document.getElementById("s-address-1").value =
    vendor.shippingAddress.addressLine1;
  objS.addressLine1 = vendor.shippingAddress.addressLine1;
  document.getElementById("s-address-2").value =
    vendor.shippingAddress.addressLine2;
  objS.addressLine2 = vendor.shippingAddress.addressLine2;

  updateVendorS(objS);

  const addVendorBtn = document.getElementById("add-to-db");
  addVendorBtn.innerHTML = "Update Vendor";
  addVendorBtn.addEventListener("click", () =>
    handleUpdateVendor(vendor.vendorId)
  );
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    handleUpdateVendor();
  }
});
