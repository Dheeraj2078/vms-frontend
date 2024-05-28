import {
  getVendorAddress,
  postPurchaseOrder,
  sendPurchaseOrderMail,
} from "../../../../service/purchaseOrder";
import goToPurchaseOrder from "../purchaseOrder";
import {
  createWord,
  handleMailOrDraftPo,
  handlePostPurchaseOrder,
  handlePreviewDataFill,
  sendMail,
  showPdfPreview,
} from "./saveAndSend";
import saveAndSendHtml from "./saveAndSend.html";

let deliveryAddressItemSelected = {};
function getDeliveryItem(addresses) {
  const div = document.createElement("div");
  const h4 = document.createElement("h4");
  if (addresses.addressType == "Shipping") {
    h4.innerHTML = "Shipping address";
  } else {
    h4.innerHTML = "Billing address";
  }
  div.appendChild(h4);

  let p = document.createElement("p");
  p.innerHTML = addresses.addressLine1;
  div.appendChild(p);

  p = document.createElement("p");
  p.innerHTML = addresses.addressLine2;
  div.appendChild(p);

  p = document.createElement("p");
  p.innerHTML = addresses.state + ", " + addresses.pinCode;
  div.appendChild(p);

  p = document.createElement("p");
  p.innerHTML = addresses.country;
  div.appendChild(p);

  p = document.createElement("p");
  p.innerHTML = `Phone : ${addresses.phone}`;
  div.appendChild(p);

  // deliveryAddressDiv = div;
  deliveryAddressItemSelected[addresses.id] = addresses;
  return div;
}

const togglePopup = (div, div2) => {
  div.addEventListener("click", (e) => {
    if (div2.classList.contains("hidden")) {
      div2.classList.remove("hidden");
    } else {
      div2.classList.add("hidden");
    }
  });
};

