import salesInvoiceFormHtml from "./salesInvoiceForm/salesInvoiceForm.html";

import { getAllInvoice, getInvoiceStats } from "../../../service/invoiceApi";
import { createTableHeader } from "../../../common/components/table";
import { noDataAdded } from "../../../common/components/emptyData";
import { handleFileDownload } from "../contract/contract";
import { searchInvoices } from "../../../service/searchApi";
import { addPagination } from "../../../common/components/pagination";
import { searchModel } from "../../../common/components/search";
import {
  getPoFormData,
  getPurchaseOrders,
} from "../../../service/purchaseOrder";
import { handleMultipleDropdownForSalesInvoice } from "./salesInvoiceForm/salesInvoiceForm";
import { handleAddNewRow } from "./salesInvoiceForm/salesInvoiceItem";

export default async function goToSalesInvoice() {
  console.log("inside sales invoice");

  const addButton = document.getElementById("add-button");
  addButton.addEventListener("click", async () => {
    // TEMP
    const homeRoot = document.querySelector("main");
    homeRoot.innerHTML = salesInvoiceFormHtml;

    const invoiceTable = [];
    localStorage.setItem("invoiceTableData", JSON.stringify(invoiceTable));

    try {
      const response = await getPoFormData();

      handleMultipleDropdownForSalesInvoice(response.data);
      const addNewRow = document.getElementById("po-add-row");
      const data = {
        itemDetail: "",
        itemAccount: "",
        quantity: "0.0",
        rate: "",
        tax: "",
      };
      addNewRow.addEventListener("click", () => handleAddNewRow(data));

      addNewRow.click();
    } catch (error) {
      console.log(error);
    }
  });

  searchModel("Search Sales Invoice", filterResults);
  addPagination(
    getPurchaseOrders,
    createInvoiceTable,
    "No Sales Invoice found"
  );
}

function filterResults(value) {
  if (value.length === 0) {
    addPagination(getAllInvoice, createInvoiceTable, "No Invoices Found");
    // const allContracts = await getInvoices();
    // if (allContracts == null || allContracts.length == 0) {
    //   const contactTable = document.getElementsByClassName("invoice-table")[0];
    //   contactTable.innerHTML = `<h4>No Result Found for "${value}"`;
    // } else {
    //   const contracts = allContracts;
    //   createInvoiceTable(contracts);
    // }
  }
  if (value.length >= 2) {
    addPagination(
      getAllInvoice,
      createInvoiceTable,
      "No Invoices Found",
      value
    );
    // const contractsData = await searchInvoices(value);

    // if (contractsData.data == null || contractsData.data.length == 0) {
    //   // showEmptyPage();
    //   const contactTable = document.getElementsByClassName("invoice-table")[0];
    //   contactTable.innerHTML = `<h4>No Result Found for "${value}"`;
    // } else {
    //   const contracts = contractsData.data;
    //   console.log(contracts);
    //   createInvoiceTable(contracts);
    // }
  }
}

const createInvoiceTable = async (invoices) => {
  console.log("all invoices", invoices);
  const invoiceTable = document.getElementsByClassName(
    "sales-invoice-table"
  )[0];
  invoiceTable.innerHTML = "";

  const table = createTableHeader([
    "Vendor Name",
    "Person Name",
    "Category",
    "Email",
    "Amount",
    "Due Date",
    "Status",
    "Invoice Document",
  ]);

  invoiceTable.appendChild(table);

  // console.log(",,,", contracts);

  // const invoices = await getInvoices();
  const tBody = document.createElement("tbody");
  tBody.classList.add("table-body");
  tBody.style.height = "158px";
  invoices.map((invoice) => {
    const row = document.createElement("tr");

    let div = document.createElement("td");
    div.innerHTML = invoice.organizationName;
    row.appendChild(div);

    div = document.createElement("td");
    div.innerHTML = invoice.contactPersonName;
    row.appendChild(div);

    div = document.createElement("td");
    div.innerHTML = invoice.categoryName;
    row.appendChild(div);

    div = document.createElement("td");
    div.innerHTML = invoice.contactPersonEmail;
    row.appendChild(div);

    div = document.createElement("td");
    div.innerHTML = invoice.amount;
    row.appendChild(div);

    div = document.createElement("td");
    div.innerHTML = invoice.dueDate;
    row.appendChild(div);

    // div = document.createElement("td");
    // div.innerHTML = invoice.status;
    // row.appendChild(div);
    div = document.createElement("td");
    const innerdiv = document.createElement("div");
    innerdiv.classList.add("status");
    if (invoice.status) {
      innerdiv.innerHTML = "Paid";
      innerdiv.classList.add("active");
    } else {
      innerdiv.innerHTML = "Pending";
      innerdiv.classList.add("inactive");
    }
    div.appendChild(innerdiv);
    row.appendChild(div);

    div = document.createElement("td");
    div.classList.add("align-center");

    const imageUrl = "/68688e7f23a16971620c.png"; // TEMP
    const invoiceId = "invoice" + invoice.id;
    div.innerHTML = `<img id=${invoiceId} class="height-20 btn-clickable" src=${imageUrl} />`;
    const download_btn = div.getElementsByClassName("btn-clickable");
    download_btn[0].addEventListener("click", () =>
      handleFileDownload(invoice.fileName, "invoice" + invoice.id)
    );
    row.appendChild(div);

    // table.appendChild(row);
    tBody.append(row);
  });

  table.appendChild(tBody);
};

const populateInvoiceStats = async () => {
  try {
    const invoiceStats = await getInvoiceStats();
    const invoiceStatsData = invoiceStats.data;
    console.log("MDDDMDMD", invoiceStatsData);

    let activeVendorsCount = invoiceStatsData.active;
    let inActiveVectorsCount = invoiceStatsData.inactive;
    let totalVendorsCount = activeVendorsCount + inActiveVectorsCount;

    const totalVendors = document.getElementById("total-vendors");
    totalVendors.innerHTML = totalVendorsCount;

    const activeVendors = document.getElementById("active-vendors");
    activeVendors.innerHTML = activeVendorsCount;

    const inActiveVendors = document.getElementById("inactive-vendors");
    inActiveVendors.innerHTML = inActiveVectorsCount;
  } catch (error) {
    console.log(error);
  }
};
