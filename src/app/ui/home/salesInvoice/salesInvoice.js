import salesInvoiceFormHtml from "./salesInvoiceForm/salesInvoiceForm.html";

import {
  getInvoiceStats,
  getSalesInvoiceFormData,
  getSalesInvoices,
} from "../../../service/invoiceApi";

import { createTableHeader } from "../../../common/components/table";
import { noDataAdded } from "../../../common/components/emptyData";
import { handleFileDownload } from "../contract/contract";
import { searchInvoices } from "../../../service/searchApi";
import { addPagination } from "../../../common/components/pagination";
import { searchModel } from "../../../common/components/search";
import { handleMultipleDropdownForSalesInvoice } from "./salesInvoiceForm/salesInvoiceForm";
import { handleAddNewRow } from "./salesInvoiceForm/salesInvoiceItem";

export default async function goToSalesInvoice() {
  const addButton = document.getElementById("add-button");
  addButton.addEventListener("click", async () => {
    const homeRoot = document.querySelector("main");
    homeRoot.innerHTML = salesInvoiceFormHtml;

    const invoiceTable = [];
    localStorage.setItem("invoiceTableData", JSON.stringify(invoiceTable));

    try {
      const response = await getSalesInvoiceFormData();

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
  ]);

  invoiceTable.appendChild(table);

  const tBody = document.createElement("tbody");
  tBody.classList.add("table-body");
  tBody.style.height = "158px";
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

    tBody.append(row);
  });

  table.appendChild(tBody);
};
