import {
  getSalesInvoiceFormData,
  postSalesInvoice,
  sendSalesInvoiceMail,
} from "../../../../service/invoiceApi";
import {
  postPurchaseOrder,
  sendPurchaseOrderMail,
} from "../../../../service/purchaseOrder";
// import goToPurchaseOrder from "../purchaseOrder";
// import { checkFieldValuesForPo } from "./purchaseOrderForm";
import salesInvoiceFormPreviewHtml from "./salesInvoiceFormPreview.html";
import salesInvoiceFormHtml from "./salesInvoiceForm.html";
import {
  clearInvoiceFormData,
  handleMultipleDropdownForSalesInvoice,
} from "./salesInvoiceForm";
import { handleAddNewRow } from "./salesInvoiceItem";
import { recalculateTotals } from "./salesInvoiceItem";
import goToSalesInvoice from "../salesInvoice";
import { localStorageKeys } from "../../../../util/constants";

export const createWord = (email) => {
  const sendTo = document.getElementById("send-to");
  sendTo.value = email;

  const boldBtn = document.getElementById("bold-btn");
  const italicBtn = document.getElementById("italic-btn");
  const underlineBtn = document.getElementById("underline-btn");
  const strikethroughBtn = document.getElementById("strikethrough-btn");
  boldBtn.addEventListener("click", (e) => {
    formatText("bold");
  });
  italicBtn.addEventListener("click", (e) => {
    formatText("italic");
  });
  underlineBtn.addEventListener("click", (e) => {
    formatText("underline");
  });
  strikethroughBtn.addEventListener("click", (e) => {
    formatText("strikethrough");
  });

  console.log("RRR");
  function formatText(command) {
    document.execCommand(command, false, null);
    updateActiveButtons();
  }

  function updateActiveButtons() {
    document
      .getElementById("bold-btn")
      .classList.toggle("active", document.queryCommandState("bold"));
    document
      .getElementById("italic-btn")
      .classList.toggle("active", document.queryCommandState("italic"));
    document
      .getElementById("underline-btn")
      .classList.toggle("active", document.queryCommandState("underline"));
    document
      .getElementById("strikethrough-btn")
      .classList.toggle("active", document.queryCommandState("strikethrough"));
  }

  document
    .querySelector(".editor")
    .addEventListener("keyup", updateActiveButtons);
  document
    .querySelector(".editor")
    .addEventListener("mouseup", updateActiveButtons);

  const goBack = document.getElementById("go-back-invoice");
  goBack.addEventListener("click", async () => {
    const homeRoot = document.querySelector("main");
    homeRoot.innerHTML = salesInvoiceFormHtml;

    try {
      // const response = await getSalesInvoiceFormData();
      const currentSalesInvoice = JSON.parse(
        sessionStorage.getItem("sales-invoice")
      );
      console.log("data extracting from session storage", currentSalesInvoice);

      handleMultipleDropdownForSalesInvoice(currentSalesInvoice);
      const items = JSON.parse(
        localStorage.getItem(localStorageKeys.invoiceTableData)
      );
      console.log("all items", items);

      const invoiceTable = [];
      localStorage.setItem(
        localStorageKeys.invoiceTableData,
        JSON.stringify(invoiceTable)
      );

      for (const item in items) {
        const singleItem = items[item];
        const data = {
          itemDetail: singleItem[0],
          itemAccount: singleItem[1],
          quantity: singleItem[2],
          rate: singleItem[3],
          tax: singleItem[4],
          id: singleItem[5],
          hsn: singleItem[6],
        };

        console.log("graph -> ", data);
        handleAddNewRow(data);
      }
      const addNewRow = document.getElementById("po-add-row");
      const data = {
        itemDetail: "",
        itemAccount: "",
        quantity: "0.0",
        rate: "",
        tax: "",
        hsn: "",
      };
      addNewRow.addEventListener("click", () => handleAddNewRow(data));
      // addNewRow.click();

      recalculateTotals();
    } catch (error) {
      console.log(error);
    }
  });
};

