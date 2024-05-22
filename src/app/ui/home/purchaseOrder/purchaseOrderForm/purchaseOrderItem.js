import purchaseOrderItemHtml from "./purchaseOrderItem.html";

let itemName_ = "";
let itemAccount_ = "";
let itemQty_ = "";
let itemRate_ = "";
let itemTax_ = "";
let currentId = 1;
let total = 0;
const itemsData = {};

const addNewRow = (id) => {
  const row = document.createElement("tr");
  row.classList.add("tpo-tr");

  // DETAILS
  let div = document.createElement("td");
  div.classList.add("tpo-td");
  div.id = id + "-po-details";
  const itemDetailsInput = document.createElement("textarea");
  itemDetailsInput.addEventListener("change", (e) => {
    itemName_ = e.target.value;
  });

  const func = () => {
    console.log("___________>>>>>");
    const innDiv = document.createElement("div");
    innDiv.classList.add("po-item-dropdown");
    innDiv.classList.add("po-item-dropdown" + id);
    innDiv.innerHTML = "HII";
    innDiv.addEventListener("click", (e) => {
      console.log("cli");
    });

    const curr = document.getElementById(id + "-po-details");
    curr.appendChild(innDiv);
  };
  const func2 = () => {
    console.log("___________<<<<");
    // const innDiv = document.createElement("div");
    // innDiv.classList.add("po-item-dropdown");
    // innDiv.innerHTML = "HII";

    const curr = document.getElementsByClassName("po-item-dropdown" + id)[0];
    curr.remove();
  };
  itemDetailsInput.addEventListener("focus", func);
  itemDetailsInput.addEventListener("blur", func2);
  div.appendChild(itemDetailsInput);
  row.appendChild(div);

  // ACCOUNT
  div = document.createElement("td");
  div.classList.add("tpo-td");
  const itemNameInput = document.createElement("textarea");
  itemNameInput.addEventListener("change", (e) => {
    itemAccount_ = e.target.value;
  });
  div.appendChild(itemNameInput);
  row.appendChild(div);

  // QUANTITY
  div = document.createElement("td");
  div.classList.add("tpo-td");
  const itemNameQty = document.createElement("textarea");
  itemNameQty.addEventListener("change", (e) => {
    itemQty_ = e.target.value;
  });
  div.appendChild(itemNameQty);
  row.appendChild(div);

  // RATE
  div = document.createElement("td");
  div.classList.add("tpo-td");
  const itemNameRate = document.createElement("textarea");
  itemNameRate.addEventListener("change", (e) => {
    itemRate_ = e.target.value;
  });
  div.appendChild(itemNameRate);
  row.appendChild(div);

  // TAX
  div = document.createElement("td");
  div.classList.add("tpo-td");
  const itemtaxRate = document.createElement("textarea");
  itemtaxRate.addEventListener("change", (e) => {
    itemTax_ = e.target.value;
  });
  div.appendChild(itemtaxRate);
  row.appendChild(div);

  // AMOUNT
  div = document.createElement("td");
  div.classList.add("tpo-td");
  div.id = id + "-po-amount";
  row.appendChild(div);

  itemNameRate.addEventListener("change", () => {
    if (itemQty_ != "") {
      const amountId = document.getElementById(id + "-po-amount");
      const tArea = document.createElement("textarea");
      tArea.readOnly = "true";
      console.log(itemQty_ + " * " + itemRate_);
      tArea.innerHTML = itemQty_ * itemRate_;
      amountId.innerHTML = "";
      amountId.appendChild(tArea);

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
      const tArea = document.createElement("textarea");
      tArea.readOnly = "true";
      console.log(itemQty_ + " * " + itemRate_);
      tArea.innerHTML = itemQty_ * itemRate_;
      amountId.innerHTML = "";
      amountId.appendChild(tArea);

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
    }
  });

  let tableData = JSON.parse(localStorage.getItem("poTableData")) || [];
  tableData.push(["", "", "", "", ""]);
  localStorage.setItem("poTableData", JSON.stringify(tableData));

  return row;
};

export const handleAddNewRow = () => {
  const tBody = document.querySelector("tbody");
  console.log("table", tBody);
  const row = addNewRow(currentId++);
  tBody.appendChild(row);
  let tableData = JSON.parse(localStorage.getItem("poTableData")) || [];

  const table = document.querySelector("table");
  table.querySelectorAll("textarea").forEach((textarea) => {
    console.log("listen");
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

  // const addItemsRow = document.getElementsByClassName("add-items-row")[0];
  // addItemsRow.addEventListener("click", () => {
  //   const row = addNewRow(currentId++);
  //   table.appendChild(row);
  // });

  // const previewBtn = document.getElementById("preview-btn");
  // previewBtn.addEventListener("click", showPreview);
};

export const handleAddNewItem = () => {
  console.log("clicked");
  const vendorFormOutput = document.getElementById("form-output");
  vendorFormOutput.innerHTML = purchaseOrderItemHtml;

  vendorFormOutput.classList.remove("hidden");
  // const vendorFormCross = document.getElementById("form-cross");
  // vendorFormCross.addEventListener("click", (e) => {
  //   handleCross();
  // });

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
let constPrice_ = "";
let cAccount_ = "";
let cDescription_ = "";
let intaTax_ = "";
let interTax_ = "";

const handleMultipleDropdownForItem = () => {
  const sacOrHsn = document.getElementsByClassName("sacOrHsn")[0];
  const serviceOrGoods = document.getElementsByClassName("serviceOrGoods");
  const serviceOrGoodsArr = [...serviceOrGoods];
  serviceOrGoodsArr.map((s) => {
    s.addEventListener("click", (e) => {
      if (e.target.value == "goods") {
        sacOrHsn.innerHTML = "HSN Code";
      } else {
        sacOrHsn.innerHTML = "SAC";
      }
    });
  });

  handleDataChange();
};

const handleDataChange = () => {};

export const changeBackgroundOnModal = () => {
  const mainContainer = document.getElementsByClassName("main-container")[0];
  mainContainer.classList.add("blur-background");
  document.body.classList.add("overflow-hidden");
};
