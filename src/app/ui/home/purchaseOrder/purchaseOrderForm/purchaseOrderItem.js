import {
  getFormPreviousItems,
  getNewItemFormData,
  getOldItemDetails,
  postItem,
} from "../../../../service/purchaseOrder";
import purchaseOrderItemHtml from "./purchaseOrderItem.html";

let itemName_ = "";
let itemAccount_ = "";
let itemQty_ = "";
let itemRate_ = "";
let itemTax_ = "";
let currentId = 1;
let total = 0;
const itemsData = {};

const removeLastRow = () => {
  let tableData = JSON.parse(localStorage.getItem("poTableData")) || [];
  tableData.pop();
  localStorage.setItem("poTableData", JSON.stringify(tableData));

  const tBody = document.querySelector("tbody");
  console.log(tBody);
  const lastRow = tBody.lastElementChild;
  if (lastRow) {
    tBody.removeChild(lastRow);
  }
};

const addNewRowFromList = (item) => {
  removeLastRow();

  const data = {
    itemDetail: item.name,
    itemAccount: item.account,
    quantity: "0.0",
    rate: "",
    tax: item.gst,
    id: item.id,
  };

  handleAddNewRow(data);
};

const func = async (id) => {
  // const res = await getOldItemDetails();
  const res = await getFormPreviousItems();

  const items = res.data;

  const innDiv = document.createElement("div");
  innDiv.classList.add("po-item-dropdown");
  innDiv.classList.add("po-item-dropdown" + id);

  items.map((item) => {
    const li = document.createElement("p");
    li.innerHTML = item.name;
    li.addEventListener("click", () => addNewRowFromList(item));
    innDiv.appendChild(li);
  });

  const button = document.createElement("button");
  button.classList.add("add-item-btn");
  button.addEventListener("click", handleAddNewItem);
  button.innerHTML = "add items";
  innDiv.appendChild(button);

  const curr = document.getElementById(id + "-po-details");
  curr.appendChild(innDiv);

  var pol = document.getElementsByClassName("po-item-dropdown");
  const polArr = [...pol];

  polArr.map((pol) => {
    window.addEventListener("mouseup", function (event) {
      if (event.target != pol && event.target.parentNode != pol) {
        pol.style.display = "none";
      }
    });
  });
};