export const showPdfPreview = (amountInfo, identifier, vendorAddressDiv) => {
  console.log(amountInfo);
  const emailPdf = document.getElementsByClassName("email-pdf")[0];
  emailPdf.addEventListener("click", () => {
    const formOutput = document.getElementById("form-output");
    formOutput.innerHTML = salesInvoiceFormPreviewHtml;
    formOutput.classList.remove("hidden");
    formOutput.classList.add("form-scroll");
    changeBackgroundOnModal();

    const identifierPreview = document.getElementById("identifier-preview");
    identifierPreview.innerHTML = `#${identifier}`;

    const formCancel = document.getElementsByClassName("form-cancel")[0];
    formCancel.addEventListener("click", (e) => {
      // handleCross();
      formOutput.classList.add("hidden");
      formOutput.classList.remove("form-scroll");

      const mainContainer =
        document.getElementsByClassName("main-container")[0];
      mainContainer.classList.remove("blur-background");
      document.body.classList.remove("overflow-hidden");
    });

    const subTotal = document.getElementById("sub-total");
    subTotal.innerHTML = amountInfo.subTotal;

    const percentageInput = document.getElementById("percentage-input");
    percentageInput.innerHTML = amountInfo.discount;

    let totalAmt =
      amountInfo.subTotal - amountInfo.subTotal * (amountInfo.discount / 100);
    const total = document.getElementById("total");
    total.innerHTML = totalAmt;

    handleAddingRowsToTable();
    handlePreviewDataFill(vendorAddressDiv);
  });
};

export const changeBackgroundOnModal = () => {
  const mainContainer = document.getElementsByClassName("main-container")[0];
  mainContainer.classList.add("blur-background");
  // document.body.classList.add("overflow-hidden");
};

export const handleAddingRowsToTable = () => {
  let tableData =
    JSON.parse(localStorage.getItem(localStorageKeys.invoiceTableData)) || [];
  const table = document.querySelector("table");
  const tBody = document.createElement("tbody");
  tBody.classList.add("table-body");
  tableData.map((item) => {
    const tr = document.createElement("tr");

    let td = document.createElement("td");
    const itemDetails = item[0];
    td.innerHTML = itemDetails;
    tr.appendChild(td);

    td = document.createElement("td");
    const itemAccount = item[1];
    td.innerHTML = itemAccount;
    tr.appendChild(td);

    td = document.createElement("td");
    const itemQuantity = item[2];
    td.innerHTML = itemQuantity;
    tr.appendChild(td);

    td = document.createElement("td");
    const itemRate = item[3];
    td.innerHTML = itemRate;
    tr.appendChild(td);

    td = document.createElement("td");
    const itemTax = item[4];
    td.innerHTML = itemTax;
    tr.appendChild(td);

    td = document.createElement("td");
    const itemAmont = itemQuantity * itemRate;
    td.innerHTML = itemAmont;
    tr.appendChild(td);

    tBody.appendChild(tr);
  });

  table.appendChild(tBody);
  console.log("tBody", tBody);
};

export const handlePreviewDataFill = (
  vendorAddressDiv,
  deliveryAdressDiv,
  branchDiv
) => {
  console.log("v. ", vendorAddressDiv);
  console.log("d. ", deliveryAdressDiv);
  console.log("d. ", branchDiv);

  vendorAddressDiv.classList.add("exsq-address");
  const vendorAddressPreview = document.getElementById(
    "vendor-address-preview"
  );
  vendorAddressPreview.innerHTML = "";
  vendorAddressPreview.appendChild(vendorAddressDiv);
};

export const handleMailOrDraftPo = (data) => {
  // console.log(mailData);
  const postPo = document.getElementById("post-po");
  postPo.addEventListener("click", () => preparePostData(data, "Issued"));

  const saveDraftPo = document.getElementById("save-draft-po");
  saveDraftPo.addEventListener("click", () => preparePostData(data, "Draft"));
};

export const preparePostData = async (data, status) => {
  const postPo = document.getElementById("post-po");
  postPo.classList.add("disabled");
  const saveDraftPo = document.getElementById("save-draft-po");
  saveDraftPo.classList.add("disabled-light");
  const formCancel = document.getElementsByClassName("form-cancel")[0];
  formCancel.classList.add("disabled-light");

  data["status"] = status;

  const emailSubject = document.getElementsByClassName("email-subject")[0];
  data.subject = emailSubject.value;

  const editor = document.getElementsByClassName("editor")[0];
  const bodyString = editor.outerHTML;
  data.body = bodyString;

  try {
    console.log("post invoice data", data);
    const res = await postSalesInvoice(data);
    console.log("res", res);
    clearInvoiceFormData();
    goToSalesInvoice();
  } catch (error) {
    console.log("error", error);

    postPo.classList.remove("disabled");
    saveDraftPo.classList.remove("disabled-light");
    formCancel.classList.remove("disabled-light");
  }
};
