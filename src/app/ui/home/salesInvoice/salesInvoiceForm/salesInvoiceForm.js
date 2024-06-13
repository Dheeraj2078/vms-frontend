import {
  getVendorAddress,
  postPurchaseOrder,
  sendPurchaseOrderMail,
} from "../../../../service/purchaseOrder";
import { localStorageKeys } from "../../../../util/constants";
import goToSalesInvoice from "../salesInvoice";
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

const mapVendorNameToVendorDetails = {};
const mapStateToStateId = {};
const mapAddressToVendorId = {};
const mapBranchNameToBranchId = {};
let ID;
let vendorAddressDiv = null;
let branchDiv = null;
let deliveryAdressDiv = null;
export const handleMultipleDropdownForSalesInvoice = (formData) => {
  ID = formData.id;
  // vendor name
  const vendorNameList = formData.vendors;

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

    const label = document.createElement("label");
    label.setAttribute("for", item.companyName);
    label.innerHTML = item.companyName;
    label.classList.add("cursor-pointer");
    div.appendChild(input);
    div.appendChild(label);

    vendorNameWrapper.appendChild(div);

    mapVendorNameToVendorDetails[item.companyName] = {
      id: item.id,
      email: item.email,
    };
  });
  togglePopup(vendorName, vendorNameWrapper);

  // destination of supply
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
    input.id = "dos" + item.name;
    input.name = "vendorType";
    input.value = item.name;
    input.classList.add("cursor-pointer");
    input.classList.add("dos-item");

    const label = document.createElement("label");
    label.setAttribute("for", "dos" + item.name);
    label.innerHTML = item.name;
    label.classList.add("cursor-pointer");

    div.appendChild(input);
    div.appendChild(label);

    destinationOfsupplyWrapper.appendChild(div);

    mapStateToStateId[item.name] = item.id;
  });
  togglePopup(destinationOfsupply, destinationOfsupplyWrapper);

  // branch
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
    input.value = item.name;
    input.classList.add("cursor-pointer");
    input.classList.add("branch-item");

    const label = document.createElement("label");
    label.setAttribute("for", item.name);
    label.innerHTML = item.name;
    label.classList.add("cursor-pointer");

    div.appendChild(input);
    div.appendChild(label);

    branchWrapper.appendChild(div);

    mapBranchNameToBranchId[item.name] = item.id;
  });
  togglePopup(branch, branchWrapper);

  let purchaseNumber = document.getElementById("purchase-number");
  purchaseNumber.value = formData.identifier;

  // payment terms
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

    const label = document.createElement("label");
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
let amountPaid_ = "0";

let paymentTerms = document.getElementById("payment-terms");
let paymentTermsItem = document.getElementsByClassName("payment-terms-item");

let vendorName = document.getElementById("vendor-name");
let vendorNameItem = document.getElementsByClassName("vendor-name-item");

// let deliveryAddress = document.getElementById("delivery-address");
// let deliveryAddressItem = document.getElementsByClassName(
//   "delivery-address-item"
// );

// let sos = document.getElementById("source-of-supply");
// let sosItem = document.getElementsByClassName("sos-item");

let dos = document.getElementById("destination-of-supply");
let dosItem = document.getElementsByClassName("dos-item");

let branch = document.getElementById("branch");
let branchItem = document.getElementsByClassName("branch-item");

let reference = document.getElementById("reference-number");
let date = document.getElementById("date");
let dateDelivery = document.getElementById("date-delivery");
let amountPaid = document.getElementById("payment-made-input");

