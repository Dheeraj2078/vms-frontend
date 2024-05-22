import { getVendorFormDropdown } from "../../../../service/vendorsApi";
import { togglePopup } from "./addressDetails";

const mapStateNameToId = {};
export const handleMultipleDropdownForShippingAddress = async (formData) => {
  try {
    // const formData = await getVendorFormDropdown(); //api
    const countryList = formData.data.country;
    let sCountry = document.getElementById("s-country");
    const sCountryWrapper =
      document.getElementsByClassName("s-country-wrapper")[0];
    countryList.map((item) => {
      const div = document.createElement("div");
      div.classList.add("vendor-type-dropdown-option");

      const input = document.createElement("input");
      input.type = "radio";
      input.id = item;
      input.name = "sCountry";
      input.value = item;
      input.classList.add("cursor-pointer");
      input.classList.add("s-country-item");

      const label = document.createElement("span");
      label.setAttribute("for", item);
      label.innerHTML = item;
      label.classList.add("cursor-pointer");

      div.appendChild(input);
      div.appendChild(label);

      sCountryWrapper.appendChild(div);
    });
    togglePopup(sCountry, sCountryWrapper);

    const stateList = formData.data.states;

    let sState = document.getElementById("s-state");
    const sStateWrapper = document.getElementsByClassName("s-state-wrapper")[0];

    stateList.map((item) => {
      const div = document.createElement("div");
      div.classList.add("vendor-type-dropdown-option");

      const input = document.createElement("input");
      input.type = "radio";
      input.id = item.name;
      input.name = "sState";
      input.value = item.name;
      input.classList.add("cursor-pointer");
      input.classList.add("s-state-item");

      const label = document.createElement("span");
      label.setAttribute("for", item.name);
      label.innerHTML = item.name;
      label.classList.add("cursor-pointer");

      div.appendChild(input);
      div.appendChild(label);

      sStateWrapper.appendChild(div);

      mapStateNameToId[item.name] = item.stateCode;
    });

    togglePopup(sState, sStateWrapper);
  } catch (error) {}
  handleDataChange();
};

let sAttention_ = "";
let sCountry_ = "";
let sAddress_ = "";
let sAddress2_ = "";
let sCity_ = "";
let sState_ = "";
let sPinCode_ = "";
let sPhone_ = "";
let sFaxNumber_ = "";

let sAttention = document.getElementById("s-attention");

let sCountry = document.getElementById("s-country");
let sCountryItem = document.getElementsByClassName("s-country-item");

let sAddress = document.getElementById("s-address-1");
let sAddress2 = document.getElementById("s-address-2");
let sCity = document.getElementById("s-city");
let sState = document.getElementById("s-state");
let sStateItem = document.getElementsByClassName("s-state-item");
let sPinCode = document.getElementById("s-pin-code");
let sPhone = document.getElementById("s-phone");
let sFaxNumber = document.getElementById("s-fax-number");

const handleDataChange = () => {
  console.log("COUNTRY", sCountry_);
  sAttention = document.getElementById("s-attention");
  sAttention.value = sAttention_;
  sCountry = document.getElementById("s-country");
  sCountry.value = sCountry_;
  const sCountryRadio = document.querySelector(
    `input[name="sCountry"][value="${sCountry_}"]`
  );
  if (sCountryRadio) sCountryRadio.checked = true;
  sAddress = document.getElementById("s-address-1");
  sAddress.value = sAddress_;
  sAddress2 = document.getElementById("s-address-2");
  sAddress2.value = sAddress2_;
  sCity = document.getElementById("s-city");
  sCity.value = sCity_;
  sState = document.getElementById("s-state");
  sState.value = sState_;
  const sStateRadio = document.querySelector(
    `input[name="sState"][value="${sState_}"]`
  );
  if (sStateRadio) sStateRadio.checked = true;
  sPinCode = document.getElementById("s-pin-code");
  sPinCode.value = sPinCode_;
  sPhone = document.getElementById("s-phone");
  sPhone.value = sPhone_;
  sFaxNumber = document.getElementById("s-fax-number");
  sFaxNumber.value = sFaxNumber_;

  sAttention.addEventListener("input", (e) => {
    sAttention_ = e.target.value;
  });

  const sCountryArr = [...sCountryItem];
  sCountryArr.map((item) => {
    item.addEventListener("change", (e) => {
      // removeBorder(allVendorTypes);
      // document.getElementById("vendorType-error").classList.add("hidden");
      if (item.checked) {
        sCountry_ = e.target.value;
      }

      if (sCountry_ == "") {
        sCountry.value = "Select Country";
      } else {
        sCountry.value = sCountry_;
      }

      const sCountryWrapper =
        document.getElementsByClassName("s-country-wrapper")[0];
      sCountryWrapper.classList.add("hidden");

      console.log("country", sCountry_);
    });
  });

  const sStateArr = [...sStateItem];
  sStateArr.map((item) => {
    item.addEventListener("change", (e) => {
      // removeBorder(allVendorTypes);
      // document.getElementById("vendorType-error").classList.add("hidden");
      if (item.checked) {
        sState_ = e.target.value;
      }

      if (sState == "") {
        sState.value = "Select State";
      } else {
        sState.value = sState_;
      }

      const bCountryWrapper =
        document.getElementsByClassName("b-state-wrapper")[0];
      bCountryWrapper.classList.add("hidden");

      console.log("country", sState_);
    });
  });

  sAddress.addEventListener("input", (e) => {
    sAddress_ = e.target.value;
  });

  sAddress2.addEventListener("input", (e) => {
    sAddress2_ = e.target.value;
  });

  sCity.addEventListener("input", (e) => {
    sCity_ = e.target.value;
  });

  sState.addEventListener("input", (e) => {
    sState_ = e.target.value;
  });

  sPinCode.addEventListener("input", (e) => {
    sPinCode_ = e.target.value;
  });

  sPhone.addEventListener("input", (e) => {
    sPhone_ = e.target.value;
  });

  sFaxNumber.addEventListener("input", (e) => {
    sFaxNumber_ = e.target.value;
  });
};

