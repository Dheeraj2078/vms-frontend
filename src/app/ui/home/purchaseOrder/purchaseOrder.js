import purchaseOrderHtml from "../purchaseOrder/purchaseOrder.html";
import purchaseOrderFormHtml from "../../home/purchaseOrder/purchaseOrderForm/purchaseOrderForm.html";
import {
  handleCross,
  handleAddRurchaseOrder,
  handleMultipleDropdown,
  clearPurchaseOrderData,
} from "./purchaseOrderForm/purchaseOrderForm";
import { createItemsTable } from "./purchaseOrderForm/purchaseOrderForm";
import {
  goToPurchaseOrderUtil,
  goToRoute,
} from "../../../common/components/goToRoute";
import { createTableHeader } from "../../../common/components/table";
import { noDataAdded } from "../../../common/components/emptyData";
import { handleMultipleDropdownForPurchaseOrder } from "./purchaseOrderForm/purchaseOrderForm";
import { handleAddNewRow } from "./purchaseOrderForm/purchaseOrderItem";
import {
  downloadPurchaseOrder,
  getPoFormData,
  getPurchaseOrders,
} from "../../../service/purchaseOrder";
import { searchModel } from "../../../common/components/search";
import { addPagination } from "../../../common/components/pagination";
import { localStorageKeys } from "../../../util/constants";

export default async function goToPurchaseOrder() {
  sessionStorage.setItem("tab", "purchaseOrder");
  goToPurchaseOrderUtil(purchaseOrderHtml);

  const addButton = document.getElementById("add-button");

  const formOutput = document.getElementById("form-output");
  formOutput.innerHTML = "";
  clearPurchaseOrderData();

  addButton.addEventListener("click", async () => {
    // TEMP
    const homeRoot = document.querySelector("main");
    homeRoot.innerHTML = purchaseOrderFormHtml;

    const poTable = [];
    localStorage.setItem(localStorageKeys.poTableData, JSON.stringify(poTable));

    try {
      const response = await getPoFormData();
      const currentPurchaseOrder = response.data;

      sessionStorage.setItem(
        "purchase-order",
        JSON.stringify(currentPurchaseOrder)
      );

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

export const handleFileDownload = async (id, oId, identifier) => {
  // console.log("downloading... ", fileName);
  console.log("down ", id);

  const currentInvoiceId = document.getElementById(id);
  console.log(" -> ", currentInvoiceId);
  currentInvoiceId.classList.add("download-disable");

  try {
    const binaryData = await downloadPurchaseOrder(oId);

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
    "PO document",
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

    div = document.createElement("td");
    div.classList.add("align-center");

    const imageUrl = "/68688e7f23a16971620c.png"; // TEMP
    const purchaseOrderId = "purchase-order" + po.id;
    div.innerHTML = `<img id=${purchaseOrderId} class="height-20 btn-clickable" src=${imageUrl} />`;
    const download_btn = div.getElementsByClassName("btn-clickable");
    download_btn[0].addEventListener("click", () =>
      handleFileDownload("purchase-order" + po.id, po.id, po.identifier)
    );
    row.appendChild(div);

    tBody.appendChild(row);
  });

  table.appendChild(tBody);
};
