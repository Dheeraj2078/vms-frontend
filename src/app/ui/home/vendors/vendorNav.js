import vendorDetailsHtml from "../vendors/vendorForm/vendorDetails.html";
import otherDetailsHtml from "../vendors/vendorForm/otherDetails.html";
import addressDetailsHtml from "../vendors/vendorForm/addressDetails.html";
import {
  clearOtherData,
  getVendorOtherInformation,
  handleMultipleDropdownForOther,
} from "./vendorForm/otherDetails";
import {
  handleMultipleDropdownForBillingAddress,
  getVendorBillingAddress,
  clearBillingData,
} from "./vendorForm/addressDetails";
import {
  clearShippingData,
  copyBillingToShipping,
} from "./vendorForm/addressDetailsShipping";
import {
  clearVendorData,
  getVendorFormInformation,
  handleMultipleDropdown,
} from "./vendorForm/vendorForm";
import {
  getVendorShippingAddress,
  handleMultipleDropdownForShippingAddress,
} from "./vendorForm/addressDetailsShipping";
import { addVendor } from "../../../service/vendorsApi";
import { successModal } from "../../../common/components/successModal";
import { getVendorFormDropdown } from "../../../service/vendorsApi";
import { handleCross } from "./vendorForm/vendorForm";

const changeVendorRouteUI = (thisClass) => {
  const routes = document.getElementsByClassName("vendor-nav")[0];
  const routeLi = routes.children;
  const routeLiArr = [...routeLi];

  routeLiArr.map((route) => {
    route.classList.remove("selected");
  });
  routeLiArr.map((route) => {
    if (route.classList.contains(thisClass)) {
      route.classList.add("selected");
    }
  });
};

export const changeVendorRoute = async () => {
  // let formData = "";
  try {
    const formData = await getVendorFormDropdown();

    const vendorFormTabs =
      document.getElementsByClassName("vendor-form-tabs")[0];
    vendorFormTabs.innerHTML = vendorDetailsHtml;
    handleMultipleDropdown(formData);
    changeVendorRouteUI("v-details");
    nextOrSubmit("add-to-db", "form-next", 1, formData);

    const vendorDetailsRoute = document.getElementById("vendorDetailsRoute");
    vendorDetailsRoute.addEventListener("click", (e) => {
      vendorFormTabs.innerHTML = vendorDetailsHtml;
      handleMultipleDropdown(formData);
      changeVendorRouteUI("v-details");

      nextOrSubmit("add-to-db", "form-next", 1, formData);
    });

    const otherDetailsRoute = document.getElementById("otherDetailsRoute");
    otherDetailsRoute.addEventListener("click", (e) => {
      vendorFormTabs.innerHTML = otherDetailsHtml;
      handleMultipleDropdownForOther(formData);
      changeVendorRouteUI("o-details");

      nextOrSubmit("add-to-db", "form-next", 2, formData);
    });

    const addressDetailsRoute = document.getElementById("addressDetailsRoute");
    addressDetailsRoute.addEventListener("click", (e) => {
      vendorFormTabs.innerHTML = addressDetailsHtml;

      handleMultipleDropdownForBillingAddress(formData);
      handleMultipleDropdownForShippingAddress(formData);

      const copyButton = document.getElementById("copy-billing-to-shipping");
      copyButton.addEventListener("click", copyBillingToShipping);

      changeVendorRouteUI("v-address");

      nextOrSubmit("form-next", "add-to-db", 3, formData);
    });
  } catch (error) {
    console.log("err", error);
  }
};

const nextOrSubmit = (firstClass, secondClass, curr, formData) => {
  const first = document.getElementById(firstClass);
  first.classList.add("hidden");

  const second = document.getElementById(secondClass);
  second.classList.remove("hidden");

  const vendorFormTabs = document.getElementsByClassName("vendor-form-tabs")[0];

  if (curr == 1) {
    second.addEventListener("click", () => {
      vendorFormTabs.innerHTML = otherDetailsHtml;
      handleMultipleDropdownForOther(formData);
      changeVendorRouteUI("o-details");

      nextOrSubmit("add-to-db", "form-next", 2);
    });
  }
  if (curr == 2) {
    second.addEventListener("click", () => {
      vendorFormTabs.innerHTML = addressDetailsHtml;

      handleMultipleDropdownForBillingAddress(formData);
      handleMultipleDropdownForShippingAddress(formData);

      const copyButton = document.getElementById("copy-billing-to-shipping");
      copyButton.addEventListener("click", copyBillingToShipping);

      changeVendorRouteUI("v-address");

      nextOrSubmit("form-next", "add-to-db", 3, formData);
    });
  }
};

export async function handleAddVendor() {
  try {
    const info = await getVendorFormInformation();
    const otherInfo = await getVendorOtherInformation();
    const billingAddress = await getVendorBillingAddress();
    const shippingAddress = await getVendorShippingAddress();

    console.log(info);
    console.log(otherInfo);
    console.log(billingAddress);
    console.log(shippingAddress);

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
      clearAllVendorData();
      successModal("Vendor added", handleCross);
    }
  } catch (error) {
    console.log("vednor", error);
  }
}

const clearAllVendorData = () => {
  clearVendorData();
  clearOtherData();
  clearBillingData();
  clearShippingData();
};