const addNewRow = (id, data) => {
  const row = document.createElement("tr");
  row.classList.add("tpo-tr");

  // DETAILS
  let div = document.createElement("td");
  div.classList.add("tpo-td");
  div.id = id + "-po-details";
  const itemDetailsInput = document.createElement("textarea");
  itemDetailsInput.value = data.itemDetail;
  itemDetailsInput.addEventListener("change", (e) => {
    itemName_ = e.target.value;
  });

  itemDetailsInput.addEventListener("focus", () => func(id));
  div.appendChild(itemDetailsInput);
  row.appendChild(div);

  // ACCOUNT
  div = document.createElement("td");
  div.classList.add("tpo-td");
  const itemNameInput = document.createElement("textarea");
  itemNameInput.value = data.itemAccount;
  itemNameInput.addEventListener("change", (e) => {
    itemAccount_ = e.target.value;
  });
  div.appendChild(itemNameInput);
  row.appendChild(div);

  // QUANTITY
  div = document.createElement("td");
  div.classList.add("tpo-td");
  const itemNameQty = document.createElement("textarea");
  console.log("Q", data.quantity);
  itemNameQty.value = data.quantity;
  itemNameQty.addEventListener("change", (e) => {
    itemQty_ = e.target.value;
  });
  div.appendChild(itemNameQty);
  row.appendChild(div);

  // RATE
  div = document.createElement("td");
  div.classList.add("tpo-td");
  const itemNameRate = document.createElement("textarea");
  itemNameRate.value = data.rate;
  itemNameRate.addEventListener("change", (e) => {
    itemRate_ = e.target.value;
  });
  div.appendChild(itemNameRate);
  row.appendChild(div);

  // TAX
  div = document.createElement("td");
  div.classList.add("tpo-td");
  const itemtaxRate = document.createElement("textarea");
  itemtaxRate.value = data.tax;
  itemtaxRate.addEventListener("change", (e) => {
    itemTax_ = e.target.value;
  });
  div.appendChild(itemtaxRate);
  row.appendChild(div);

  // AMOUNT
  div = document.createElement("td");
  div.classList.add("tpo-td");
  const tArea = document.createElement("textarea");
  tArea.readOnly = "true";
  div.id = id + "-po-amount";
  div.appendChild(tArea);
  row.appendChild(div);

  itemNameRate.addEventListener("change", () => {
    if (itemQty_ != "") {
      // const amountId = document.getElementById(id + "-po-amount");
      console.log(itemQty_ + " * " + itemRate_);
      tArea.innerHTML = itemQty_ * itemRate_;
      // amountId.innerHTML = "";
      // amountId.appendChild(tArea);

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

      evaluateTotal(total);
      document
        .getElementById("percentage-input")
        .addEventListener("input", () => evaluateTotal(total));
    }
  });
  itemNameQty.addEventListener("change", () => {
    if (itemRate_ != "") {
      // const amountId = document.getElementById(id + "-po-amount");
      console.log(itemQty_ + " * " + itemRate_);
      tArea.innerHTML = itemQty_ * itemRate_;
      // amountId.innerHTML = "";
      // amountId.appendChild(tArea);

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

      evaluateTotal(total);

      document
        .getElementById("percentage-input")
        .addEventListener("input", () => evaluateTotal(total));
    }
  });

  const evaluateTotal = (subTotal) => {
    const total = document.getElementById("total");
    const percentageInput = document.getElementById("percentage-input").value;
    const discountProvided = document.getElementById("discount-provided");

    console.log(subTotal);
    console.log(typeof subTotal);
    console.log(percentageInput);
    const pI = Number(percentageInput);
    console.log(pI);
    console.log(typeof pI);
    const totalAmt = subTotal - (pI / 100) * subTotal;
    discountProvided.innerHTML = (pI / 100) * subTotal;

    console.log(totalAmt);
    console.log(typeof totalAmt);
    const totalAmtRoundOff = Math.round(totalAmt * 100) / 100;

    total.innerHTML = totalAmtRoundOff;
  };

  let tableData = JSON.parse(localStorage.getItem("poTableData")) || [];
  // tableData.push(["", "", "", "", ""]);
  console.log("CURARR", data);
  const currArr = [];
  for (let d in data) {
    currArr.push(data[d]);
    console.log("DD", data[d]);
  }
  tableData.push(currArr);
  localStorage.setItem("poTableData", JSON.stringify(tableData));

  return row;
};

export const handleAddNewRow = (data) => {
  console.log("data", data);

  const tBody = document.querySelector("tbody");
  const row = addNewRow(currentId++, data);
  tBody.appendChild(row);
  let tableData = JSON.parse(localStorage.getItem("poTableData")) || [];

  const table = document.querySelector("table");
  table.querySelectorAll("textarea").forEach((textarea) => {
    textarea.addEventListener("input", handleEdit);
  });

  function handleEdit(event) {
    const textarea = event.target;
    const td = textarea.closest("td");
    const tr = td.closest("tr");
    const columnIndex = Array.from(tr.children).indexOf(td);

    // console.log("Edited Column:", columnIndex);

    const rowIndex = Array.from(tr.parentElement.children).indexOf(tr);

    // console.log('Edited Row:', rowIndex);

    // Optionally, you can do something specific based on the row
    console.log(` ${rowIndex} , ${columnIndex} `);

    console.log("", textarea.value);
    tableData[rowIndex][columnIndex] = textarea.value;
    localStorage.setItem("poTableData", JSON.stringify(tableData));

    console.log("TABLE", tableData);
  }
};

export const handleAddNewItem = () => {
  console.log("clicked");
  const vendorFormOutput = document.getElementById("form-output");
  vendorFormOutput.innerHTML = purchaseOrderItemHtml;

  vendorFormOutput.classList.remove("hidden");
  const vendorFormCross = document.getElementById("item-form-cross");
  vendorFormCross.addEventListener("click", (e) => {
    handleCancelItemForm();
  });

  // const vendorFormCancel = document.getElementsByClassName("form-cancel")[0];
  // vendorFormCancel.addEventListener("click", (e) => {
  //   handleCross();
  // });

  handleMultipleDropdownForItem();

  changeBackgroundOnModal();
};