const handleDataChange = () => {
  paymentTerms = document.getElementById("payment-terms");
  paymentTerms.value = paymentTerms_;
  const paymentTermsRadio = document.querySelector(
    `input[name="vendorType"][value="${paymentTerms_}"]`
  );
  console.log("paymentTermsRadio", paymentTermsRadio);
  if (paymentTermsRadio) paymentTermsRadio.checked = true;

  vendorName = document.getElementById("vendor-name");
  vendorName.value = vendorName_;
  const vendorNameRadio = document.querySelector(
    `input[name="vendorType"][value="${vendorName_}"]`
  );
  if (vendorNameRadio) vendorNameRadio.checked = true;

  dos = document.getElementById("destination-of-supply");
  dos.value = dos_;
  const dosRadio = document.querySelector(
    `input[name="vendorType"][value="${dos_}"]`
  );
  if (dosRadio) dosRadio.checked = true;

  branch = document.getElementById("branch");
  branch.value = branch_;
  const branchRadio = document.querySelector(
    `input[name="vendorType"][value="${branch_}"]`
  );
  if (branchRadio) branchRadio.checked = true;

  reference = document.getElementById("reference-number");
  reference.value = reference_;

  date = document.getElementById("date");
  date.value = date_;
  dateDelivery = document.getElementById("date-delivery");
  dateDelivery.value = dateDelivery_;

  amountPaid = document.getElementById("payment-made-input");
  amountPaid.value = amountPaid_;

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

        autoFillVendorDetails();
      }
    });

    if (item.checked) {
      autoFillVendorDetails();
    }
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
    });
  });

  const bracnhArr = [...branchItem];
  bracnhArr.map((item) => {
    item.addEventListener("change", (e) => {
      removeBorder(branch);
      document.getElementById("branch-error").classList.add("hidden");
      if (item.checked) {
        branch_ = e.target.value;
        branch.value = e.target.value;
      }

      const branchWrapper =
        document.getElementsByClassName("branch-wrapper")[0];
      branchWrapper.classList.add("hidden");

      let currentItem = deliveryAddressItemSelected[branch_];
      const div = getDeliveryItem(currentItem);

      branchDiv = div;
    });
  });

  poId_ = document.getElementById("purchase-number").value;

  reference.addEventListener("input", (e) => {
    reference_ = e.target.value;
  });

  date.addEventListener("input", (e) => {
    removeBorder(date);
    document.getElementById("date-error").classList.add("hidden");
    date_ = e.target.value;
  });

  dateDelivery.addEventListener("input", (e) => {
    dateDelivery_ = e.target.value;
  });

  amountPaid.addEventListener("input", (e) => {
    amountPaid_ = e.target.value;
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
    });
  });

  nextActionBtns();
};

const autoFillVendorDetails = async () => {
  try {
    const vendorId = mapVendorNameToVendorDetails[vendorName_].id;
    const response = await getVendorAddress(vendorId);
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
      console.log("vendorAddressDiv", vendorAddressDiv);
    });

    autofillVendorAddress.appendChild(billingAddressDiv);
    autofillVendorAddress.appendChild(shippingAddressDiv);
  } catch (error) {
    console.log(error);
  }
};

const nextActionBtns = () => {
  const formCancel = document.getElementsByClassName("form-cancel")[0];
  const saveAndSend = document.getElementById("save-and-send");

  const homeRoot = document.querySelector("main");
  formCancel.addEventListener("click", () => {
    clearInvoiceFormData();
    goToSalesInvoice();
  });
  saveAndSend.addEventListener("click", () => {
    if (!checkFieldValuesForPo()) {
      return;
    }

    let discount = document.getElementById("percentage-input").value;
    homeRoot.innerHTML = saveAndSendHtml;

    const poIdentifier = document.getElementsByClassName("po-identifier");
    const poIdentifierArr = [...poIdentifier];
    poIdentifierArr.map((po) => {
      po.innerHTML = poId_;
    });

    const subject = document.getElementsByClassName("email-subject")[0];
    subject.value = `Sales Invoice from EX Squared India Pvt Ltd (Sales Invoice #${poId_})`;

    const poDate = document.getElementsByClassName("po-date")[0];
    poDate.innerHTML = date_;

    let totalAmt = 0;
    const itemArr = [];
    let tableData =
      JSON.parse(localStorage.getItem(localStorageKeys.invoiceTableData)) || [];
    tableData.map((item) => {
      const obj = {
        itemId: item[5],
        account: item[1],
        rate: item[3],
        quantity: item[2],
        tax: item[4],
        amount: item[2] * item[3],
        itemName: item[0],
        hsn: item[6],
      };

      totalAmt += item[2] * item[3];
      itemArr.push(obj);
    });

    console.log("amountPaid_", amountPaid_);
    const data = {
      id: ID,
      creatorId: mapBranchNameToBranchId[branch_],
      vendorId: mapVendorNameToVendorDetails[vendorName_].id,
      destinationId: mapStateToStateId[dos_],
      date: date_,
      reference: reference_,
      paymentTerms: decodePaymentTerms(paymentTerms_, " ", "_"),
      amount: totalAmt,
      status: "Draft",
      selectedItems: itemArr,
      amountPaid: Number(amountPaid_),
      subject: "string",
      body: "string",
    };

    if (dateDelivery_ != "") {
      data.dueDate = dateDelivery_;
    }

    console.log("post data", data);

    // handlePreviewDataFill(vendorAddressDiv, deliveryAdressDiv, branchDiv);
    // handlePreviewDataFill(vendorAddressDiv);

    const itemArr2 = [];
    let subTotal = 0;
    tableData =
      JSON.parse(localStorage.getItem(localStorageKeys.invoiceTableData)) || [];
    tableData.map((item) => {
      const obj = {
        itemName: item[0],
        hsn: item[6],
        quantity: item[2],
        rate: item[3],
        amount: item[2] * item[3],
        cgst: item[4],
        sgst: item[4],
      };

      subTotal += item[2] * item[3];
      itemArr2.push(obj);
    });

    const subTotal_ = subTotal;

    const poPrice = document.getElementsByClassName("po-price")[0];
    poPrice.innerHTML = subTotal;

    createWord(mapVendorNameToVendorDetails[vendorName_].email);

    discount = Number(discount);
    console.log("dis", discount);
    console.log("dist", typeof discount);

    const amountInfo = {
      subTotal: subTotal,
      discount: discount,
    };
    showPdfPreview(amountInfo, poId_, vendorAddressDiv);

    // handleMailOrDraftPo(data, postMailData);
    handleMailOrDraftPo(data);
  });
};