export const copyBillingToShipping = () => {
  const bAttention = document.getElementById("b-attention").value;
  const bCountryElem = document.querySelector('input[name="bCountry"]:checked');
  const bCountry = bCountryElem ? bCountryElem.value : "";
  const bAddress = document.getElementById("b-address-1").value;
  const bAddress2 = document.getElementById("b-address-2").value;
  const bCity = document.getElementById("b-city").value;
  const bStateElem = document.querySelector('input[name="bState"]:checked');
  const bState = bStateElem ? bStateElem.value : "";
  const bPinCode = document.getElementById("b-pin-code").value;
  const bPhone = document.getElementById("b-phone").value;
  const bFaxNumber = document.getElementById("b-fax-number").value;

  document.getElementById("s-attention").value = bAttention;
  sAttention_ = bAttention;
  document.getElementById("s-address-1").value = bAddress;
  sAddress_ = bAddress;
  document.getElementById("s-address-2").value = bAddress2;
  sAddress2_ = bAddress2;
  document.getElementById("s-city").value = bCity;
  sCity_ = bCity;
  document.getElementById("s-pin-code").value = bPinCode;
  sPinCode_ = bPinCode;
  document.getElementById("s-phone").value = bPhone;
  sPhone_ = bPhone;
  document.getElementById("s-fax-number").value = bFaxNumber;
  sFaxNumber_ = bFaxNumber;

  if (bCountryElem) {
    document.getElementById("s-country").value = bCountry;
    sCountry_ = bCountry;
    const sCountryRadio = document.querySelector(
      `input[name="sCountry"][value="${bCountry}"]`
    );
    if (sCountryRadio) sCountryRadio.checked = true;
  }

  if (bStateElem) {
    document.getElementById("s-state").value = bState;
    sState_ = bState;
    const sStateRadio = document.querySelector(
      `input[name="sState"][value="${bState}"]`
    );
    if (sStateRadio) sStateRadio.checked = true;
  }
};

export async function getVendorShippingAddress() {
  sAttention_ = sAttention.value;
  sCountry_ = sCountry.value;
  sAddress_ = sAddress.value;
  sAddress2_ = sAddress2.value;
  sCity_ = sCity.value;
  sState_ = sState.value;
  sPinCode_ = sPinCode.value;
  sPhone_ = sPhone.value;
  sFaxNumber_ = sFaxNumber.value;

  const postData = {
    attention: sAttention_,
    country: sCountry_,
    addressLine1: sAddress_,
    addressLine2: sAddress2_,
    city: sCity_,
    stateId: mapStateNameToId[sState_],
    pinCode: sPinCode_,
    phone: sPhone_,
    faxNumber: sFaxNumber_,
  };

  return postData;
}

export async function clearShippingData() {
  sAttention_ = "";
  sCountry_ = "";
  sAddress_ = "";
  sAddress2_ = "";
  sCity_ = "";
  sState_ = "";
  sPhone_ = "";
  sFaxNumber_ = "";
}
