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
import { searchModel } from "../../../common/components/search";
import salesInvoiceHtml from "../salesInvoice/salesInvoice.html";
import goToSalesInvoice from "../salesInvoice/salesInvoice";
import { saveSignature } from "../../../service/dashboard";
import signatureHtml from "./signature.html";
import { getCurrentUserInfo } from "../../../util/util";
import { role } from "../../../util/constants";

export default async function goToInvoice() {
  sessionStorage.setItem("tab", "invoice");
  goToRoute(invoiceHtml, invoiceFormHtml, handleCross, handleAddInvoice);

  populateInvoiceStats();
  // const search = document.getElementById("internal-search");
  // search.addEventListener("input", handleSearch);

  searchModel("Search Invoices", filterResults);
  handleMultipleDropdown();

  addPagination(getAllInvoice, createInvoiceTable, "No Invoices Found");

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

  const addSalesInvoice = document.getElementById("add-sales-invoice");
  addSalesInvoice.addEventListener("click", (e) => {
    // IN-TEMP
    const homeRoot = document.querySelector("main");
    console.log(homeRoot);
    homeRoot.innerHTML = salesInvoiceHtml;
    goToSalesInvoice();
  });

  addSignature();
}

// const handleSearch = async (e) => {
//   const value = e.target.value;

// };

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

export const addSignature = () => {
  const signatureBtn = document.getElementById("signature-btn");
  console.log("signatureBtn:", signatureBtn);
  const info = getCurrentUserInfo();
  if (info.role == role.admin) {
    signatureBtn.classList.add("hidden");
  }

  signatureBtn.addEventListener("click", (e) => {
    console.log("Signature button clicked");
    const vendorFormOutput = document.getElementById("form-output");
    vendorFormOutput.classList.remove("hidden");
    vendorFormOutput.innerHTML = signatureHtml;
    takeSignature();
    changeBackgroundOnModal();

    const vendorFormCross = document.getElementById("form-cross");
    vendorFormCross.addEventListener("click", (e) => {
      handleCross2();
    });
  });
};

const takeSignature = () => {
  console.log("takeSignature: called");
  const canvas = document.getElementById("signature-pad");
  const ctx = canvas ? canvas.getContext("2d") : null;
  console.log("ctx", ctx);

  if (!canvas || !ctx) {
    console.error("Canvas or context not found");
    return;
  }

  let drawing = false;

  // Function to resize the canvas to be fully responsive
  function resizeCanvas() {
    console.log("Resizing canvas");
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    ctx.putImageData(data, 0, 0);
  }

  // Resize canvas on window resize
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  // Get the correct mouse position
  function getMousePos(canvas, event) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  }

  // Draw on the canvas
  canvas.addEventListener("mousedown", (event) => {
    console.log("mousedown event");
    drawing = true;
    ctx.beginPath();
    const pos = getMousePos(canvas, event);
    ctx.moveTo(pos.x, pos.y);
  });

  canvas.addEventListener("mouseup", () => {
    drawing = false;
  });

  canvas.addEventListener("mousemove", (event) => {
    if (drawing) {
      console.log("mousemove event");
      const pos = getMousePos(canvas, event);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    }
  });

  // Save the signature
  document
    .getElementById("save-signature")
    .addEventListener("click", async () => {
      console.log("Save signature button clicked");
      const dataURL = canvas.toDataURL();
      // document.getElementById("saved-signature").src = dataURL;
      // document.getElementById("saved-signature").style.display = "block";
      // localStorage.setItem("userSignature", dataURL);
      const res = await saveSignature(dataURL);
      console.log("save signature", res);

      // POST API CALL;
      handleCross2();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

  document
    .getElementById("upload-signature")
    .addEventListener("change", (event) => {
      console.log("Upload signature file selected");
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = new Image();
          img.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0); // Draw the uploaded image onto the canvas
          };
          img.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    });

  // Clear the signature
  document.getElementById("clear-signature").addEventListener("click", () => {
    console.log("Clear signature button clicked");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
  });
};

export const changeBackgroundOnModal = () => {
  const mainContainer = document.getElementsByClassName("main-container")[0];
  mainContainer.classList.add("blur-background");
  // document.body.classList.add("overflow-hidden");
};

const handleCross2 = () => {
  const vendorFormOutput = document.getElementById("form-output");
  vendorFormOutput.classList.add("hidden");

  const mainContainer = document.getElementsByClassName("main-container")[0];
  mainContainer.classList.remove("blur-background");
  document.body.classList.remove("overflow-hidden");
};
