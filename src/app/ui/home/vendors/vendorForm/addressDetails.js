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
  if (isNullOrEmpty(bAttention_)) {
    const error_element = document.getElementById("b-attention-error");
    console.log(error_element);
    showErrorMessage(error_element, "Please enter attention");
    bAttention.classList.add("empty-field-border");
    checkResult = false;
  }
  if (isNullOrEmpty(bCountry_)) {
    const error_element = document.getElementById("b-country-error");
    console.log(error_element);
    showErrorMessage(error_element, "Please select country");
    bCountry.classList.add("empty-field-border");
    checkResult = false;
  }
  if (isNullOrEmpty(bAddress_)) {
    const error_element = document.getElementById("b-address-error");
    console.log(error_element);
    showErrorMessage(error_element, "Please enter the address");
    bAddress.classList.add("empty-field-border");
    checkResult = false;
  }

  if (isNullOrEmpty(bAddress2_)) {
    const error_element = document.getElementById("b-address-error");
    console.log(error_element);
    showErrorMessage(error_element, "Please enter the address");
    bAddress2.classList.add("empty-field-border");
    checkResult = false;
  }

  if (isNullOrEmpty(bCity_)) {
    const error_element = document.getElementById("b-city-error");
    console.log(error_element);
    showErrorMessage(error_element, "Please enter the city");
    bCity.classList.add("empty-field-border");
    checkResult = false;
  }
  if (isNullOrEmpty(bState_)) {
    const error_element = document.getElementById("b-state-error");
    console.log(error_element);
    showErrorMessage(error_element, "Please select payment terms");
    bState.classList.add("empty-field-border");
    checkResult = false;
  }
  if (isNullOrEmpty(bPinCode_)) {
    const error_element = document.getElementById("b-pincode-error");
    console.log(error_element);
    showErrorMessage(error_element, "Please enter pin code");
    bPinCode.classList.add("empty-field-border");
    checkResult = false;
  }

  if (isNullOrEmpty(bPhone_)) {
    const error_element = document.getElementById("b-phone-error");
    console.log(error_element);
    showErrorMessage(error_element, "Please enter phone number");
    bPhone.classList.add("empty-field-border");
    checkResult = false;
  }

  if (isNullOrEmpty(bFaxNumber_)) {
    const error_element = document.getElementById("b-fax-error");
    console.log(error_element);
    showErrorMessage(error_element, "Please enter fax number");
    bFaxNumber.classList.add("empty-field-border");
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
  bAttention = document.getElementById("b-attention");
  bAttention.value = bAttention_;
  bCountry = document.getElementById("b-country");
  bCountry.value = bCountry_;
  const bCountryRadio = document.querySelector(
    `input[name="bCountry"][value="${bCountry_}"]`
  );
  if (bCountryRadio) bCountryRadio.checked = true;
  bAddress = document.getElementById("b-address-1");
  bAddress.value = bAddress_;
  bAddress2 = document.getElementById("b-address-2");
  bAddress2.value = bAddress2_;
  bCity = document.getElementById("b-city");
  bCity.value = bCity_;
  bState = document.getElementById("b-state");
  bState.value = bState_;
  const bStateRadio = document.querySelector(
    `input[name="bState"][value="${bState_}"]`
  );
  if (bStateRadio) bStateRadio.checked = true;
  bPinCode = document.getElementById("b-pin-code");
  bPinCode.value = bPinCode_;
  bPhone = document.getElementById("b-phone");
  bPhone.value = bPhone_;
  bFaxNumber = document.getElementById("b-fax-number");
  bFaxNumber.value = bFaxNumber_;

  bAttention.addEventListener("input", (e) => {
    removeBorder(bAttention);
    document.getElementById("b-attention-error").classList.add("hidden");
    bAttention_ = e.target.value;
  });

  const bCountryArr = [...bCountryItem];
  bCountryArr.map((item) => {
    item.addEventListener("change", (e) => {
      removeBorder(bCountry);
      document.getElementById("b-country-error").classList.add("hidden");
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
      removeBorder(bState);
      document.getElementById("b-state-error").classList.add("hidden");
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
    removeBorder(bAddress);
    document.getElementById("b-address-error").classList.add("hidden");
    bAddress_ = e.target.value;
  });

  bAddress2.addEventListener("input", (e) => {
    removeBorder(bAddress2);
    document.getElementById("b-address-error").classList.add("hidden");
    bAddress2_ = e.target.value;
  });

  bCity.addEventListener("input", (e) => {
    removeBorder(bCity);
    document.getElementById("b-city-error").classList.add("hidden");
    bCity_ = e.target.value;
  });

  bState.addEventListener("input", (e) => {
    removeBorder(bState);
    document.getElementById("b-state-error").classList.add("hidden");
    bState_ = e.target.value;
  });

  bPinCode.addEventListener("input", (e) => {
    removeBorder(bPinCode);
    document.getElementById("b-pincode-error").classList.add("hidden");
    bPinCode_ = e.target.value;
  });

  bPhone.addEventListener("input", (e) => {
    removeBorder(bPhone);
    document.getElementById("b-phone-error").classList.add("hidden");
    bPhone_ = e.target.value;
  });

  bFaxNumber.addEventListener("input", (e) => {
    removeBorder(bFaxNumber);
    document.getElementById("b-fax-error").classList.add("hidden");
    bFaxNumber_ = e.target.value;
  });
};

export async function getVendorBillingAddress() {
  if (!checkFieldValues()) {
    console.log("all fields are mandatory");
    return null;
  }

  const postData = {
    attention: bAttention_,
    country: bCountry_,
    addressLine1: bAddress_,
    addressLine2: bAddress2_,
    city: bCity_,
    stateId: mapStateNameToId[bState_],
    pinCode: bPinCode_,
    phone: bPhone_,
    faxNumber: bFaxNumber_,
  };

  return postData;
}

export async function clearBillingData() {
  bAttention_ = "";
  bCountry_ = "";
  bAddress_ = "";
  bAddress2_ = "";
  bCity_ = "";
  bState_ = "";
  bPhone_ = "";
  bFaxNumber_ = "";
  bPinCode_ = "";
}

export async function updateVendorB(objB) {
  bAttention_ = objB.attention;
  bCountry_ = objB.country;
  bAddress_ = objB.addressLine1;
  bAddress2_ = objB.addressLine2;
  bCity_ = objB.city;
  bState_ = objB.state;
  bPhone_ = objB.phone;
  bFaxNumber_ = objB.faxNumber;
  bPinCode_ = objB.pinCode;
}
