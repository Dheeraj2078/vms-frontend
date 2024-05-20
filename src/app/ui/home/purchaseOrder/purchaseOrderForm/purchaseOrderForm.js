// import purchaseOrderFormPreviewHtml from "./purchaseOrderFormPreview.html";

// let itemName_ = "";
// let itemQty_ = "";
// let itemRate_ = "";
// let currentId = 1;
// let total = 0;
// const itemsData = {};

// const addNewRow = (id) => {
//   const row = document.createElement("tr");
//   let div = document.createElement("td");
//   div.innerHTML = id;
//   row.appendChild(div);

//   div = document.createElement("td");
//   const itemNameInput = document.createElement("input");
//   itemNameInput.addEventListener("change", (e) => {
//     itemName_ = e.target.value;
//   });
//   div.appendChild(itemNameInput);
//   row.appendChild(div);

//   div = document.createElement("td");
//   const itemNameQty = document.createElement("input");
//   itemNameQty.addEventListener("change", (e) => {
//     itemQty_ = e.target.value;
//   });
//   div.appendChild(itemNameQty);
//   row.appendChild(div);

//   div = document.createElement("td");
//   const itemNameRate = document.createElement("input");
//   itemNameRate.addEventListener("change", (e) => {
//     itemRate_ = e.target.value;
//   });
//   div.appendChild(itemNameRate);
//   row.appendChild(div);

//   div = document.createElement("td");
//   div.id = id + "-po-amount";
//   row.appendChild(div);

//   itemNameRate.addEventListener("change", () => {
//     if (itemQty_ != "") {
//       const amountId = document.getElementById(id + "-po-amount");
//       console.log(itemQty_ + " * " + itemRate_);
//       amountId.innerHTML = itemQty_ * itemRate_;

//       itemsData[id] = {
//         id: id,
//         name: itemName_,
//         qty: itemQty_,
//         rate: itemRate_,
//       };

//       console.log(itemsData);
//       total = 0;
//       for (const item in itemsData) {
//         console.log("item", itemsData[item].rate);
//         total += itemsData[item].rate * itemsData[item].qty;
//       }
//       const subTotal = document.getElementById("sub-total");
//       subTotal.innerHTML = total;
//     }
//   });
//   itemNameQty.addEventListener("change", () => {
//     if (itemRate_ != "") {
//       const amountId = document.getElementById(id + "-po-amount");
//       console.log(itemQty_ + " * " + itemRate_);
//       amountId.innerHTML = itemQty_ * itemRate_;

//       itemsData[id] = {
//         id: id,
//         name: itemName_,
//         qty: itemQty_,
//         rate: itemRate_,
//       };
//       total = 0;
//       for (const item in itemsData) {
//         total += itemsData[item].rate * itemsData[item].qty;
//       }

//       const subTotal = document.getElementById("sub-total");
//       subTotal.innerHTML = total;
//     }
//   });

//   return row;
// };

// export const createItemsTable = () => {
//   const table = document.querySelector("table");
//   console.log("table", table);
//   const row = addNewRow(currentId++);
//   table.appendChild(row);

//   const addItemsRow = document.getElementsByClassName("add-items-row")[0];
//   addItemsRow.addEventListener("click", () => {
//     const row = addNewRow(currentId++);
//     table.appendChild(row);
//   });

//   const previewBtn = document.getElementById("preview-btn");
//   previewBtn.addEventListener("click", showPreview);
// };

// export const showPreview = () => {
//   console.log("showing preview");
//   const formOutput = document.getElementById("form-output");
//   formOutput.innerHTML = purchaseOrderFormPreviewHtml;

//   const table = document.querySelector("table");

//   for (const item in itemsData) {
//     // console.log("item", itemsData[item].rate);
//     // total += itemsData[item].rate * itemsData[item].qty;
//     const row = document.createElement("tr");

//     let td = document.createElement("td");
//     td.innerHTML = itemsData[item].id;
//     row.appendChild(td);

//     td = document.createElement("td");
//     td.innerHTML = itemsData[item].name;
//     row.appendChild(td);

//     td = document.createElement("td");
//     td.innerHTML = itemsData[item].qty;
//     row.appendChild(td);

//     td = document.createElement("td");
//     td.innerHTML = itemsData[item].rate;
//     row.appendChild(td);

