import invoiceHtml from "../invoice/invoice.html";
import invoiceFormHtml from "../../home/invoice/invoiceForm/invoiceForm.html";
import {
  handleCross,
  handleAddInvoice,
  handleMultipleDropdown,
} from "./invoiceForm/invoiceForm";
// import { getAdmins } from "../../../service/admins";
// import { createTableHeader } from "../../../common/components/table";
// import { noDataAdded } from "../../../common/components/emptyData";
import { goToRoute } from "../../../common/components/goToRoute";
import { getAllInvoice, getInvoiceStats } from "../../../service/invoiceApi";
import { createTableHeader } from "../../../common/components/table";
import { noDataAdded } from "../../../common/components/emptyData";
import { handleFileDownload } from "../contract/contract";
import { searchInvoices } from "../../../service/searchApi";
import { addPagination } from "../../../common/components/pagination";

const getInvoices = async () => {
  try {
    const res = await getAllInvoice(1, 100);
    console.log("get me all", res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export default async function goToInvoice() {
  sessionStorage.setItem("tab", "invoice");
  goToRoute(invoiceHtml, invoiceFormHtml, handleCross, handleAddInvoice);

  const search = document.getElementById("internal-search");
  search.addEventListener("input", handleSearch);
  handleMultipleDropdown();

  addPagination(getAllInvoice, createInvoiceTable);

  // const allInvoices = await getInvoices();
  // if (allInvoices == null || allInvoices.length == 0) {
  //   const addBtn = document.getElementById("add-button");
  //   const div = noDataAdded("Invoices", addBtn);
  //   const homeRoot = document.getElementsByClassName("container")[0];
  //   homeRoot.innerHTML = "";
  //   homeRoot.appendChild(div);
  // } else {
  //   createInvoiceTable(allInvoices);
  // }
}

const handleSearch = async (e) => {
  const value = e.target.value;
  if (value.length === 0) {
    addPagination(getAllInvoice, createInvoiceTable);
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
    addPagination(getAllInvoice, createInvoiceTable, value);
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
};

const createInvoiceTable = async (invoices) => {
  const invoiceTable = document.getElementsByClassName("invoice-table")[0];
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

    table.appendChild(row);
  });

  populateInvoiceStats();
};

const populateInvoiceStats = async () => {
  try {
    const invoiceStats = await getInvoiceStats();
    const invoiceStatsData = invoiceStats.data;

    let totalVendorsCount = invoiceStatsData.total;
    let activeVendorsCount = invoiceStatsData.active,
      inActiveVectorsCount = totalVendorsCount - activeVendorsCount;

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