export const checkFieldValuesForPo = () => {
  let checkResult = true;

  if (isNullOrEmpty(vendorName_)) {
    const error_element = document.getElementById("vendor-name-error");
    console.log(error_element);
    showErrorMessage(error_element, "Please select vendor");
    vendorName.classList.add("empty-field-border");
    checkResult = false;
  }
  //   if (isNullOrEmpty(sos_)) {
  //     const error_element = document.getElementById("sos-error");
  //     console.log(error_element);
  //     showErrorMessage(error_element, "Please select source of supply");
  //     sos.classList.add("empty-field-border");
  //     checkResult = false;
  //   }
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

  //   if (isNullOrEmpty(deliveryAddress_)) {
  //     const error_element = document.getElementById("delivery-address-error");
  //     console.log(error_element);
  //     showErrorMessage(error_element, "Please select the delivery address");
  //     deliveryAddress.classList.add("empty-field-border");
  //     checkResult = false;
  //   }

  if (isNullOrEmpty(date_)) {
    const error_element = document.getElementById("date-error");
    console.log(error_element);
    showErrorMessage(error_element, "Please select the date");
    date.classList.add("empty-field-border");
    checkResult = false;
  }

  if (isNullOrEmpty(paymentTerms_)) {
    const error_element = document.getElementById("payment-terms-error");
    console.log(error_element);
    showErrorMessage(error_element, "Please select payment terms");
    paymentTerms.classList.add("empty-field-border");
    checkResult = false;
  }

  const textArea = document.querySelectorAll("textarea");
  console.log("textArea textArea", textArea);
  const textAreaArr = [...textArea];

  if (textAreaArr.length == 0) {
    console.log("empty text area");
    const poAddRow = document.getElementById("po-add-row");
    poAddRow.click();

    const saveAndSend = document.getElementById("save-and-send");
    saveAndSend.click();
  } else {
    textAreaArr.map((textarea) => {
      console.log(textarea + ", " + textarea.value);
      if (textarea.value == "") {
        textarea.classList.add("empty-field-border");
        checkResult = false;
      }
    });
  }

  return checkResult;
};

// utils
function removeBorder(column) {
  if (column.classList.contains("empty-field-border")) {
    column.classList.remove("empty-field-border");
  }
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

export function clearInvoiceFormData() {
  vendorName_ = "";
  sos_ = "";
  dos_ = "";
  branch_ = "";
  deliveryAddress_ = "";
  vendorDeliveryId = 0;
  poId_ = "";
  reference_ = "";
  date_ = "";
  dateDelivery_ = "";
  paymentTerms_ = "";
  amountPaid_ = "0";

  const invoiceTable = [];
  localStorage.setItem(
    localStorageKeys.invoiceTableData,
    JSON.stringify(invoiceTable)
  );
}
