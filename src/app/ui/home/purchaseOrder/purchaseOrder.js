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

  searchModel("Search Purchase Order", filterResults);
  addPagination(
    getPurchaseOrders,
    createPurchaseOrderTable,
    "No purchase Order found"
  );
}

function filterResults(value) {
  if (value.length === 0) {
    addPagination(
      getPurchaseOrders,
      createPurchaseOrderTable,
      "No purchase Order found"
    );
  }
  if (value.length >= 2) {
    addPagination(
      getPurchaseOrders,
      createPurchaseOrderTable,
      "No purchase Order found",
      value
    );
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
