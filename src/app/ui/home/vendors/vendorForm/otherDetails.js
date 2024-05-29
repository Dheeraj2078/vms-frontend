import { getVendorFormDropdown } from "../../../../service/vendorsApi";

const togglePopup = (div, div2) => {
  div.addEventListener("click", (e) => {
    if (div2.classList.contains("hidden")) {
      div2.classList.remove("hidden");
    } else {
      div2.classList.add("hidden");
    }
  });
};

const decodePaymentTerms = (str, delimiter1, delimiter2) => {
  const arr = str.split(delimiter1);
  const res = arr.join(delimiter2);

  console.log("SHOUT", res);
  return res;
};

const mapTdsToId = {};
const mapStateNameToStateCode = {};
export const handleMultipleDropdownForOther = async (formData) => {
  try {
    // const formData = await getVendorFormData(); //api
    // const formData = await getVendorFormDropdown();
    // console.log("FORMDATA", formData);

    // const gstTreatmentList = [
    //   {
    //     name: "aaaa",
    //   },
    //   { name: "bbb" },
    // ];

    // let gstTreatment = document.getElementById("gst-treatment");
    // const gstTreatmentWrapper = document.getElementsByClassName(
    //   "gst-treatment-wrapper"
    // )[0];
    // gstTreatmentList.map((item) => {
    //   const div = document.createElement("div");
    //   div.classList.add("vendor-type-dropdown-option");

    //   const input = document.createElement("input");
    //   input.type = "radio";
    //   input.id = item.name;
    //   input.name = "gstTreatment";
    //   input.value = item.name;
    //   input.classList.add("cursor-pointer");
    //   input.classList.add("gst-treatment-item");

    //   const label = document.createElement("label");
    //   label.setAttribute("for", item.name);
    //   label.innerHTML = item.name;
    //   label.classList.add("cursor-pointer");

    //   div.appendChild(input);
    //   div.appendChild(label);

    //   gstTreatmentWrapper.appendChild(div);
    // });
    // togglePopup(gstTreatment, gstTreatmentWrapper);

    const sourceOfsupplyList = formData.data.states;
    console.log("MSD7", sourceOfsupplyList);
    let sourceOfsupply = document.getElementById("source-of-supply");
    const sourceOfsupplyWrapper = document.getElementsByClassName(
      "source-of-supply-wrapper"
    )[0];
    sourceOfsupplyList.map((item) => {
      const div = document.createElement("div");
      div.classList.add("vendor-type-dropdown-option");

      const input = document.createElement("input");
      input.type = "radio";
      input.id = item.name;
      input.name = "vendorType";
      input.value = item.name;
      input.classList.add("cursor-pointer");
      input.classList.add("sos-item");

      const label = document.createElement("label");
      label.setAttribute("for", item.name);
      label.innerHTML = item.name;
      label.classList.add("cursor-pointer");

      div.appendChild(input);
      div.appendChild(label);

      sourceOfsupplyWrapper.appendChild(div);

      mapStateNameToStateCode[item.stateCode] = item.name;
    });
    togglePopup(sourceOfsupply, sourceOfsupplyWrapper);

    const currencyList = formData.data.currency;
    let currency = document.getElementById("currency");
    const currencyWrapper =
      document.getElementsByClassName("currency-wrapper")[0];
    currencyList.map((item) => {
      const div = document.createElement("div");
      div.classList.add("vendor-type-dropdown-option");

      const input = document.createElement("input");
      input.type = "radio";
      input.id = item;
      input.name = "vendorType";
      input.value = item;
      input.classList.add("cursor-pointer");
      input.classList.add("currency-item");

      const label = document.createElement("label");
      label.setAttribute("for", item);
      label.innerHTML = item;
      label.classList.add("cursor-pointer");

      div.appendChild(input);
      div.appendChild(label);

      currencyWrapper.appendChild(div);
    });
    togglePopup(currency, currencyWrapper);

    const paymentTermsList = formData.data.paymentTerms;
    let paymentTerms = document.getElementById("payment-terms");
    const paymentTermsWrapper = document.getElementsByClassName(
      "payment-terms-wrapper"
    )[0];
    paymentTermsList.map((item) => {
      const div = document.createElement("div");
      div.classList.add("vendor-type-dropdown-option");

      const input = document.createElement("input");
      input.type = "radio";
      input.id = item;
      input.name = "vendorType";
      input.value = decodePaymentTerms(item, "_", " ");
      input.classList.add("cursor-pointer");
      input.classList.add("payment-terms-item");

      const label = document.createElement("label");
      label.setAttribute("for", item);
      label.innerHTML = decodePaymentTerms(item, "_", " ");
      label.classList.add("cursor-pointer");

      div.appendChild(input);
      div.appendChild(label);

      paymentTermsWrapper.appendChild(div);
    });
    togglePopup(paymentTerms, paymentTermsWrapper);

    const tdsList = formData.data.tdsOptions;
    let tds = document.getElementById("tds");
    const tdsWrapper = document.getElementsByClassName("tds-wrapper")[0];
    tdsList.map((item) => {
      const div = document.createElement("div");
      div.classList.add("vendor-type-dropdown-option");

      const input = document.createElement("input");
      input.type = "radio";
      input.id = item.name;
      input.name = "vendorType";
      input.value = item.name;
      input.classList.add("cursor-pointer");
      input.classList.add("tds-item");

      const label = document.createElement("label");
      label.setAttribute("for", item.name);
      label.innerHTML = item.name;
      label.classList.add("cursor-pointer");

      div.appendChild(input);
      div.appendChild(label);

      tdsWrapper.appendChild(div);
      mapTdsToId[item.name] = item.id;
    });
    togglePopup(tds, tdsWrapper);
  } catch (error) {
    console.log(error);
  }

  handleDataChange();
};