let type_ = "";
let name_ = "";
let unit_ = "";
let sacOrHsn_ = "";
let taxPreference_ = "";
let sellingPrice_ = "";
let sAccount_ = "";
let sDescription_ = "";
let costPrice_ = "";
let cAccount_ = "";
let cDescription_ = "";
let intraTax_ = "";
let interTax_ = "";

let typeItem = document.getElementsByClassName("service-or-goods-item");

let name = document.getElementById("name");

let unit = document.getElementById("unit");
let unitItem = document.getElementsByClassName("unit-item");

let sacOrHsn = document.getElementById("sacOrHsn");

let taxPreference = document.getElementById("tax-preference");
let taxPreferenceItem = document.getElementsByClassName("tax-preference-item");

let sellingPrice = document.getElementById("selling-price");
let sAccount = document.getElementById("selling-account");
let sDescription = document.getElementById("selling-description");

let costPrice = document.getElementById("cost-price");
let cAccount = document.getElementById("selling-account");
let cDescription = document.getElementById("selling-description");

let intraTax = document.getElementById("intra-tax");
let intraTaxItem = document.getElementsByClassName("intra-tax-item");
let interTax = document.getElementById("inter-tax");
let interTaxItem = document.getElementsByClassName("inter-tax-item");

const mapUnitNameToUnitId = {};
const handleMultipleDropdownForItem = async () => {
  const sacOrHsn = document.getElementsByClassName("sacOrHsn")[0];
  const serviceOrGoods = document.getElementsByClassName(
    "service-or-goods-item"
  );
  const serviceOrGoodsArr = [...serviceOrGoods];
  console.log("serviceOrGoodsArr", serviceOrGoodsArr);
  serviceOrGoodsArr.map((item) => {
    // if (item.checked) {
    //   console.log("AAHAHAHAAAAAA", item);
    // }
    item.addEventListener("change", (e) => {
      if (item.checked) {
        console.log("-=> =>", e.target.value);
        if (e.target.value == "Services") {
          sacOrHsn.innerHTML = "SAC";
        } else {
          sacOrHsn.innerHTML = "HSN Code";
        }
      }
    });
  });

  const res = await getNewItemFormData();

  const gstRatesList = res.data.gstRates;
  const taxPreferenceList = res.data.taxPreference;
  const unitList = res.data.units;

  let unit = document.getElementById("unit");
  const unitWrapper = document.getElementsByClassName("unit-wrapper")[0];
  unitList.map((item) => {
    const div = document.createElement("div");
    div.classList.add("vendor-type-dropdown-option");

    const input = document.createElement("input");
    input.type = "radio";
    input.id = item.name;
    input.name = "vendorType";
    input.value = item.name;
    input.classList.add("cursor-pointer");
    input.classList.add("unit-item");

    const label = document.createElement("span");
    label.setAttribute("for", item.name);
    label.innerHTML = item.name;
    label.classList.add("cursor-pointer");

    div.appendChild(input);
    div.appendChild(label);

    unitWrapper.appendChild(div);

    mapUnitNameToUnitId[item.name] = item.id;
  });
  togglePopup(unit, unitWrapper);

  let taxPreference = document.getElementById("tax-preference");
  const taxPreferenceWrapper = document.getElementsByClassName(
    "tax-preference-wrapper"
  )[0];
  taxPreferenceList.map((item) => {
    const div = document.createElement("div");
    div.classList.add("vendor-type-dropdown-option");

    const input = document.createElement("input");
    input.type = "radio";
    input.id = item;
    input.name = "vendorType";
    input.value = item;
    input.classList.add("cursor-pointer");
    input.classList.add("tax-preference-item");

    const label = document.createElement("span");
    label.setAttribute("for", item);
    label.innerHTML = item;
    label.classList.add("cursor-pointer");

    div.appendChild(input);
    div.appendChild(label);

    taxPreferenceWrapper.appendChild(div);
  });
  togglePopup(taxPreference, taxPreferenceWrapper);

  let stateTax1 = document.getElementById("intra-tax");
  const stateTax1Wrapper =
    document.getElementsByClassName("intra-tax-wrapper")[0];
  gstRatesList.map((item) => {
    const div = document.createElement("div");
    div.classList.add("vendor-type-dropdown-option");

    const input = document.createElement("input");
    input.type = "radio";
    input.id = item;
    input.name = "vendorType";
    input.value = item;
    input.classList.add("cursor-pointer");
    input.classList.add("intra-tax-item");

    const label = document.createElement("span");
    label.setAttribute("for", item);
    label.innerHTML = item;
    label.classList.add("cursor-pointer");

    div.appendChild(input);
    div.appendChild(label);

    stateTax1Wrapper.appendChild(div);
  });
  togglePopup(stateTax1, stateTax1Wrapper);

  let stateTax2 = document.getElementById("inter-tax");
  const stateTax2Wrapper =
    document.getElementsByClassName("inter-tax-wrapper")[0];
  gstRatesList.map((item) => {
    const div = document.createElement("div");
    div.classList.add("vendor-type-dropdown-option");

    const input = document.createElement("input");
    input.type = "radio";
    input.id = item;
    input.name = "vendorType";
    input.value = item;
    input.classList.add("cursor-pointer");
    input.classList.add("inter-tax-item");

    const label = document.createElement("span");
    label.setAttribute("for", item);
    label.innerHTML = item;
    label.classList.add("cursor-pointer");

    div.appendChild(input);
    div.appendChild(label);

    stateTax2Wrapper.appendChild(div);
  });
  togglePopup(stateTax2, stateTax2Wrapper);

  handleDataChange();
};

