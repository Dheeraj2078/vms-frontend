const togglePopup = (div, div2) => {
  div.addEventListener("click", (e) => {
    if (div2.classList.contains("hidden")) {
      div2.classList.remove("hidden");
    } else {
      div2.classList.add("hidden");
    }
  });
};

export const handleMultipleDropdownForAddress = async () => {
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
    let bCountry = document.getElementById("b-country");
    const bCountryWrapper =
      document.getElementsByClassName("b-country-wrapper")[0];
    countryList.map((item) => {
      const div = document.createElement("div");
      div.classList.add("vendor-type-dropdown-option");

      const input = document.createElement("input");
      input.type = "radio";
      input.id = item.name;
      input.name = "bCountry";
      input.value = item.name;
      input.classList.add("cursor-pointer");
      input.classList.add("b-country-item");

      const label = document.createElement("span");
      label.setAttribute("for", item.name);
      label.innerHTML = item.name;
      label.classList.add("cursor-pointer");

      div.appendChild(input);
      div.appendChild(label);

      bCountryWrapper.appendChild(div);
    });
    togglePopup(bCountry, bCountryWrapper);
  } catch (error) {}
  handleDataChange();
};

let bAttention_ = "";
let bCountry_ = "";
let bAddress_ = "";
let bCity_ = "";
let bState_ = "";
let bPinCode_ = "";
let bPhone_ = "";
let bFaxNumber_ = "";

let bAttention = document.getElementById("b-attention");

let bCountry = document.getElementById("b-country");
let bCountryItem = document.getElementsByClassName("b-country-item");

let bAddress = document.getElementById("b-address");
let bCity = document.getElementById("b-city");
let bState = document.getElementById("b-state");
let bPinCode = document.getElementById("b-pin-code");
let bPhone = document.getElementById("b-phone");
let bFaxNumber = document.getElementById("b-fax-number");

const handleDataChange = () => {
  bCountry = document.getElementById("b-country");
  bCountry.value = bCountry_;

  bAttention.addEventListener("input", (e) => {
    bAttention_ = e.target.value;
  });

  const gstTreatmentArr = [...bCountryItem];
  gstTreatmentArr.map((item) => {
    item.addEventListener("change", (e) => {
      // removeBorder(allVendorTypes);
      // document.getElementById("vendorType-error").classList.add("hidden");
      if (item.checked) {
        bCountry_ = e.target.value;
      }

      if (bCountry_ == "") {
        bCountry.value = "Select GST Treatment";
      } else {
        bCountry.value = bCountry_;
      }

      const bCountryWrapper =
        document.getElementsByClassName("b-country-wrapper")[0];
      bCountryWrapper.classList.add("hidden");

      console.log("gst treatment", bCountry_);
    });
  });

  bAddress.addEventListener("click", (e) => {
    bAddress_ = e.target.value;
  });

  bCity.addEventListener("click", (e) => {
    bCity_ = e.target.value;
  });

  bState.addEventListener("click", (e) => {
    bState_ = e.target.value;
  });

  bPinCode.addEventListener("click", (e) => {
    bPinCode_ = e.target.value;
  });

  bPhone.addEventListener("click", (e) => {
    bPhone_ = e.target.value;
  });

  bFaxNumber.addEventListener("click", (e) => {
    bFaxNumber_ = e.target.value;
  });
};
