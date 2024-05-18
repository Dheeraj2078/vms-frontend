const togglePopup = (div, div2) => {
  div.addEventListener("click", (e) => {
    if (div2.classList.contains("hidden")) {
      div2.classList.remove("hidden");
    } else {
      div2.classList.add("hidden");
    }
  });
};

export const handleMultipleDropdownForOther = async () => {
  try {
    // const formData = await getVendorFormData(); //api

    const gstTreatmentList = [
      {
        name: "aaaa",
      },
      { name: "bbb" },
    ];

    let gstTreatment = document.getElementById("gst-treatment");
    const gstTreatmentWrapper = document.getElementsByClassName(
      "gst-treatment-wrapper"
    )[0];
    gstTreatmentList.map((item) => {
      const div = document.createElement("div");
      div.classList.add("vendor-type-dropdown-option");

      const input = document.createElement("input");
      input.type = "radio";
      input.id = item.name;
      input.name = "gstTreatment";
      input.value = item.name;
      input.classList.add("cursor-pointer");
      input.classList.add("gst-treatment-item");

      const label = document.createElement("span");
      label.setAttribute("for", item.name);
      label.innerHTML = item.name;
      label.classList.add("cursor-pointer");

      div.appendChild(input);
      div.appendChild(label);

      gstTreatmentWrapper.appendChild(div);
    });
    togglePopup(gstTreatment, gstTreatmentWrapper);

    const sourceOfsupplyList = [
      {
        name: "[DEL] - Delhi",
      },
      {
        name: "[HR] - Haryana",
      },
    ];
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

      const label = document.createElement("span");
      label.setAttribute("for", item.name);
      label.innerHTML = item.name;
      label.classList.add("cursor-pointer");

      div.appendChild(input);
      div.appendChild(label);

      sourceOfsupplyWrapper.appendChild(div);
    });
    togglePopup(sourceOfsupply, sourceOfsupplyWrapper);

    const currencyList = [
      {
        name: "INR",
      },
      {
        name: "US",
      },
    ];
    let currency = document.getElementById("currency");
    const currencyWrapper =
      document.getElementsByClassName("currency-wrapper")[0];
    currencyList.map((item) => {
      const div = document.createElement("div");
      div.classList.add("vendor-type-dropdown-option");

      const input = document.createElement("input");
      input.type = "radio";
      input.id = item.name;
      input.name = "vendorType";
      input.value = item.name;
      input.classList.add("cursor-pointer");
      input.classList.add("currency-item");

      const label = document.createElement("span");
      label.setAttribute("for", item.name);
      label.innerHTML = item.name;
      label.classList.add("cursor-pointer");

      div.appendChild(input);
      div.appendChild(label);

      currencyWrapper.appendChild(div);
    });
    togglePopup(currency, currencyWrapper);

    const paymentTermsList = [
      {
        name: "online",
      },
      {
        name: "cash",
      },
    ];
    let paymentTerms = document.getElementById("payment-terms");
    const paymentTermsWrapper = document.getElementsByClassName(
      "payment-terms-wrapper"
    )[0];
    paymentTermsList.map((item) => {
      const div = document.createElement("div");
      div.classList.add("vendor-type-dropdown-option");

      const input = document.createElement("input");
      input.type = "radio";
      input.id = item.name;
      input.name = "vendorType";
      input.value = item.name;
      input.classList.add("cursor-pointer");
      input.classList.add("payment-terms-item");

      const label = document.createElement("span");
      label.setAttribute("for", item.name);
      label.innerHTML = item.name;
      label.classList.add("cursor-pointer");

      div.appendChild(input);
      div.appendChild(label);

      paymentTermsWrapper.appendChild(div);
    });
    togglePopup(paymentTerms, paymentTermsWrapper);

    const tdsList = [
      {
        name: "tds 1",
      },
      { name: "tds 2" },
    ];
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

      const label = document.createElement("span");
      label.setAttribute("for", item.name);
      label.innerHTML = item.name;
      label.classList.add("cursor-pointer");

      div.appendChild(input);
      div.appendChild(label);

      tdsWrapper.appendChild(div);
    });
    togglePopup(tds, tdsWrapper);
  } catch (error) {
    console.log(error);
  }

  handleDataChange();
};

let gstTreatment_ = "";
let gstIn_ = "";
let sos_ = "";
let pan_ = "";
let currency_ = "";
let paymentTerms_ = "";
let tds_ = "";
let document_ = "";

let gstTreatment = document.getElementById("gst-treatment");
let gstTreatmentItem = document.getElementsByClassName("gst-treatment-item");

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

const handleDataChange = () => {
  console.log("->", gstTreatment_);
  gstTreatment = document.getElementById("gst-treatment");
  gstTreatment.value = gstTreatment_;
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

  const gstTreatmentArr = [...gstTreatmentItem];
  gstTreatmentArr.map((item) => {
    item.addEventListener("change", (e) => {
      // removeBorder(allVendorTypes);
      // document.getElementById("vendorType-error").classList.add("hidden");
      if (item.checked) {
        gstTreatment_ = e.target.value;
      }

      if (gstTreatment_ == "") {
        gstTreatment.value = "Select GST Treatment";
      } else {
        gstTreatment.value = gstTreatment_;
      }

      const gstTreatmentId = document.getElementsByClassName(
        "gst-treatment-wrapper"
      )[0];
      gstTreatmentId.classList.add("hidden");

      console.log("gst treatment", gstTreatment_);
    });
  });

  const sosItemArr = [...sosItem];
  sosItemArr.map((item) => {
    item.addEventListener("change", (e) => {
      // removeBorder(allVendorTypes);
      // document.getElementById("vendorType-error").classList.add("hidden");
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
  });

  pan.addEventListener("input", (e) => {
    pan_ = e.target.value;
  });

  const currencyArr = [...currencyItem];
  currencyArr.map((item) => {
    item.addEventListener("change", (e) => {
      // removeBorder(allVendorTypes);
      // document.getElementById("vendorType-error").classList.add("hidden");
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
      // removeBorder(allVendorTypes);
      // document.getElementById("vendorType-error").classList.add("hidden");
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
      // removeBorder(allVendorTypes);
      // document.getElementById("vendorType-error").classList.add("hidden");
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