const handleDataChange = () => {
  name = document.getElementById("name");
  unit = document.getElementById("unit");
  sacOrHsn = document.getElementById("sacOrHsn");
  taxPreference = document.getElementById("tax-preference");
  sellingPrice = document.getElementById("selling-price");
  sAccount = document.getElementById("selling-account");
  sDescription = document.getElementById("selling-description");
  costPrice = document.getElementById("cost-price");
  cAccount = document.getElementById("cost-account");
  cDescription = document.getElementById("cost-description");
  intraTax = document.getElementById("intra-tax");
  interTax = document.getElementById("inter-tax");

  const typeArr = [...typeItem];
  typeArr.map((item) => {
    item.addEventListener("change", (e) => {
      if (item.checked) {
        type_ = e.target.value;
      }
    });
  });

  name.addEventListener("input", (e) => {
    removeBorder(name);
    document.getElementById("name-error").classList.add("hidden");
    name_ = e.target.value;
  });

  const unitArr = [...unitItem];
  unitArr.map((item) => {
    item.addEventListener("change", (e) => {
      removeBorder(unit);
      document.getElementById("unit-error").classList.add("hidden");
      if (item.checked) {
        unit_ = e.target.value;
        unit.value = unit_;
      }

      const unitWrapper = document.getElementsByClassName("unit-wrapper")[0];
      unitWrapper.classList.add("hidden");
    });
  });

  sacOrHsn.addEventListener("input", (e) => {
    removeBorder(sacOrHsn);
    document.getElementById("sac-or-hsn-error").classList.add("hidden");
    sacOrHsn_ = e.target.value;
  });

  const taxPreferenceArr = [...taxPreferenceItem];
  console.log("taxPreferenceArr arr", taxPreferenceArr);
  taxPreferenceArr.map((item) => {
    item.addEventListener("change", (e) => {
      removeBorder(taxPreference);
      document.getElementById("tax-preference-error").classList.add("hidden");
      if (item.checked) {
        taxPreference_ = e.target.value;
        taxPreference.value = taxPreference_;
      }

      const unitWrapper = document.getElementsByClassName(
        "tax-preference-wrapper"
      )[0];
      unitWrapper.classList.add("hidden");
    });
  });

  sellingPrice.addEventListener("input", (e) => {
    removeBorder(sellingPrice);
    document.getElementById("selling-price-error").classList.add("hidden");
    sellingPrice_ = e.target.value;
  });

  costPrice.addEventListener("input", (e) => {
    removeBorder(costPrice);
    document.getElementById("cost-price-error").classList.add("hidden");
    costPrice_ = e.target.value;
  });

  sAccount.addEventListener("input", (e) => {
    removeBorder(sAccount);
    document.getElementById("selling-account-error").classList.add("hidden");
    sAccount_ = e.target.value;
  });

  cAccount.addEventListener("input", (e) => {
    removeBorder(cAccount);
    document.getElementById("cost-account-error").classList.add("hidden");
    cAccount_ = e.target.value;
  });

  sDescription.addEventListener("input", (e) => {
    removeBorder(sDescription);
    document
      .getElementById("selling-description-error")
      .classList.add("hidden");
    sDescription_ = e.target.value;
  });

  cDescription.addEventListener("input", (e) => {
    removeBorder(cDescription);
    document.getElementById("cost-description-error").classList.add("hidden");
    cDescription_ = e.target.value;
  });

  const interTaxArr = [...interTaxItem];
  interTaxArr.map((item) => {
    item.addEventListener("change", (e) => {
      removeBorder(interTax);
      document.getElementById("inter-tax-error").classList.add("hidden");
      if (item.checked) {
        interTax_ = e.target.value;
        interTax.value = interTax_;
      }

      const interTaxWrapper =
        document.getElementsByClassName("inter-tax-wrapper")[0];
      interTaxWrapper.classList.add("hidden");
    });
  });

  const intraTaxArr = [...intraTaxItem];
  intraTaxArr.map((item) => {
    item.addEventListener("change", (e) => {
      removeBorder(intraTax);
      document.getElementById("intra-tax-error").classList.add("hidden");
      if (item.checked) {
        intraTax_ = e.target.value;
        intraTax.value = intraTax_;
      }

      const intraTaxWrapper =
        document.getElementsByClassName("intra-tax-wrapper")[0];
      intraTaxWrapper.classList.add("hidden");
    });
  });

  const addNewItemBtn = document.getElementById("add-new-item-btn");
  addNewItemBtn.addEventListener("click", handleAddNewRowThroughForm);
};

