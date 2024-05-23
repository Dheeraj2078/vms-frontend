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

function removeBorder(column) {
  if (column.classList.contains("empty-field-border")) {
    column.classList.remove("empty-field-border");
  }
  // column = column.trim();
}

const isNullOrEmpty = (value) => {
  if (
    typeof value === "string" &&
    (value === null || value.trim().length === 0)
  ) {
    return true;
  }
  return value === null;
};

const showErrorMessage = (error_element, text) => {
  if (error_element) {
    error_element.innerHTML = text;
    error_element.classList.remove("hidden");
  }
};

const checkFieldValues = () => {
  let checkResult = true;
  if (isNullOrEmpty(sAttention_)) {
    const error_element = document.getElementById("s-attention-error");
    console.log(error_element);
    showErrorMessage(error_element, "Please enter attention");
    sAttention.classList.add("empty-field-border");
    checkResult = false;
  }
  if (isNullOrEmpty(sCountry_)) {
    const error_element = document.getElementById("s-country-error");
    console.log(error_element);
    showErrorMessage(error_element, "Please select country");
    sCountry.classList.add("empty-field-border");
    checkResult = false;
  }
  if (isNullOrEmpty(sAddress_)) {
    const error_element = document.getElementById("s-address-error");
    console.log(error_element);
    showErrorMessage(error_element, "Please enter the address");
    sAddress.classList.add("empty-field-border");
    checkResult = false;
  }

  if (isNullOrEmpty(sAddress2_)) {
    const error_element = document.getElementById("s-address2-error");
    console.log(error_element);
    showErrorMessage(error_element, "Please enter the address");
    sAddress2.classList.add("empty-field-border");
    checkResult = false;
  }

  if (isNullOrEmpty(sCity_)) {
    const error_element = document.getElementById("s-city-error");
    console.log(error_element);
    showErrorMessage(error_element, "Please enter the city");
    sCity.classList.add("empty-field-border");
    checkResult = false;
  }
  if (isNullOrEmpty(sState_)) {
    const error_element = document.getElementById("s-state-error");
    console.log(error_element);
    showErrorMessage(error_element, "Please select payment terms");
    sState.classList.add("empty-field-border");
    checkResult = false;
  }
  if (isNullOrEmpty(sPinCode_)) {
    const error_element = document.getElementById("s-pincode-error");
    console.log(error_element);
    showErrorMessage(error_element, "Please enter pin code");
    sPinCode.classList.add("empty-field-border");
    checkResult = false;
  }

  if (isNullOrEmpty(sPhone_)) {
    const error_element = document.getElementById("s-phone-error");
    console.log(error_element);
    showErrorMessage(error_element, "Please enter phone number");
    sPhone.classList.add("empty-field-border");
    checkResult = false;
  }

  if (isNullOrEmpty(sFaxNumber_)) {
    const error_element = document.getElementById("s-fax-error");
    console.log(error_element);
    showErrorMessage(error_element, "Please enter fax number");
    sFaxNumber.classList.add("empty-field-border");
    checkResult = false;
  }
  // if (isNullOrEmpty(lastName_)) {
  //   const error_element = document.getElementById("document-error");
  //   showErrorMessage(error_element, "Please enter last Name");
  //   lastName.classList.add("empty-field-border");
  //   checkResult = false;
  // }

  return checkResult;
};

const handleDataChange = () => {
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
    removeBorder(sAttention);
    document.getElementById("s-attention-error").classList.add("hidden");
    sAttention_ = e.target.value;
  });

  const sCountryArr = [...sCountryItem];
  sCountryArr.map((item) => {
    item.addEventListener("change", (e) => {
      removeBorder(sCountry);
      document.getElementById("s-country-error").classList.add("hidden");
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
      removeBorder(sState);
      document.getElementById("s-state-error").classList.add("hidden");
      if (item.checked) {
        sState_ = e.target.value;
      }

      if (sState == "") {
        sState.value = "Select State";
      } else {
        sState.value = sState_;
      }

      const sStateWrapper =
        document.getElementsByClassName("s-state-wrapper")[0];
      sStateWrapper.classList.add("hidden");

      console.log("state", sState_);
    });
  });

  sAddress.addEventListener("input", (e) => {
    removeBorder(sAddress);
    document.getElementById("s-address-error").classList.add("hidden");
    sAddress_ = e.target.value;
  });

  sAddress2.addEventListener("input", (e) => {
    removeBorder(sAddress2);
    document.getElementById("s-address2-error").classList.add("hidden");
    sAddress2_ = e.target.value;
  });

  sCity.addEventListener("input", (e) => {
    removeBorder(sCity);
    document.getElementById("s-city-error").classList.add("hidden");
    sCity_ = e.target.value;
  });

  sState.addEventListener("input", (e) => {
    removeBorder(sState);
    document.getElementById("s-state-error").classList.add("hidden");
    sState_ = e.target.value;
  });

  sPinCode.addEventListener("input", (e) => {
    removeBorder(sPinCode);
    document.getElementById("s-pincode-error").classList.add("hidden");
    sPinCode_ = e.target.value;
  });

  sPhone.addEventListener("input", (e) => {
    removeBorder(sPhone);
    document.getElementById("s-phone-error").classList.add("hidden");
    sPhone_ = e.target.value;
  });

  sFaxNumber.addEventListener("input", (e) => {
    removeBorder(sFaxNumber);
    document.getElementById("s-fax-error").classList.add("hidden");
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
  removeBorder(sAttention);
  document.getElementById("s-attention-error").classList.add("hidden");

  document.getElementById("s-address-1").value = bAddress;
  sAddress_ = bAddress;
  removeBorder(sAddress);
  document.getElementById("s-address-error").classList.add("hidden");

  document.getElementById("s-address-2").value = bAddress2;
  sAddress2_ = bAddress2;
  // removeBorder(sAddress2);
  // document.getElementById("s-address2-error").classList.add("hidden");

  document.getElementById("s-city").value = bCity;
  sCity_ = bCity;
  removeBorder(sCity);
  document.getElementById("s-city-error").classList.add("hidden");

  document.getElementById("s-pin-code").value = bPinCode;
  sPinCode_ = bPinCode;
  removeBorder(sPinCode);
  document.getElementById("s-pincode-error").classList.add("hidden");

  document.getElementById("s-phone").value = bPhone;
  sPhone_ = bPhone;
  removeBorder(sPhone);
  document.getElementById("s-phone-error").classList.add("hidden");

  document.getElementById("s-fax-number").value = bFaxNumber;
  sFaxNumber_ = bFaxNumber;
  removeBorder(sFaxNumber);
  document.getElementById("s-fax-error").classList.add("hidden");

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
    removeBorder(sState);
    document.getElementById("s-state-error").classList.add("hidden");
  }
};

export async function getVendorShippingAddress() {
  if (!checkFieldValues()) {
    console.log("all fields are mandatory");
    return null;
  }

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
  sPinCode_ = "";
}

export async function updateVendorS(objS) {
  sAttention_ = objS.attention;
  sCountry_ = objS.country;
  sAddress_ = objS.addressLine1;
  sAddress2_ = objS.addressLine2;
  sCity_ = objS.city;
  sState_ = objS.state;
  sPhone_ = objS.phone;
  sFaxNumber_ = objS.faxNumber;
  sPinCode_ = objS.pinCode;
}
