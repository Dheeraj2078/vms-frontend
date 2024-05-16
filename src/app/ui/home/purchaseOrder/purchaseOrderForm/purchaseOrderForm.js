import purchaseOrderFormPreviewHtml from "./purchaseOrderFormPreview.html";
import goToPurchaseOrder from "../purchaseOrder";
import { getPurchaseOrderFormData } from "../../../../service/purchaseOrder";

let itemName_ = "";
let itemQty_ = "";
let itemRate_ = "";
let currentId = 1;
let total = 0;
const itemsData = {};

export function handleCross() {
  const vendorFormOutput = document.getElementById("form-output");
  vendorFormOutput.classList.add("hidden");

  const mainContainer = document.getElementsByClassName("main-container")[0];
  mainContainer.classList.remove("blur-background");
  document.body.classList.remove("overflow-hidden");

  goToPurchaseOrder();
}

const addNewRow = (id) => {
  const row = document.createElement("tr");
  let div = document.createElement("td");
  div.innerHTML = id;
  row.appendChild(div);

  div = document.createElement("td");
  const itemNameInput = document.createElement("input");
  itemNameInput.classList.add("po-form-input");
  itemNameInput.addEventListener("change", (e) => {
    itemName_ = e.target.value;
  });
  div.appendChild(itemNameInput);
  row.appendChild(div);

  div = document.createElement("td");
  const itemNameQty = document.createElement("input");
  itemNameQty.classList.add("po-form-input");
  itemNameQty.addEventListener("change", (e) => {
    itemQty_ = e.target.value;
  });
  div.appendChild(itemNameQty);
  row.appendChild(div);

  div = document.createElement("td");
  const itemNameRate = document.createElement("input");
  itemNameRate.classList.add("po-form-input");
  itemNameRate.addEventListener("change", (e) => {
    itemRate_ = e.target.value;
  });
  div.appendChild(itemNameRate);
  row.appendChild(div);

  div = document.createElement("td");
  div.id = id + "-po-amount";
  row.appendChild(div);

  itemNameRate.addEventListener("change", () => {
    if (itemQty_ != "") {
      const amountId = document.getElementById(id + "-po-amount");
      console.log(itemQty_ + " * " + itemRate_);
      amountId.innerHTML = itemQty_ * itemRate_;

      itemsData[id] = {
        id: id,
        name: itemName_,
        qty: itemQty_,
        rate: itemRate_,
      };

      console.log(itemsData);
      total = 0;
      for (const item in itemsData) {
        console.log("item", itemsData[item].rate);
        total += itemsData[item].rate * itemsData[item].qty;
      }
      const subTotal = document.getElementById("sub-total");
      subTotal.innerHTML = total;
    }
  });
  itemNameQty.addEventListener("change", () => {
    if (itemRate_ != "") {
      const amountId = document.getElementById(id + "-po-amount");
      console.log(itemQty_ + " * " + itemRate_);
      amountId.innerHTML = itemQty_ * itemRate_;

      itemsData[id] = {
        id: id,
        name: itemName_,
        qty: itemQty_,
        rate: itemRate_,
      };
      total = 0;
      for (const item in itemsData) {
        total += itemsData[item].rate * itemsData[item].qty;
      }

      const subTotal = document.getElementById("sub-total");
      subTotal.innerHTML = total;

      const gst = document.getElementById("gst");
      gst.innerHTML = round(0.18 * total);

      const totalAmt = document.getElementById("total");
      totalAmt.innerHTML = round(total + 0.18 * total);
    }
  });

  return row;
};

function round(num) {
  return Math.round(num * 100) / 100;
}

export async function handleMultipleDropdown() {
  const vendorOrganizationDropdown =
    document.getElementById("dropdown-options");

  const allOrgs = document.getElementsByClassName("dropdown-icon-wrapper")[0];
  allOrgs.addEventListener("click", (e) => {
    if (vendorOrganizationDropdown.classList.contains("hidden")) {
      vendorOrganizationDropdown.classList.remove("hidden");
    } else {
      vendorOrganizationDropdown.classList.add("hidden");
    }
  });

  try {
    const response = await getPurchaseOrderFormData();
    console.log("res", response);

    const OrganizationNames = response.data.vendor;

    OrganizationNames.map((organizationObject) => {
      const div = document.createElement("div");
      div.classList.add("vendor-type-dropdown-option");
      const input = document.createElement("input");
      input.classList.add("org-name-checkbox");
      input.type = "radio";
      input.id = organizationObject.organizationName;
      input.name = "vendorType";
      input.value = organizationObject.organizationName;
      input.classList.add("cursor-pointer");

      const label = document.createElement("label");
      label.setAttribute("for", organizationObject.organizationName);
      label.innerHTML = organizationObject.organizationName;
      label.classList.add("cursor-pointer");

      div.appendChild(input);
      div.appendChild(label);

      console.log("-->", vendorOrganizationDropdown);
      vendorOrganizationDropdown.appendChild(div);
    });
  } catch (error) {
    console.log(error);
  }
}

export const createItemsTable = () => {
  const table = document.querySelector("table");
  console.log("table", table);
  const row = addNewRow(currentId++);
  table.appendChild(row);

  const addItemsRow = document.getElementsByClassName("add-items-row")[0];
  addItemsRow.addEventListener("click", () => {
    const row = addNewRow(currentId++);
    table.appendChild(row);
  });

  const previewBtn = document.getElementById("preview-btn");
  previewBtn.addEventListener("click", showPreview);

  const cancelBtn = document.getElementsByClassName("form-cancel")[0];
  cancelBtn.addEventListener("click", handleCross);
};

export const showPreview = () => {
  console.log("showing preview");
  const formOutput = document.getElementById("form-output");
  formOutput.innerHTML = purchaseOrderFormPreviewHtml;

  const table = document.querySelector("table");

  for (const item in itemsData) {
    // console.log("item", itemsData[item].rate);
    // total += itemsData[item].rate * itemsData[item].qty;
    const row = document.createElement("tr");

    let td = document.createElement("td");
    td.innerHTML = itemsData[item].id;
    row.appendChild(td);

    td = document.createElement("td");
    td.innerHTML = itemsData[item].name;
    row.appendChild(td);

    td = document.createElement("td");
    td.innerHTML = itemsData[item].qty;
    row.appendChild(td);

    td = document.createElement("td");
    td.innerHTML = itemsData[item].rate;
    row.appendChild(td);

    td = document.createElement("td");
    td.innerHTML = itemsData[item].rate * itemsData[item].qty;
    row.appendChild(td);

    table.appendChild(row);

    const subTotal = document.getElementById("sub-total");
    subTotal.innerHTML = total;

    const gst = document.getElementById("gst");
    gst.innerHTML = round(0.18 * total);

    const totalAmt = document.getElementById("total");
    totalAmt.innerHTML = round(total + 0.18 * total);
  }

  const previewBtn = document.getElementById("back-btn");
  // previewBtn.addEventListener("click", showPreview);

  const cancelBtn = document.getElementsByClassName("form-cancel")[0];
  cancelBtn.addEventListener("click", handleCross);
};

export const handleAddRurchaseOrder = () => {};