const handleAddNewRowThroughForm = async () => {
  // check check
  if (!checkFieldValuesForPoItem()) {
    return;
  }

  const formOutput = document.getElementById("form-output");
  formOutput.classList.add("hidden");

  const mainContainer = document.getElementsByClassName("main-container")[0];
  mainContainer.classList.remove("blur-background");
  document.body.classList.remove("overflow-hidden");
  window.scrollTo(0, document.body.scrollHeight);

  if (document.getElementById("goods").checked) {
    type_ = "Goods";
  } else {
    type_ = "Services";
  }

  const newItem = {
    name: name_,
    itemType: type_,
    code: sacOrHsn_,
    unitId: mapUnitNameToUnitId[unit_],
    taxPreference: taxPreference_,
    sellingPrice: sellingPrice_,
    salesAccount: sAccount_,
    salesDescription: sDescription_,
    costPrice: costPrice_,
    purchaseAccount: cAccount_,
    purchaseDescription: cDescription_,
    gstRate: interTax_,
    iGstRate: intraTax_,
  };

  const res = await postItem(newItem);
  console.log("POSTED ITEM", res);

  const data = {
    itemDetail: name_,
    itemAccount: sAccount_,
    quantity: "0.0",
    rate: "",
    tax: interTax_,
    id: res.data,
  };

  removeLastRow();
  handleAddNewRow(data);
  clearFormData();
};

export const changeBackgroundOnModal = () => {
  const mainContainer = document.getElementsByClassName("main-container")[0];
  mainContainer.classList.add("blur-background");
  document.body.classList.add("overflow-hidden");
  document.body.scrollTop = document.documentElement.scrollTop = 0;
};

const clearFormData = () => {
  type_ = "";
  name_ = "";
  unit_ = "";
  sacOrHsn_ = "";
  taxPreference_ = "";
  sellingPrice_ = "";
  sAccount_ = "";
  sDescription_ = "";
  costPrice_ = "";
  cAccount_ = "";
  cDescription_ = "";
  intraTax_ = "";
  interTax_ = "";
};

