import salesInvoiceFormHtml from "./salesInvoiceForm/salesInvoiceForm.html";

import {
  downloadSalesInvoice,
  getInvoiceStats,
  getSalesInvoiceFormData,
  getSalesInvoices,
} from "../../../service/invoiceApi";
import salesInvoiceHtml from "./salesInvoice.html";

import { createTableHeader } from "../../../common/components/table";
import { noDataAdded } from "../../../common/components/emptyData";
// import { handleFileDownload } from "../contract/contract";
import { searchInvoices } from "../../../service/searchApi";
import { addPagination } from "../../../common/components/pagination";
import { searchModel } from "../../../common/components/search";
import { handleMultipleDropdownForSalesInvoice } from "./salesInvoiceForm/salesInvoiceForm";
import { handleAddNewRow } from "./salesInvoiceForm/salesInvoiceItem";
import { localStorageKeys } from "../../../util/constants";

export default async function goToSalesInvoice() {
  const homeRoot = document.querySelector("main");
  console.log(homeRoot);
  homeRoot.innerHTML = salesInvoiceHtml;

  const formOutput = document.getElementById("form-output");
  formOutput.innerHTML = "";

  const addButton = document.getElementById("add-button");
  addButton.addEventListener("click", async () => {
    const homeRoot = document.querySelector("main");
    homeRoot.innerHTML = salesInvoiceFormHtml;

    const invoiceTable = [];
    localStorage.setItem(
      localStorageKeys.invoiceTableData,
      JSON.stringify(invoiceTable)
    );

    try {
      const response = await getSalesInvoiceFormData();
      const currentSalesInvoice = response.data;

      sessionStorage.setItem(
        "sales-invoice",
        JSON.stringify(currentSalesInvoice)
      );

      handleMultipleDropdownForSalesInvoice(response.data);
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
      addNewRow.click();
    } catch (error) {
      console.log(error);
    }
  });

  searchModel("Search Sales Invoice", filterResults);
  addPagination(getSalesInvoices, createInvoiceTable, "No Sales Invoice found");
}

function filterResults(value) {
  if (value.length === 0) {
    addPagination(getSalesInvoices, createInvoiceTable, "No Invoices Found");
  }
  if (value.length >= 2) {
    addPagination(
      getSalesInvoices,
      createInvoiceTable,
      "No Invoices Found",
      value
    );
  }
}

export const handleFileDownload = async (id, oId, identifier) => {
  // console.log("downloading... ", fileName);
  console.log("down ", id);

  const currentInvoiceId = document.getElementById(id);
  console.log(" -> ", currentInvoiceId);
  currentInvoiceId.classList.add("download-disable");

  try {
    const binaryData = await downloadSalesInvoice(oId);

    const blobUrl = window.URL.createObjectURL(binaryData);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = blobUrl;
    a.download = identifier;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(blobUrl);
    document.body.removeChild(a);
  } catch (error) {
    console.log(error);
  } finally {
    currentInvoiceId.classList.remove("download-disable");
  }
};

const createInvoiceTable = async (invoices) => {
  console.log("all sales invoices", invoices);
  const invoiceTable = document.getElementsByClassName(
    "sales-invoice-table"
  )[0];
  invoiceTable.innerHTML = "";

  const table = createTableHeader([
    "Id",
    "Vendor Name",
    "reference",
    "Date",
    "Status",
    "Amount",
    "Invoice Document",
  ]);

  invoiceTable.appendChild(table);

  const tBody = document.createElement("tbody");
  tBody.classList.add("table-body");
  tBody.style.height = "330px";
  invoices.map((invoice) => {
    const row = document.createElement("tr");

    let div = document.createElement("td");
    div.innerHTML = invoice.identifier;
    row.appendChild(div);

    div = document.createElement("td");
    div.innerHTML = invoice.vendorName;
    row.appendChild(div);

    div = document.createElement("td");
    div.innerHTML = invoice.reference ? invoice.reference : "-";
    row.appendChild(div);

    div = document.createElement("td");
    div.innerHTML = invoice.dueDate;
    row.appendChild(div);

    div = document.createElement("td");
    div.innerHTML = invoice.status;
    row.appendChild(div);

    div = document.createElement("td");
    div.innerHTML = invoice.amount;
    row.appendChild(div);

    div = document.createElement("td");
    div.classList.add("align-center");

    const imageUrl = "/68688e7f23a16971620c.png"; // TEMP
    const currentId = "sales-invoice" + invoice.id;
    div.innerHTML = `<img id=${currentId} class="height-20 btn-clickable" src=${imageUrl} />`;
    const download_btn = div.getElementsByClassName("btn-clickable");
    download_btn[0].addEventListener("click", () =>
      handleFileDownload(
        "sales-invoice" + invoice.id,
        invoice.id,
        invoice.identifier
      )
    );
    row.appendChild(div);

    tBody.append(row);
  });

  table.appendChild(tBody);
};