// let gstTreatment_ = "";
let gstIn_ = "";
let sos_ = "";
let pan_ = "";
let currency_ = "";
let paymentTerms_ = "";
let tds_ = "";
let document_ = "";

// let gstTreatment = document.getElementById("gst-treatment");
// let gstTreatmentItem = document.getElementsByClassName("gst-treatment-item");

let sos = document.getElementById("source-of-supply");
let sosItem = document.getElementsByClassName("sos-item");

let gstIn = document.getElementById("gstin");
let pan = document.getElementById("pan");

let currency = document.getElementById("currency");
let currencyItem = document.getElementsByClassName("currency-item");

let paymentTerms = document.getElementById("payment-terms");
let paymentTermsItem = document.getElementsByClassName("payment-terms-item");

let tds = document.getElementById("tds");
let tdsItem = document.getElementsByClassName("tds-item");

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
  if (isNullOrEmpty(gstIn_) || gstIn_.length != 15) {
    const error_element = document.getElementById("gst-error");
    console.log(error_element);
    showErrorMessage(error_element, "Please enter valid gstin/uin");
    gstIn.classList.add("empty-field-border");
    checkResult = false;
  }
  // if (isNullOrEmpty(sos_)) {
  //   const error_element = document.getElementById("sos-error");
  //   console.log(error_element);
  //   showErrorMessage(error_element, "Please select source of supply");
  //   sos.classList.add("empty-field-border");
  //   checkResult = false;
  // }
  // if (isNullOrEmpty(pan_)) {
  //   const error_element = document.getElementById("pan-error");
  //   console.log(error_element);
  //   showErrorMessage(error_element, "Please enter pan number");
  //   pan.classList.add("empty-field-border");
  //   checkResult = false;
  // }

  if (isNullOrEmpty(currency_)) {
    const error_element = document.getElementById("currency-error");
    console.log(error_element);
    showErrorMessage(error_element, "Please select currency");
    currency.classList.add("empty-field-border");
    checkResult = false;
  }
  if (isNullOrEmpty(paymentTerms_)) {
    const error_element = document.getElementById("payment-terms-error");
    console.log(error_element);
    showErrorMessage(error_element, "Please select payment terms");
    paymentTerms.classList.add("empty-field-border");
    checkResult = false;
  }
  if (isNullOrEmpty(tds_)) {
    const error_element = document.getElementById("tds-error");
    console.log(error_element);
    showErrorMessage(error_element, "Please select tds");
    tds.classList.add("empty-field-border");
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
  // console.log("->", gstTreatment_);
  // gstTreatment = document.getElementById("gst-treatment");
  // gstTreatment.value = gstTreatment_;
  sos = document.getElementById("source-of-supply");
  sos.value = sos_;
  gstIn = document.getElementById("gstin");
  gstIn.value = gstIn_;
  pan = document.getElementById("pan");
  pan.value = pan_;
  currency = document.getElementById("currency");
  currency.value = currency_;
  paymentTerms = document.getElementById("payment-terms");
  paymentTerms.value = paymentTerms_;
  tds = document.getElementById("tds");
  tds.value = tds_;

  // const gstTreatmentArr = [...gstTreatmentItem];
  // gstTreatmentArr.map((item) => {
  //   item.addEventListener("change", (e) => {
  //     // removeBorder(allVendorTypes);
  //     // document.getElementById("vendorType-error").classList.add("hidden");
  //     if (item.checked) {
  //       gstTreatment_ = e.target.value;
  //     }

  //     if (gstTreatment_ == "") {
  //       gstTreatment.value = "Select GST Treatment";
  //     } else {
  //       gstTreatment.value = gstTreatment_;
  //     }

  //     const gstTreatmentId = document.getElementsByClassName(
  //       "gst-treatment-wrapper"
  //     )[0];
  //     gstTreatmentId.classList.add("hidden");

  //     console.log("gst treatment", gstTreatment_);
  //   });
  // });

  const sosItemArr = [...sosItem];
  sosItemArr.map((item) => {
    item.addEventListener("change", (e) => {
      removeBorder(sos);
      document.getElementById("sos-error").classList.add("hidden");
      if (item.checked) {
        sos_ = e.target.value;
      }

      if (sos_ == "") {
        sos.value = "";
      } else {
        sos.value = sos_;
      }

      const sosWrapper = document.getElementsByClassName(
        "source-of-supply-wrapper"
      )[0];
      sosWrapper.classList.add("hidden");

      console.log("gst treatment", sos_);
    });
  });

  gstIn.addEventListener("input", (e) => {
    gstIn_ = e.target.value;

    const res = extractDetailsFromGSTIN(gstIn_);
    console.log("res", res);
    if (res && mapStateNameToStateCode[Number(res.stateCode)]) {
      const stateCode = res.stateCode;
      const panNumber = res.pan;

      console.log("state code", stateCode);

      pan.value = panNumber;
      sos.value = mapStateNameToStateCode[Number(stateCode)];

      const radioButton = document.querySelector(
        `input[type="radio"][value="${sos.value}"]`
      );
      console.log(radioButton);
      // If found, set it to checked
      if (radioButton) {
        radioButton.checked = true;
      }
    } else {
      pan.value = "";
      sos.value = "";
    }

    removeBorder(gstIn);
    document.getElementById("gst-error").classList.add("hidden");
  });

  pan.addEventListener("input", (e) => {
    pan_ = e.target.value;
    removeBorder(pan);
    document.getElementById("pan-error").classList.add("hidden");
  });

  const currencyArr = [...currencyItem];
  currencyArr.map((item) => {
    item.addEventListener("change", (e) => {
      removeBorder(currency);
      document.getElementById("currency-error").classList.add("hidden");
      if (item.checked) {
        currency_ = e.target.value;
      }

      if (currency_ == "") {
        currency.value = "";
      } else {
        currency.value = currency_;
      }

      const currencyWrapper =
        document.getElementsByClassName("currency-wrapper")[0];
      currencyWrapper.classList.add("hidden");

      console.log("gst treatment", currency_);
    });
  });

  const paymentTermsArr = [...paymentTermsItem];
  paymentTermsArr.map((item) => {
    item.addEventListener("change", (e) => {
      removeBorder(paymentTerms);
      document.getElementById("payment-terms-error").classList.add("hidden");
      if (item.checked) {
        paymentTerms_ = e.target.value;
      }

      if (paymentTerms_ == "") {
        paymentTerms.value = "";
      } else {
        paymentTerms.value = paymentTerms_;
      }

      const paymentTermsWrapper = document.getElementsByClassName(
        "payment-terms-wrapper"
      )[0];
      paymentTermsWrapper.classList.add("hidden");

      console.log("gst treatment", paymentTerms_);
    });
  });

  const tdsArr = [...tdsItem];
  tdsArr.map((item) => {
    item.addEventListener("change", (e) => {
      removeBorder(tds);
      document.getElementById("tds-error").classList.add("hidden");
      if (item.checked) {
        tds_ = e.target.value;
      }

      if (tds_ == "") {
        tds.value = "";
      } else {
        tds.value = tds_;
      }

      const tdsWrapper = document.getElementsByClassName("tds-wrapper")[0];
      tdsWrapper.classList.add("hidden");

      console.log("gst treatment", tds_);
    });
  });
};