const mapVendorNameToVendorId = {};
const mapStateToStateId = {};
const mapAddressToVendorId = {};
let ID;
let vendorAddressDiv = null;
let branchDiv = null;
let deliveryAdressDiv = null;
export const handleMultipleDropdownForPurchaseOrder = (formData) => {
  ID = formData.id;
  // vendor name
  const vendorNameList = formData.vendor;

  let vendorName = document.getElementById("vendor-name");
  const vendorNameWrapper = document.getElementsByClassName(
    "vendor-name-wrapper"
  )[0];
  vendorNameList.map((item) => {
    const div = document.createElement("div");
    div.classList.add("vendor-type-dropdown-option");

    const input = document.createElement("input");
    input.type = "radio";
    input.id = item.companyName;
    input.name = "vendorType";
    input.value = item.companyName;
    input.classList.add("cursor-pointer");
    input.classList.add("vendor-name-item");

    const label = document.createElement("span");
    label.setAttribute("for", item.companyName);
    label.innerHTML = item.companyName;
    label.classList.add("cursor-pointer");

    div.appendChild(input);
    div.appendChild(label);

    vendorNameWrapper.appendChild(div);

    mapVendorNameToVendorId[item.companyName] = item.id;
  });
  togglePopup(vendorName, vendorNameWrapper);

  const sourceOfsupplyList = formData.states;

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

    mapStateToStateId[item.name] = item.id;
  });
  togglePopup(sourceOfsupply, sourceOfsupplyWrapper);

  const destinationOfsupplyList = formData.states;

  let destinationOfsupply = document.getElementById("destination-of-supply");
  const destinationOfsupplyWrapper = document.getElementsByClassName(
    "destination-of-supply-wrapper"
  )[0];
  destinationOfsupplyList.map((item) => {
    const div = document.createElement("div");
    div.classList.add("vendor-type-dropdown-option");

    const input = document.createElement("input");
    input.type = "radio";
    input.id = item.name;
    input.name = "vendorType";
    input.value = item.name;
    input.classList.add("cursor-pointer");
    input.classList.add("dos-item");

    const label = document.createElement("span");
    label.setAttribute("for", item.name);
    label.innerHTML = item.name;
    label.classList.add("cursor-pointer");

    div.appendChild(input);
    div.appendChild(label);

    destinationOfsupplyWrapper.appendChild(div);
  });
  togglePopup(destinationOfsupply, destinationOfsupplyWrapper);

  const branchList = [
    {
      name: "Mohali",
      id: 87,
    },
    {
      name: "Faridabad",
      id: 88,
    },
  ];

  let branch = document.getElementById("branch");
  const branchWrapper = document.getElementsByClassName("branch-wrapper")[0];
  branchList.map((item) => {
    const div = document.createElement("div");
    div.classList.add("vendor-type-dropdown-option");

    const input = document.createElement("input");
    input.type = "radio";
    input.id = item.name;
    input.name = "vendorType";
    input.value = item.id;
    input.classList.add("cursor-pointer");
    input.classList.add("branch-item");

    const label = document.createElement("span");
    label.setAttribute("for", item.name);
    label.innerHTML = item.name;
    label.classList.add("cursor-pointer");

    div.appendChild(input);
    div.appendChild(label);

    branchWrapper.appendChild(div);
  });
  togglePopup(branch, branchWrapper);

  const deliveryAddressList = formData.addresses;
  const deliveryAddress = document.getElementById("delivery-address");
  const deliveryAddressWrapper = document.getElementsByClassName(
    "delivery-address-wrapper"
  )[0];
  deliveryAddressList.map((item) => {
    const div = document.createElement("div");
    div.classList.add("vendor-type-dropdown-option");

    const input = document.createElement("input");
    input.type = "radio";
    input.id = item.addressLine1;
    input.name = "vendorType";
    input.value = item.id;
    input.classList.add("cursor-pointer");
    input.classList.add("delivery-address-item");

    const label = document.createElement("span");
    label.setAttribute("for", item.addressLine1);
    const sItem = getDeliveryItem(item);
    label.appendChild(sItem);
    label.classList.add("cursor-pointer");

    div.appendChild(input);
    div.appendChild(label);

    deliveryAddressWrapper.appendChild(div);

    mapAddressToVendorId[item.id] = item.vendorId;
  });
  togglePopup(deliveryAddress, deliveryAddressWrapper);

  let purchaseNumber = document.getElementById("purchase-number");
  purchaseNumber.value = formData.identifier;

  const paymentTermsList = formData.paymentTerms;
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

    const label = document.createElement("span");
    label.setAttribute("for", item);
    label.innerHTML = decodePaymentTerms(item, "_", " ");
    label.classList.add("cursor-pointer");

    div.appendChild(input);
    div.appendChild(label);

    paymentTermsWrapper.appendChild(div);
  });
  togglePopup(paymentTerms, paymentTermsWrapper);

  handleDataChange();
};

let vendorName_ = "";
let sos_ = "";
let dos_ = "";
let branch_ = "";
let deliveryAddress_ = "";
let vendorDeliveryId = 0;
let poId_ = "";
let reference_ = "";
let date_ = "";
let dateDelivery_ = "";
let paymentTerms_ = "";

let paymentTerms = document.getElementById("payment-terms");
let paymentTermsItem = document.getElementsByClassName("payment-terms-item");

let vendorName = document.getElementById("vendor-name");
let vendorNameItem = document.getElementsByClassName("vendor-name-item");

let deliveryAddress = document.getElementById("delivery-address");
let deliveryAddressItem = document.getElementsByClassName(
  "delivery-address-item"
);

let sos = document.getElementById("source-of-supply");
let sosItem = document.getElementsByClassName("sos-item");

let dos = document.getElementById("destination-of-supply");
let dosItem = document.getElementsByClassName("dos-item");

let branch = document.getElementById("branch");
let branchItem = document.getElementsByClassName("branch-item");

