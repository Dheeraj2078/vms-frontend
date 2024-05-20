import vendorDetailsHtml from "../vendors/vendorForm/vendorDetails.html";
import otherDetailsHtml from "../vendors/vendorForm/otherDetails.html";
import addressDetailsHtml from "../vendors/vendorForm/addressDetails.html";
import {
  getVendorOtherInformation,
  handleMultipleDropdownForOther,
} from "./vendorForm/otherDetails";
import {
  handleMultipleDropdownForBillingAddress,
  copyBillingToShipping,
  getVendorBillingAddress,
} from "./vendorForm/addressDetails";
import {
  getVendorFormInformation,
  handleMultipleDropdown,
} from "./vendorForm/vendorForm";
import {
  getVendorShippingAddress,
  handleMultipleDropdownForShippingAddress,
} from "./vendorForm/addressDetailsShipping";
import { addVendor } from "../../../service/vendorsApi";

const changeVendorRouteUI = (thisClass) => {
  const routes = document.getElementsByClassName("vendor-nav")[0];
  const routeLi = routes.children;
  const routeLiArr = [...routeLi];

  console.log("KIDS", routeLi);
  console.log("KIDS", routeLiArr);
  routeLiArr.map((route) => {
    route.classList.remove("selected");
  });
  routeLiArr.map((route) => {
    if (route.classList.contains(thisClass)) {
      route.classList.add("selected");
    }
  });
};

export const changeVendorRoute = () => {
  const vendorFormTabs = document.getElementsByClassName("vendor-form-tabs")[0];
  vendorFormTabs.innerHTML = vendorDetailsHtml;

  const vendorDetailsRoute = document.getElementById("vendorDetailsRoute");
  vendorDetailsRoute.addEventListener("click", (e) => {
    vendorFormTabs.innerHTML = vendorDetailsHtml;
    handleMultipleDropdown();
    changeVendorRouteUI("v-details");
  });

  const otherDetailsRoute = document.getElementById("otherDetailsRoute");
  otherDetailsRoute.addEventListener("click", (e) => {
    vendorFormTabs.innerHTML = otherDetailsHtml;
    handleMultipleDropdownForOther();
    changeVendorRouteUI("o-details");
  });

  const addressDetailsRoute = document.getElementById("addressDetailsRoute");
  addressDetailsRoute.addEventListener("click", (e) => {
    vendorFormTabs.innerHTML = addressDetailsHtml;

    handleMultipleDropdownForBillingAddress();
    handleMultipleDropdownForShippingAddress();

    const copyButton = document.getElementById("copy-billing-to-shipping");
    copyButton.addEventListener("click", copyBillingToShipping);

    changeVendorRouteUI("v-address");
  });
};

export async function handleAddVendor() {
  try {
    const info = await getVendorFormInformation();
    const otherInfo = await getVendorOtherInformation();
    const billingAddress = await getVendorBillingAddress();
    const shippingAddress = await getVendorShippingAddress();
    console.log("radhe radhe");

    console.log(info);
    console.log(otherInfo);
    console.log(billingAddress);
    console.log(shippingAddress);

    // for (const property in info) {
    //   console.log(`${property}: ${object[property]}`);
    //   postData.property = object[property];
    // }

    const postData = {
      ...info,
      ...otherInfo,
      billingDto: billingAddress,
      shippingDto: shippingAddress,
    };

    console.log("POST", postData);

    const res = await addVendor(postData);
    console.log("RESSSS", res);
    if (res.error == null) {
      successModal("Vendor added", handleCross);
    }
  } catch (error) {
    console.log("vednor", error);
  }
}