//     td = document.createElement("td");
//     td.innerHTML = itemsData[item].rate * itemsData[item].qty;
//     row.appendChild(td);

//     table.appendChild(row);

//     const subTotal = document.getElementById("sub-total");
//     subTotal.innerHTML = total;

//     const gst = document.getElementById("gst");
//     gst.innerHTML = 0.18 * total;

//     const totalAmt = document.getElementById("total");
//     totalAmt.innerHTML = total + 0.18 * total;
//   }
// };

// export const handleAddRurchaseOrder = () => {};
// export const handleCross = () => {};

import { createWord } from "./saveAndSend";
import saveAndSendHtml from "./saveAndSend.html";

const togglePopup = (div, div2) => {
  div.addEventListener("click", (e) => {
    if (div2.classList.contains("hidden")) {
      div2.classList.remove("hidden");
    } else {
      div2.classList.add("hidden");
    }
  });
};

export const handleMultipleDropdownForPurchaseOrder = () => {
  // vendor name
  const vendorNameList = [
    {
      name: "Kiwao automationm 1",
      city: "city",
      state: "state",
      pincode: "pincode",
      phone: "",
    },
    {
      name: "Kiwao automationm 2",
    },
  ];

  let vendorName = document.getElementById("vendor-name");
  const vendorNameWrapper = document.getElementsByClassName(
    "vendor-name-wrapper"
  )[0];
  vendorNameList.map((item) => {
    const div = document.createElement("div");
    div.classList.add("vendor-type-dropdown-option");

    const input = document.createElement("input");
    input.type = "radio";
    input.id = item.name;
    input.name = "vendorType";
    input.value = item.name;
    input.classList.add("cursor-pointer");
    input.classList.add("vendor-name-item");

    const label = document.createElement("span");
    label.setAttribute("for", item.name);
    label.innerHTML = item.name;
    label.classList.add("cursor-pointer");

    div.appendChild(input);
    div.appendChild(label);

    vendorNameWrapper.appendChild(div);
  });
  togglePopup(vendorName, vendorNameWrapper);

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

  const destinationOfsupplyList = [
    {
      name: "[DEL] - Delhi",
    },
    {
      name: "[HR] - Haryana",
    },
  ];

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
    input.classList.add("sos-item");

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
    },
    {
      name: "Faridabad",
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

    const label = document.createElement("span");
    label.setAttribute("for", item.name);
    label.innerHTML = item.name;
    label.classList.add("cursor-pointer");

    div.appendChild(input);
    div.appendChild(label);

    branchWrapper.appendChild(div);
  });
  togglePopup(branch, branchWrapper);

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

  const shipmentPreferenceList = [
    {
      name: "online",
    },
    {
      name: "cash",
    },
  ];
  let shipmentPreference = document.getElementById("shipment-preference");
  const shipmentPreferenceWrapper = document.getElementsByClassName(
    "shipment-preference-wrapper"
  )[0];
  shipmentPreferenceList.map((item) => {
    const div = document.createElement("div");
    div.classList.add("vendor-type-dropdown-option");

    const input = document.createElement("input");
    input.type = "radio";
    input.id = item.name;
    input.name = "vendorType";
    input.value = item.name;
    input.classList.add("cursor-pointer");
    input.classList.add("shipment-preference-item");

    const label = document.createElement("span");
    label.setAttribute("for", item.name);
    label.innerHTML = item.name;
    label.classList.add("cursor-pointer");

    div.appendChild(input);
    div.appendChild(label);

    shipmentPreferenceWrapper.appendChild(div);
  });
  togglePopup(shipmentPreference, shipmentPreferenceWrapper);

  nextActionBtns();
};

const nextActionBtns = () => {
  const formCancel = document.getElementsByClassName("form-cancel")[0];
  const saveAndSend = document.getElementById("save-and-send");

  const homeRoot = document.querySelector("main");
  console.log(homeRoot);
  // homeRoot.innerHTML = pageHtml;
  formCancel.addEventListener("click", () => {
    // homeRoot.innerHTML = "";
  });
  saveAndSend.addEventListener("click", () => {
    homeRoot.innerHTML = saveAndSendHtml;
    createWord();
  });
};
