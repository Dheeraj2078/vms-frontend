import { togglePopup } from "./addressDetails";

export const handleMultipleDropdownForShippingAddress = async () => {
  try {
    // const formData = await getVendorFormData(); //api
    const countryList = [
      {
        name: "India",
      },
      {
        name: "USA",
      },
    ];
    let sCountry = document.getElementById("s-country");
    const sCountryWrapper =
      document.getElementsByClassName("s-country-wrapper")[0];
    countryList.map((item) => {
      const div = document.createElement("div");
      div.classList.add("vendor-type-dropdown-option");

      const input = document.createElement("input");
      input.type = "radio";
      input.id = item.name;
      input.name = "sCountry";
      input.value = item.name;
      input.classList.add("cursor-pointer");
      input.classList.add("s-country-item");

      const label = document.createElement("span");
      label.setAttribute("for", item.name);
      label.innerHTML = item.name;
      label.classList.add("cursor-pointer");

      div.appendChild(input);
      div.appendChild(label);

      sCountryWrapper.appendChild(div);
    });
    togglePopup(sCountry, sCountryWrapper);

    const stateList = [
      {
        name: "California",
      },
      {
        name: "Texas",
      },
      // Add more states as needed
    ];

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
    });

    togglePopup(sState, sStateWrapper);
  } catch (error) {}
  handleDataChange();
};

let sAttention_ = "";
let sCountry_ = "";
let sAddress_ = "";
let sCity_ = "";
let sState_ = "";
let sPinCode_ = "";
let sPhone_ = "";
let sFaxNumber_ = "";

let sAttention = document.getElementById("s-attention");

let sCountry = document.getElementById("s-country");
let sCountryItem = document.getElementsByClassName("s-country-item");

let sAddress = document.getElementById("s-address-1");
let sCity = document.getElementById("s-city");
let sState = document.getElementById("s-state");
let sPinCode = document.getElementById("s-pin-code");
let sPhone = document.getElementById("s-phone");
let sFaxNumber = document.getElementById("s-fax-number");

const handleDataChange = () => {
  sAttention = document.getElementById("s-attention");
  sAttention.value = sAttention_;
  sCountry = document.getElementById("s-country");
  sCountry.value = sCountry_;
  sAddress = document.getElementById("s-address-1");
  sAddress.value = sAddress_;
  sCity = document.getElementById("s-city");
  sCity.value = sCity_;
  sState = document.getElementById("s-state");
  sState.value = sState_;
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

  sAddress.addEventListener("click", (e) => {
    sAddress_ = e.target.value;
  });

  sCity.addEventListener("click", (e) => {
    sCity_ = e.target.value;
  });

  sState.addEventListener("click", (e) => {
    sState_ = e.target.value;
  });

  sPinCode.addEventListener("click", (e) => {
    sPinCode_ = e.target.value;
  });

  sPhone.addEventListener("click", (e) => {
    sPhone_ = e.target.value;
  });

  sFaxNumber.addEventListener("click", (e) => {
    sFaxNumber_ = e.target.value;
  });
};
