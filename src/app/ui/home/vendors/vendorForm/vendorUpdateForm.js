import { changeBackgroundOnModal } from "../../../../common/components/goToRoute";
import vendorFormHtml from "./vendorForm.html";
import {
  getVendorFormInformation,
  handleCross,
  handleDataChange,
} from "./vendorForm";
import { handleMultipleDropdown } from "./vendorForm";
import { handleUpdateVendor } from "./vendorForm";
import { updateVendorObj } from "./vendorForm";
import {
  extractDetailsFromGSTIN,
  getVendorOtherInformation,
  updateVendorOther,
} from "./otherDetails";
import { getVendorBillingAddress, updateVendorB } from "./addressDetails";
import {
  getVendorShippingAddress,
  updateVendorS,
} from "./addressDetailsShipping";
import {
  getVendorFormDropdown,
  updateVendor,
} from "../../../../service/vendorsApi";
import { changeVendorRouteUI, nextOrSubmit } from "../vendorNav";
import { successModal } from "../../../../common/components/successModal";

export async function updateVendorModal(vendorDetail) {
  console.log(vendorFormHtml);
  console.log(vendorDetail);

  const formData = await getVendorFormDropdown();
  console.log();
  const states = formData.data.states;

  const mapStateCodeToStateName = {};
  states.map((state) => {
    mapStateCodeToStateName[state.stateCode] = state.name;
  });

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

  const gstInfoObj = extractDetailsFromGSTIN(vendor.gstin);
  const gstSos = mapStateCodeToStateName[Number(gstInfoObj.stateCode)];
  const gstPan = gstInfoObj.pan;

  document.getElementById("source-of-supply").value = gstSos;
  objOther.sos = gstPan;

  document.getElementById("pan").value = gstPan;
  objOther.pan = gstPan;

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
    // handleUpdateVendor(vendor.vendorId)
    UpdateVendorUtil(vendor.vendorId)
  );
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    handleUpdateVendor();
  }
});

export async function UpdateVendorUtil(id) {
  try {
    const info = await getVendorFormInformation();
    const otherInfo = await getVendorOtherInformation();
    const billingAddress = await getVendorBillingAddress();
    const shippingAddress = await getVendorShippingAddress();

    console.log("INFO", info);
    console.log("OTHER", otherInfo);
    console.log("BILLING", billingAddress);
    console.log("SHIPPING", shippingAddress);

    if (info == null) {
      changeVendorRouteUI("v-details");
      nextOrSubmit("add-to-db", "form-next", 1, formData_);

      return;
    } else if (otherInfo == null) {
      changeVendorRouteUI("o-details");
      nextOrSubmit("add-to-db", "form-next", 2, formData_);
      return;
    } else if (billingAddress == null || shippingAddress == null) {
      const copyButton = document.getElementById("copy-billing-to-shipping");
      copyButton.addEventListener("click", copyBillingToShipping);
      changeVendorRouteUI("v-address");
      nextOrSubmit("form-next", "add-to-db", 3, formData_);
      return;
    }

    const postData = {
      ...info,
      ...otherInfo,
      billingDto: billingAddress,
      shippingDto: shippingAddress,
    };

    console.log("POST", postData);

    const cancelBtn = document.getElementsByClassName("btn-light")[0];
    const saveBtn = document.getElementsByClassName("add-vendor-btn")[0];
    const formCorss = document.getElementById("form-cross");

    saveBtn.classList.add("disabled");
    cancelBtn.classList.add("disabled-light");
    formCorss.classList.add("disabled-cross");

    const res = await updateVendor(id, postData);
    console.log("RESSSS", res);
    if (res.error == null) {
      // clearAllVendorData();
      successModal("Vendor added", handleCross);
    }
  } catch (error) {
    console.log("vednor", error);
    if (saveBtn.classList.contains("disabled")) {
      saveBtn.classList.remove("disabled");
    }
    if (cancelBtn.classList.contains("disabled-light")) {
      cancelBtn.classList.remove("disabled-light");
    }
    if (formCorss.classList.contains("disabled-cross")) {
      formCorss.classList.remove("disabled-cross");
    }
  }
}