const handleCancelItemForm = () => {
  clearFormData();
  const vendorFormOutput = document.getElementById("form-output");
  vendorFormOutput.classList.add("hidden");

  const mainContainer = document.getElementsByClassName("main-container")[0];
  mainContainer.classList.remove("blur-background");
  document.body.classList.remove("overflow-hidden");

  window.scrollTo(0, document.body.scrollHeight);
};

const togglePopup = (div, div2) => {
  console.log(div);
  console.log(div2);
  div.addEventListener("click", (e) => {
    if (div2.classList.contains("hidden")) {
      div2.classList.remove("hidden");
    } else {
      div2.classList.add("hidden");
    }
  });
};

export const checkFieldValuesForPoItem = () => {
  let checkResult = true;

  if (isNullOrEmpty(name_)) {
    const error_element = document.getElementById("name-error");
    console.log(error_element);
    showErrorMessage(error_element, "Please enter name");
    name.classList.add("empty-field-border");
    checkResult = false;
  }
  if (isNullOrEmpty(unit_)) {
    const error_element = document.getElementById("unit-error");
    console.log(error_element);
    showErrorMessage(error_element, "Please select a unit");
    unit.classList.add("empty-field-border");
    checkResult = false;
  }
  if (isNullOrEmpty(sacOrHsn_)) {
    const error_element = document.getElementById("sac-or-hsn-error");
    console.log(error_element);
    showErrorMessage(error_element, "Please enter the code");
    sacOrHsn.classList.add("empty-field-border");
    checkResult = false;
  }

  if (isNullOrEmpty(taxPreference_)) {
    const error_element = document.getElementById("tax-preference-error");
    console.log(error_element);
    showErrorMessage(error_element, "Please select the tax preference");
    taxPreference.classList.add("empty-field-border");
    checkResult = false;
  }

  if (isNullOrEmpty(sellingPrice_)) {
    const error_element = document.getElementById("selling-price-error");
    console.log(error_element);
    showErrorMessage(error_element, "Please enter the selling price");
    sellingPrice.classList.add("empty-field-border");
    checkResult = false;
  }
  if (isNullOrEmpty(sAccount_)) {
    const error_element = document.getElementById("selling-account-error");
    console.log(error_element);
    showErrorMessage(error_element, "Please enter the selling error");
    sAccount.classList.add("empty-field-border");
    checkResult = false;
  }
  if (isNullOrEmpty(sDescription_)) {
    const error_element = document.getElementById("selling-description-error");
    console.log(error_element);
    showErrorMessage(error_element, "Please enter the selling description");
    sDescription.classList.add("empty-field-border");
    checkResult = false;
  }

  if (isNullOrEmpty(costPrice_)) {
    const error_element = document.getElementById("cost-price-error");
    console.log(error_element);
    showErrorMessage(error_element, "Please enter the cost price");
    costPrice.classList.add("empty-field-border");
    checkResult = false;
  }
  if (isNullOrEmpty(cAccount_)) {
    const error_element = document.getElementById("cost-account-error");
    console.log(error_element);
    showErrorMessage(error_element, "Please enter the cost error");
    cAccount.classList.add("empty-field-border");
    checkResult = false;
  }
  if (isNullOrEmpty(cDescription_)) {
    const error_element = document.getElementById("cost-description-error");
    console.log(error_element);
    showErrorMessage(error_element, "Please enter the cost description");
    cDescription.classList.add("empty-field-border");
    checkResult = false;
  }

  if (isNullOrEmpty(interTax_)) {
    const error_element = document.getElementById("inter-tax-error");
    console.log(error_element);
    showErrorMessage(error_element, "Please select the inter tax");
    interTax.classList.add("empty-field-border");
    checkResult = false;
  }
  if (isNullOrEmpty(intraTax_)) {
    const error_element = document.getElementById("intra-tax-error");
    console.log(error_element);
    showErrorMessage(error_element, "Please enter the intra tax");
    intraTax.classList.add("empty-field-border");
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