export async function getVendorOtherInformation() {
  if (!checkFieldValues()) {
    console.log("all fields are mandatory");
    return null;
  }

  const postData = {
    gstin: gstIn_,
    // sos: sos_,
    // pan: pan_,
    currency: currency_,
    paymentTerms: decodePaymentTerms(paymentTerms_, " ", "_"),
    tdsId: mapTdsToId[tds_], // tds_,
    // document: document_,
  };

  return postData;
}

export async function clearOtherData() {
  gstIn_ = "";
  sos_ = "";
  pan_ = "";
  currency_ = "";
  paymentTerms_ = "";
  tds_ = "";
  document_ = "";
}

export const updateVendorOther = (objOther) => {
  gstIn_ = objOther.gstin;
  sos_ = objOther.sos;
  pan_ = objOther.pan;
  currency_ = objOther.currency;
  paymentTerms_ = objOther.paymentTerms;
  tds_ = objOther.tds;
  document_ = "";
};

export function extractDetailsFromGSTIN(gstin) {
  // if (gstin.length !== 15) {
  //   throw new Error("Invalid GSTIN length");
  // }

  if (gstin.length == 15) {
    const stateCode = gstin.slice(0, 2); // First two characters
    const pan = gstin.slice(2, 12); // Next ten characters

    return {
      stateCode: stateCode,
      pan: pan,
    };
  }
}
