import purchaseOrderHtml from "../purchaseOrder/purchaseOrder.html";
import purchaseOrderFormHtml from "../../home/purchaseOrder/purchaseOrderForm/purchaseOrderForm.html";
import {
  handleCross,
  handleAddRurchaseOrder,
  handleMultipleDropdown,
} from "./purchaseOrderForm/purchaseOrderForm";
import { createItemsTable } from "./purchaseOrderForm/purchaseOrderForm";
import {
  goToPurchaseOrderUtil,
  goToRoute,
} from "../../../common/components/goToRoute";
import { getAllInvoice } from "../../../service/invoiceApi";
import { createTableHeader } from "../../../common/components/table";
import { noDataAdded } from "../../../common/components/emptyData";
import { handleFileDownload } from "../contract/contract";
import { searchInvoices } from "../../../service/searchApi";
import { handleMultipleDropdownForPurchaseOrder } from "./purchaseOrderForm/purchaseOrderForm";
import { handleAddNewRow } from "./purchaseOrderForm/purchaseOrderItem";
import {
  getPoFormData,
  getPurchaseOrders,
} from "../../../service/purchaseOrder";
import { searchModel } from "../../../common/components/search";
import { addPagination } from "../../../common/components/pagination";

const getAllPurchaseOrder = async () => {
  try {
    const res = await getPurchaseOrders(1, 100);
    console.log("get me all", res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export default async function goToPurchaseOrder() {
  sessionStorage.setItem("tab", "purchaseOrder");
  goToPurchaseOrderUtil(purchaseOrderHtml);

  const addButton = document.getElementById("add-button");

  addButton.addEventListener("click", async () => {
    // TEMP
    const homeRoot = document.querySelector("main");
    homeRoot.innerHTML = purchaseOrderFormHtml;

    const poTable = [];
    localStorage.setItem("poTableData", JSON.stringify(poTable));

    try {
      const response = await getPoFormData();

      handleMultipleDropdownForPurchaseOrder(response.data);
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

  // createItemsTable();

  searchModel("Search Purchase Order", filterResults);
  addPagination(
    getPurchaseOrders,
    createPurchaseOrderTable,
    "No purchase Order found"
  );

  // const search = document.getElementById("internal-search");
  // console.log("search", search);
  // search.addEventListener("input", handleSearch);
  //   handleMultipleDropdown();

  //   const allInvoices = await getInvoices();
  //   if (allInvoices == null || allInvoices.length == 0) {
  //     const addBtn = document.getElementById("add-button");
  //     const div = noDataAdded("Invoices", addBtn);
  //     const homeRoot = document.getElementsByClassName("container")[0];
  //     homeRoot.innerHTML = "";
  //     homeRoot.appendChild(div);
  //   } else {
  //     createInvoiceTable(allInvoices);
  //   }
}

function filterResults(value) {
  if (value.length === 0) {
    addPagination(
      getPurchaseOrders,
      createPurchaseOrderTable,
      "No purchase Order found"
    );
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
      getPurchaseOrders,
      createPurchaseOrderTable,
      "No purchase Order found",
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

const createPurchaseOrderTable = async (purchaseOrder) => {
  const poTable = document.getElementsByClassName("purchase-order-table")[0];
  poTable.innerHTML = "";

  const table = createTableHeader([
    "Id",
    "Vendor Name",
    "reference",
    "Date",
    "Status",
    "Amount",
  ]);

  poTable.appendChild(table);

  const tBody = document.createElement("tbody");
  tBody.classList.add("table-body");
  tBody.style.height = "330px";
  purchaseOrder.map((po) => {
    const row = document.createElement("tr");

    let div = document.createElement("td");
    div.innerHTML = po.identifier;
    row.appendChild(div);

    div = document.createElement("td");
    div.innerHTML = po.vendorName;
    row.appendChild(div);

    div = document.createElement("td");
    div.innerHTML = po.reference ? po.reference : "-";
    row.appendChild(div);

    div = document.createElement("td");
    div.innerHTML = po.createdDate;
    row.appendChild(div);

    div = document.createElement("td");
    div.innerHTML = po.status;
    row.appendChild(div);

    div = document.createElement("td");
    div.innerHTML = po.amount;
    row.appendChild(div);

    // div = document.createElement("td");
    // div.innerHTML = invoice.status;
    // row.appendChild(div);
    // div = document.createElement("td");
    // const innerdiv = document.createElement("div");
    // innerdiv.classList.add("status");
    // if (invoice.status) {
    //   innerdiv.innerHTML = "Paid";
    //   innerdiv.classList.add("active");
    // } else {
    //   innerdiv.innerHTML = "Pending";
    //   innerdiv.classList.add("inactive");
    // }
    // div.appendChild(innerdiv);
    // row.appendChild(div);

    // div = document.createElement("td");
    // div.classList.add("align-center");

    // const imageUrl = "/68688e7f23a16971620c.png"; // TEMP
    // const invoiceId = "invoice" + invoice.id;
    // div.innerHTML = `<img id=${invoiceId} class="height-20 btn-clickable" src=${imageUrl} />`;
    // const download_btn = div.getElementsByClassName("btn-clickable");
    // download_btn[0].addEventListener("click", () =>
    //   handleFileDownload(invoice.fileName, "invoice" + invoice.id)
    // );
    // row.appendChild(div);

    tBody.appendChild(row);
  });

  table.appendChild(tBody);
};