let reference = document.getElementById("reference-number");
// let purchaseNumber = document.getElementById("purchase-number");
let date = document.getElementById("date");
let dateDelivery = document.getElementById("date-delivery");

const handleDataChange = () => {
  paymentTerms = document.getElementById("payment-terms");
  paymentTerms.value = paymentTerms_;

  vendorName = document.getElementById("vendor-name");
  vendorName.value = vendorName_;

  sos = document.getElementById("source-of-supply");
  sos.value = sos_;

  dos = document.getElementById("destination-of-supply");
  dos.value = dos_;

  branch = document.getElementById("branch");

  reference = document.getElementById("reference-number");
  reference.value = reference_;

  deliveryAddress = document.getElementById("delivery-address");

  date = document.getElementById("date");
  dateDelivery = document.getElementById("date-delivery");

  const vendorNameArr = [...vendorNameItem];
  vendorNameArr.map((item) => {
    item.addEventListener("change", async (e) => {
      removeBorder(vendorName);
      document.getElementById("vendor-name-error").classList.add("hidden");
      if (item.checked) {
        vendorName_ = e.target.value;
      }

      if (vendorName_ == "") {
        vendorName.value = "";
      } else {
        vendorName.value = vendorName_;

        const paymentTermsWrapper = document.getElementsByClassName(
          "vendor-name-wrapper"
        )[0];
        paymentTermsWrapper.classList.add("hidden");

        try {
          const vendorId = mapVendorNameToVendorId[vendorName_];
          console.log("IDDD", vendorId);
          const response = await getVendorAddress(vendorId);
          console.log("--", response);
          const addresses = response.data;

          const autofillVendorAddress = document.getElementById(
            "autofill-vendor-address"
          );
          autofillVendorAddress.classList.remove("display-block");
          autofillVendorAddress.classList.add("autofill-vendor");

          const billingAddressDiv = document.createElement("div");
          const shippingAddressDiv = document.createElement("div");
          addresses.map((addresses) => {
            const div = document.createElement("div");
            const h4 = document.createElement("h4");
            if (addresses.addressType == "Shipping") {
              h4.innerHTML = "Shipping address";
            } else {
              h4.innerHTML = "Billing address";
            }
            div.appendChild(h4);

            let p = document.createElement("p");
            p.innerHTML = addresses.addressLine1;
            div.appendChild(p);

            p = document.createElement("p");
            p.innerHTML = addresses.addressLine2;
            div.appendChild(p);

            p = document.createElement("p");
            p.innerHTML = addresses.state + ", " + addresses.pinCode;
            div.appendChild(p);

            p = document.createElement("p");
            p.innerHTML = addresses.country;
            div.appendChild(p);

            p = document.createElement("p");
            p.innerHTML = `Phone : ${addresses.phone}`;
            div.appendChild(p);

            autofillVendorAddress.innerHTML = "";
            addresses.addressType == "Shipping"
              ? shippingAddressDiv.appendChild(div)
              : billingAddressDiv.appendChild(div);

            vendorAddressDiv = div;
          });

          autofillVendorAddress.appendChild(billingAddressDiv);
          autofillVendorAddress.appendChild(shippingAddressDiv);
        } catch (error) {
          console.log(error);
        }
      }
    });
  });

  const sosArr = [...sosItem];
  sosArr.map((item) => {
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
    });
  });

  const dosArr = [...dosItem];
  dosArr.map((item) => {
    item.addEventListener("change", (e) => {
      removeBorder(dos);
      document.getElementById("dos-error").classList.add("hidden");
      if (item.checked) {
        dos_ = e.target.value;
      }

      if (dos_ == "") {
        dos.value = "";
      } else {
        dos.value = dos_;
      }

      const dosWrapper = document.getElementsByClassName(
        "destination-of-supply-wrapper"
      )[0];
      dosWrapper.classList.add("hidden");

      console.log("gst treatment", dos_);
    });
  });

  const bracnhArr = [...branchItem];
  bracnhArr.map((item) => {
    item.addEventListener("change", (e) => {
      removeBorder(branch);
      document.getElementById("branch-error").classList.add("hidden");
      if (item.checked) {
        branch_ = e.target.value;
        branch.value = e.target.id;
      }

      const branchWrapper =
        document.getElementsByClassName("branch-wrapper")[0];
      branchWrapper.classList.add("hidden");

      let currentItem = deliveryAddressItemSelected[branch_];
      const div = getDeliveryItem(currentItem);

      branchDiv = div;

      console.log("branch", branch_);
    });
  });

  const deliveryAddressArr = [...deliveryAddressItem];
  deliveryAddressArr.map((item) => {
    item.addEventListener("change", (e) => {
      removeBorder(deliveryAddress);
      document.getElementById("delivery-address-error").classList.add("hidden");
      if (item.checked) {
        deliveryAddress_ = e.target.value;
        deliveryAddress.value = e.target.id;

        const autofillDeliveryAddress = document.getElementById(
          "autofill-delivery-address"
        );
        autofillDeliveryAddress.classList.remove("display-block");
        autofillDeliveryAddress.classList.add("autofill-vendor");

        let currentItem = deliveryAddressItemSelected[deliveryAddress_];
        const div = getDeliveryItem(currentItem);
        autofillDeliveryAddress.innerHTML = "";
        autofillDeliveryAddress.appendChild(div);

        deliveryAdressDiv = div;
      }

      const branchWrapper = document.getElementsByClassName(
        "delivery-address-wrapper"
      )[0];
      branchWrapper.classList.add("hidden");

      console.log("deliveryAddress_", deliveryAddress_);
    });
  });

  // purchaseNumber.addEventListener("input", (e) => {
  //   poId_ = e.target.value;
  // });

  poId_ = document.getElementById("purchase-number").value;

  reference.addEventListener("input", (e) => {
    reference_ = e.target.value;
  });

  date.addEventListener("input", (e) => {
    // removeBorder(date);
    // document.getElementById("startDate-error").classList.add("hidden");
    date_ = e.target.value;
  });

  dateDelivery.addEventListener("input", (e) => {
    dateDelivery_ = e.target.value;
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

  nextActionBtns();
};

const nextActionBtns = () => {
  const formCancel = document.getElementsByClassName("form-cancel")[0];
  const saveAndSend = document.getElementById("save-and-send");

  const homeRoot = document.querySelector("main");
  console.log(homeRoot);
  formCancel.addEventListener("click", () => {
    goToPurchaseOrder();
  });
  saveAndSend.addEventListener("click", () => {
    if (!checkFieldValuesForPo()) {
      return;
    }

    homeRoot.innerHTML = saveAndSendHtml;

    const poIdentifier = document.getElementsByClassName("po-identifier");
    const poIdentifierArr = [...poIdentifier];
    poIdentifierArr.map((po) => {
      po.innerHTML = poId_;
    });

    const subject = document.getElementsByClassName("email-subject")[0];
    subject.value = `Purchase Order from EX Squared India Pvt Ltd (Purchase Order #${poId_})`;
    console.log("subject 1", subject.value);

    const poDate = document.getElementsByClassName("po-date")[0];
    poDate.innerHTML = date_;

    createWord();
    showPdfPreview();

    const itemArr = [];
    let tableData = JSON.parse(localStorage.getItem("poTableData")) || [];
    tableData.map((item) => {
      const obj = {
        ItemId: item[5],
        Account: item[1],
        Rate: item[3],
        Quantity: item[2],
        Tax: item[4],
        Amount: item[2] * item[3],
      };

      itemArr.push(obj);
    });

    const data = {
      id: ID,
      identifier: poId_,
      creatorId: Number(branch_),
      vendorId: mapVendorNameToVendorId[vendorName_],
      customerId: Number(deliveryAddress_),
      sourceStateId: mapStateToStateId[sos_],
      destinationStateId: mapStateToStateId[dos_],
      reference: reference_,
      // date: date_,
      // deliveryDate: dateDelivery_,
      paymentTerms: decodePaymentTerms(paymentTerms_, " ", "_"),
      amount: 0,
      purchaseStatus: "Draft",
      Items: itemArr,
    };

    if (date_ != "") {
      data.date = date_;
    }

    if (dateDelivery_ != "") {
      data.deliveryDate = dateDelivery_;
    }

    console.log("post data", data);

    // handlePreviewDataFill(vendorAddressDiv, deliveryAdressDiv, branchDiv);

    const itemArr2 = [];
    let subTotal = 0;
    tableData = JSON.parse(localStorage.getItem("poTableData")) || [];
    tableData.map((item) => {
      const obj = {
        itemAndDescription: item[0],
        quantity: item[2],
        rate: item[3],
        amount: item[2] * item[3],
      };

      subTotal += item[2] * item[3];
      itemArr2.push(obj);
    });

    const subTotal_ = subTotal;

    const poPrice = document.getElementsByClassName("po-price")[0];
    poPrice.innerHTML = subTotal;

    const postMailData = {
      delivaryTo: mapAddressToVendorId[deliveryAddress_],
      delivaryFrom: mapVendorNameToVendorId[vendorName_],
      emailBody: "string", // 1
      emailSubject: "string", // 2
      pdfGenerationDto: {
        creatorId: Number(branch_),
        delivaryTo: mapAddressToVendorId[deliveryAddress_],
        delivaryFrom: mapVendorNameToVendorId[vendorName_],
        date: date_,
        purchaseOrderId: poId_,
        rows: itemArr2,
        subTotal: subTotal_,
        gst: 0,
      },
    };

    handleMailOrDraftPo(data, postMailData);
  });
};

export const checkFieldValuesForPo = () => {
  let checkResult = true;

  console.log("vendorName_", vendorName_);
  console.log("vendorName", vendorName);
  if (isNullOrEmpty(vendorName_)) {
    const error_element = document.getElementById("vendor-name-error");
    console.log(error_element);
    showErrorMessage(error_element, "Please select vendor");
    vendorName.classList.add("empty-field-border");
    checkResult = false;
  }
  if (isNullOrEmpty(sos_)) {
    const error_element = document.getElementById("sos-error");
    console.log(error_element);
    showErrorMessage(error_element, "Please select source of supply");
    sos.classList.add("empty-field-border");
    checkResult = false;
  }
  if (isNullOrEmpty(dos_)) {
    const error_element = document.getElementById("dos-error");
    console.log(error_element);
    showErrorMessage(error_element, "Please select destination of supply");
    dos.classList.add("empty-field-border");
    checkResult = false;
  }

  if (isNullOrEmpty(branch_)) {
    const error_element = document.getElementById("branch-error");
    console.log(error_element);
    showErrorMessage(error_element, "Please enter the address");
    branch.classList.add("empty-field-border");
    checkResult = false;
  }

  if (isNullOrEmpty(deliveryAddress_)) {
    const error_element = document.getElementById("delivery-address-error");
    console.log(error_element);
    showErrorMessage(error_element, "Please select the delivery address");
    deliveryAddress.classList.add("empty-field-border");
    checkResult = false;
  }
  if (isNullOrEmpty(paymentTerms_)) {
    const error_element = document.getElementById("payment-terms-error");
    console.log(error_element);
    showErrorMessage(error_element, "Please select payment terms");
    paymentTerms.classList.add("empty-field-border");
    checkResult = false;
  }

  return checkResult;
};

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

const decodePaymentTerms = (str, delimiter1, delimiter2) => {
  const arr = str.split(delimiter1);
  const res = arr.join(delimiter2);
  return res;
};
