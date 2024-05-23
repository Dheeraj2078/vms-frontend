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
import { getVendorStats } from "../../../service/vendorsApi";

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

let formData_ = [];
export const changeVendorRoute = async () => {
  const loader = document.getElementById("loader");
  const content = document.querySelector("main");

  // Show the loader, hide the content
  // loader.style.display = "block";
  loader.classList.remove("hidden");
  content.style.display = "none";

  try {
    await populateVendorStats();

    const formData = await getVendorFormDropdown();
    formData_ = formData;

    // loader.style.display = "none";
    loader.classList.add("hidden");
    // Show the content
    content.style.display = "block";
    // Display the data
    // content.innerHTML = data;

    const vendorFormTabs =
      document.getElementsByClassName("vendor-form-tabs")[0];

    let div = document.createElement("div");
    div.id = "add-vendor-1";
    div.innerHTML = vendorDetailsHtml;
    vendorFormTabs.appendChild(div);

    div = document.createElement("div");
    div.id = "add-vendor-2";
    div.classList.add("hidden");
    div.innerHTML = otherDetailsHtml;
    vendorFormTabs.appendChild(div);

    div = document.createElement("div");
    div.id = "add-vendor-3";
    div.classList.add("hidden");
    div.innerHTML = addressDetailsHtml;
    vendorFormTabs.appendChild(div);

    handleMultipleDropdown(formData);
    handleMultipleDropdownForOther(formData);
    handleMultipleDropdownForBillingAddress(formData);
    handleMultipleDropdownForShippingAddress(formData);

    changeVendorRouteUI("v-details");
    nextOrSubmit("add-to-db", "form-next", 1, formData);

    const vendorDetailsRoute = document.getElementById("vendorDetailsRoute");
    vendorDetailsRoute.addEventListener("click", (e) => {
      changeVendorRouteUI("v-details");
      nextOrSubmit("add-to-db", "form-next", 1, formData);
    });

    const otherDetailsRoute = document.getElementById("otherDetailsRoute");
    otherDetailsRoute.addEventListener("click", (e) => {
      changeVendorRouteUI("o-details");
      nextOrSubmit("add-to-db", "form-next", 2, formData);
    });

    const addressDetailsRoute = document.getElementById("addressDetailsRoute");
    addressDetailsRoute.addEventListener("click", (e) => {
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

  if (curr == 1) {
    second.addEventListener("click", () => {
      changeVendorRouteUI("o-details");
      nextOrSubmit("add-to-db", "form-next", 2);
    });
  }
  if (curr == 2) {
    second.addEventListener("click", () => {
      const copyButton = document.getElementById("copy-billing-to-shipping");
      copyButton.addEventListener("click", copyBillingToShipping);
      changeVendorRouteUI("v-address");
      nextOrSubmit("form-next", "add-to-db", 3, formData);
    });
  }

  formSlider(curr);
};

const formSlider = (curr) => {
  console.log("slide to =>" + curr);
  const vendorFormTabs = document.getElementsByClassName("vendor-form-tabs")[0];
  const vendorFormTabsHtmlCollection = vendorFormTabs.children;
  const vendorFormTabsArr = [...vendorFormTabsHtmlCollection];
  console.log("vendor tabs arr", vendorFormTabsArr);
  const currClass = "add-vendor-" + curr;
  vendorFormTabsArr.map((cDiv) => {
    if (cDiv.id == currClass) {
      cDiv.classList.remove("hidden");
    } else {
      cDiv.classList.add("hidden");
    }
  });
};

export async function handleAddVendor() {
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

    const res = await addVendor(postData);
    console.log("RESSSS", res);
    if (res.error == null) {
      clearAllVendorData();
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

const clearAllVendorData = () => {
  clearVendorData();
  clearOtherData();
  clearBillingData();
  clearShippingData();
};

const populateVendorStats = async () => {
  try {
    const invoiceStats = await getVendorStats();
    const invoiceStatsData = invoiceStats.data;

    let totalVendorsCount = invoiceStatsData.total;
    let activeVendorsCount = invoiceStatsData.active,
      inActiveVectorsCount = totalVendorsCount - activeVendorsCount;

    const totalVendors = document.getElementById("total-vendors");
    totalVendors.innerHTML = totalVendorsCount;

    const activeVendors = document.getElementById("active-vendors");
    activeVendors.innerHTML = activeVendorsCount;

    const inActiveVendors = document.getElementById("inactive-vendors");
    inActiveVendors.innerHTML = inActiveVectorsCount;
  } catch (error) {
    console.log(error);
  }
};
