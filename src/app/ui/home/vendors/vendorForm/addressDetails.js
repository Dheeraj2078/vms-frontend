import { getVendorFormDropdown } from "../../../../service/vendorsApi";

export const togglePopup = (div, div2) => {
  div.addEventListener("click", (e) => {
    if (div2.classList.contains("hidden")) {
      div2.classList.remove("hidden");
    } else {
      div2.classList.add("hidden");
    }
  });
};

const mapStateNameToId = {};
export const handleMultipleDropdownForBillingAddress = async (formData) => {
  try {
    // const formData = await getVendorFormDropdown(); //api
    const countryList = formData.data.country;
    let bCountry = document.getElementById("b-country");
    const bCountryWrapper =
      document.getElementsByClassName("b-country-wrapper")[0];
    countryList.map((item) => {
      const div = document.createElement("div");
      div.classList.add("vendor-type-dropdown-option");

      const input = document.createElement("input");
      input.type = "radio";
      input.id = item;
      input.name = "bCountry";
      input.value = item;
      input.classList.add("cursor-pointer");
      input.classList.add("b-country-item");

      const label = document.createElement("span");
      label.setAttribute("for", item);
      label.innerHTML = item;
      label.classList.add("cursor-pointer");

      div.appendChild(input);
      div.appendChild(label);

      bCountryWrapper.appendChild(div);
    });
    togglePopup(bCountry, bCountryWrapper);

    const stateList = formData.data.states;

    let bState = document.getElementById("b-state");
    const bStateWrapper = document.getElementsByClassName("b-state-wrapper")[0];

    stateList.map((item) => {
      const div = document.createElement("div");
      div.classList.add("vendor-type-dropdown-option");

      const input = document.createElement("input");
      input.type = "radio";
      input.id = item.name;
      input.name = "bState";
      input.value = item.name;
      input.classList.add("cursor-pointer");
      input.classList.add("b-state-item");

      const label = document.createElement("span");
      label.setAttribute("for", item.name);
      label.innerHTML = item.name;
      label.classList.add("cursor-pointer");

      div.appendChild(input);
      div.appendChild(label);

      bStateWrapper.appendChild(div);

      mapStateNameToId[item.name] = item.stateCode;
    });

    togglePopup(bState, bStateWrapper);
  } catch (error) {}
  handleDataChange();
};

let bAttention_ = "";
let bCountry_ = "";
let bAddress_ = "";
let bAddress2_ = "";
let bCity_ = "";
let bState_ = "";
let bPinCode_ = "";
let bPhone_ = "";
let bFaxNumber_ = "";

let bAttention = document.getElementById("b-attention");

let bCountry = document.getElementById("b-country");
let bCountryItem = document.getElementsByClassName("b-country-item");

let bAddress = document.getElementById("b-address-1");
let bAddress2 = document.getElementById("b-address-2");
let bCity = document.getElementById("b-city");
let bState = document.getElementById("b-state");
let bStateItem = document.getElementsByClassName("b-state-item");
let bPinCode = document.getElementById("b-pin-code");
let bPhone = document.getElementById("b-phone");
let bFaxNumber = document.getElementById("b-fax-number");

const handleDataChange = () => {
  bAttention = document.getElementById("b-attention");
  bAttention.value = bAttention_;
  bCountry = document.getElementById("b-country");
  bCountry.value = bCountry_;
  bAddress = document.getElementById("b-address-1");
  bAddress.value = bAddress_;
  bAddress2 = document.getElementById("b-address-2");
  bAddress2.value = bAddress2_;
  bCity = document.getElementById("b-city");
  bCity.value = bCity_;
  bState = document.getElementById("b-state");
  bState.value = bState_;
  bPinCode = document.getElementById("b-pin-code");
  bPinCode.value = bPinCode_;
  bPhone = document.getElementById("b-phone");
  bPhone.value = bPhone_;
  bFaxNumber = document.getElementById("b-fax-number");
  bFaxNumber.value = bFaxNumber_;

  bAttention.addEventListener("input", (e) => {
    bAttention_ = e.target.value;
  });

  const bCountryArr = [...bCountryItem];
  bCountryArr.map((item) => {
    item.addEventListener("change", (e) => {
      // removeBorder(allVendorTypes);
      // document.getElementById("vendorType-error").classList.add("hidden");
      if (item.checked) {
        bCountry_ = e.target.value;
      }

      if (bCountry_ == "") {
        bCountry.value = "Select Country";
      } else {
        bCountry.value = bCountry_;
      }

      const bCountryWrapper =
        document.getElementsByClassName("b-country-wrapper")[0];
      bCountryWrapper.classList.add("hidden");

      console.log("country", bCountry_);
    });
  });

  const bStateArr = [...bStateItem];
  bStateArr.map((item) => {
    item.addEventListener("change", (e) => {
      // removeBorder(allVendorTypes);
      // document.getElementById("vendorType-error").classList.add("hidden");
      if (item.checked) {
        bState_ = e.target.value;
      }

      if (bState == "") {
        bState.value = "Select State";
      } else {
        bState.value = bState_;
      }

      const bCountryWrapper =
        document.getElementsByClassName("b-state-wrapper")[0];
      bCountryWrapper.classList.add("hidden");

      console.log("country", bState_);
    });
  });

  bAddress.addEventListener("input", (e) => {
    bAddress_ = e.target.value;
  });

  bAddress2.addEventListener("input", (e) => {
    bAddress2_ = e.target.value;
  });

  bCity.addEventListener("input", (e) => {
    bCity_ = e.target.value;
  });

  bState.addEventListener("input", (e) => {
    bState_ = e.target.value;
  });

  bPinCode.addEventListener("input", (e) => {
    bPinCode_ = e.target.value;
  });

  bPhone.addEventListener("input", (e) => {
    bPhone_ = e.target.value;
  });

  bFaxNumber.addEventListener("input", (e) => {
    bFaxNumber_ = e.target.value;
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
  document.getElementById("s-address-1").value = bAddress;
  document.getElementById("s-address-2").value = bAddress2;
  document.getElementById("s-city").value = bCity;
  document.getElementById("s-pin-code").value = bPinCode;
  document.getElementById("s-phone").value = bPhone;
  document.getElementById("s-fax-number").value = bFaxNumber;

  if (bCountryElem) {
    document.getElementById("s-country").value = bCountry;
    const sCountryRadio = document.querySelector(
      `input[name="sCountry"][value="${bCountry}"]`
    );
    if (sCountryRadio) sCountryRadio.checked = true;
  }

  if (bStateElem) {
    document.getElementById("s-state").value = bState;
    const sStateRadio = document.querySelector(
      `input[name="sState"][value="${bState}"]`
    );
    if (sStateRadio) sStateRadio.checked = true;
  }
};

export async function getVendorBillingAddress() {
  const postData = {
    attention: bAttention_,
    country: bCountry_,
    addressLine1: bAddress_,
    addressLine2: bAddress2_,
    city: bCity_,
    stateId: mapStateNameToId[bState_], // bState_,
    pinCode: bPinCode_,
    phone: bPhone_,
    faxNumber: bFaxNumber_,
  };

  return postData;
}
