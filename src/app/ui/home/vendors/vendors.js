import vendorHtml from "../vendors/vendors.html";
import vendorFormHtml from "../vendors/vendorForm/vendorForm.html";
import {
  handleCross,
  handleMultipleDropdown,
  // handleAddVendor,
} from "./vendorForm/vendorForm.js";
import { createTableHeader } from "../../../common/components/table.js";
import {
  getAllVendors,
  getVendorStats,
  toggleVendorStatus,
} from "../../../service/vendorsApi.js";

import { vendorDetails } from "./vendorDetails/vendorDetails.js";
import { noDataAdded } from "../../../common/components/emptyData.js";
import { goToRoute } from "../../../common/components/goToRoute.js";
import { confirmationModal } from "../../../common/components/confirmationModal.js";
import { updateVendorModal } from "./vendorForm/vendorUpdateForm.js";
import { searchVendors } from "../../../service/searchApi.js";
import { addPagination } from "../../../common/components/pagination.js";
import { searchModel } from "../../../common/components/search";
import { changeVendorRoute, handleAddVendor } from "./vendorNav.js";
import { handleMultipleDropdownForOther } from "./vendorForm/otherDetails.js";

const getAllVendorsUtil = async () => {
  try {
    const vendors = await getAllVendors();
    return vendors.data;
  } catch (error) {
    console.log(error);
  }
};

export default async function goToVendor() {
  sessionStorage.setItem("tab", "vendor");
  goToRoute(vendorHtml, vendorFormHtml, handleCross, handleAddVendor);
  changeVendorRoute();
  // const search = document.getElementById("internal-search");
  // search.addEventListener("input", handleSearch);

  searchModel("Search Vendors", filterResults);

  // handleMultipleDropdown();
  // handleMultipleDropdownForOther();

  addPagination(getAllVendors, createVendorTable, "No Vendor Found"); // TEMP

  // const allVendors = await getAllVendorsUtil();
  // if (allVendors == null || allVendors.length == 0) {
  //   const addBtn = document.getElementById("add-button");
  //   const div = noDataAdded("Vendors", addBtn);
  //   const homeRoot = document.getElementsByClassName("container")[0];
  //   homeRoot.innerHTML = "";
  //   homeRoot.appendChild(div);
  // } else {
  //   createVendorTable(allVendors);
  // }
}

const toggleStatus = async (id) => {
  console.log("toggle", id);

  try {
    const res = await toggleVendorStatus(id);
    console.log("toogle 2", res);
    return res;
  } catch (error) {
    console.log(error);
  }

  // goToVendor();
  // createVendorTable(res);
};

const handleToggleStatue = (status, id) => {
  // const id = e.currentTarget.id;
  console.log("status", status);
  console.log("id", id);
  let question = "Are you sure you want to re-activate this vendor ?";
  if (status) {
    question = "Are you sure you want to deactivate this vendor ?";
  }

  const showError = () => {
    // const errorMessage = document.getElementsByClassName("error-message")[0];
    // errorMessage.classList.remove("hidden");
  };

  const successModalMessage = "Status updated";

  const reply = confirmationModal(
    question,
    () => toggleStatus(id),
    handleCross,
    showError,
    successModalMessage
  );
  console.log("reply", reply);
};

const showModalOnClick = (column, value) => {
  // console.log("CLICKED, ", value);
  column.addEventListener("click", vendorDetails);
  column.id = value.vendorId;
};

const getMoreRows = (table, lastOrgDiv, vendorDetail) => {
  let cIdsArr = vendorDetail.categories;
  let currentVendorDetails = vendorDetail;

  const cIds = cIdsArr.slice(1);

  // const tBody = document.createElement("tbody");
  cIds.map((cId) => {
    lastOrgDiv.classList.add("border-bottom-none");
    const row = document.createElement("tr");
    row.addEventListener("click", vendorDetails);
    row.id = currentVendorDetails.id;

    let orgDiv = document.createElement("td");
    orgDiv.innerHTML = "";
    orgDiv.classList.add("cursor-pointer");
    row.appendChild(orgDiv);
    lastOrgDiv = orgDiv;

    let div = document.createElement("td");
    div.innerHTML = currentVendorDetails.type;
    div.classList.add("cursor-pointer");
    row.appendChild(div);

    div = document.createElement("td");
    div.innerHTML = cId;
    div.classList.add("cursor-pointer");
    row.appendChild(div);

    div = document.createElement("td");
    if (currentVendorDetails.primaryContact) {
      div.innerHTML = currentVendorDetails.primaryContact.firstName;
    } else {
      div.innerHTML = "-";
    }
    div.classList.add("cursor-pointer");
    row.appendChild(div);

    div = document.createElement("td");
    if (currentVendorDetails.primaryContact) {
      div.innerHTML = currentVendorDetails.primaryContact.workPhone;
    } else {
      div.innerHTML = "-";
    }
    div.classList.add("cursor-pointer");
    row.appendChild(div);

    div = document.createElement("td");
    div.innerHTML = currentVendorDetails.gstin;
    div.classList.add("cursor-pointer");
    row.appendChild(div);

    div = document.createElement("td");
    // div.addEventListener("click", toggleStatus);
    div.id = currentVendorDetails.id;
    // div.innerHTML = currentVendorDetails.status;
    row.appendChild(div);
    table.appendChild(row);
  });

  // table.appendChild(tBody);
};

function filterResults(value) {
  if (value.length === 0) {
    addPagination(getAllVendors, createVendorTable, "No Vendor Found");
  }
  if (value.length >= 2) {
    console.log("searching", value);
    addPagination(getAllVendors, createVendorTable, "No Vendor Found", value);
  }
}

const createVendorTable = async (vendorsDetailsInfo) => {
  console.log("creating vendor table ->->", vendorsDetailsInfo);
  const vendorTable = document.getElementsByClassName("vendor-table")[0];
  vendorTable.innerHTML = "";

  const table = createTableHeader([
    "Organization Name",
    "Vendor Type",
    "Category",
    "Contact Name",
    "Contact Number",
    "GST",
    "Action",
  ]);

  // const vendorsDetails = await getAllVendorsUtil();

  const tBody = document.createElement("tbody");
  tBody.classList.add("table-body");
  tBody.style.height = "158px";
  for (let vendorDetail of vendorsDetailsInfo) {
    const row = document.createElement("tr");
    let OrgDiv = document.createElement("td");
    OrgDiv.innerHTML = vendorDetail.companyName;
    OrgDiv.classList.add("cursor-pointer");
    row.appendChild(OrgDiv);
    showModalOnClick(OrgDiv, vendorDetail);

    let div = document.createElement("td");
    div.innerHTML = vendorDetail.type;
    div.classList.add("cursor-pointer");
    row.appendChild(div);
    showModalOnClick(div, vendorDetail);

    div = document.createElement("td");
    const categoryInfo = vendorDetail.categories[0];
    div.innerHTML = categoryInfo;
    div.classList.add("cursor-pointer");
    row.appendChild(div);
    showModalOnClick(div, vendorDetail);

    div = document.createElement("td");
    if (vendorDetail.primaryContact) {
      div.innerHTML = vendorDetail.primaryContact.firstName;
    } else {
      div.innerHTML = "-";
    }
    div.classList.add("cursor-pointer");
    row.appendChild(div);
    showModalOnClick(div, vendorDetail);

    div = document.createElement("td");
    if (vendorDetail.primaryContact) {
      div.innerHTML = vendorDetail.primaryContact.mobilePhone;
    } else {
      div.innerHTML = "-";
    }
    div.classList.add("cursor-pointer");
    row.appendChild(div);
    showModalOnClick(div, vendorDetail);

    div = document.createElement("td");
    div.innerHTML = vendorDetail.gstin;
    div.classList.add("cursor-pointer");
    row.appendChild(div);
    showModalOnClick(div, vendorDetail);

    // action
    let active = "/fc364e677a0ec292045d.png"; // TEMP
    const statusToggle = document.createElement("div");
    statusToggle.addEventListener("click", () =>
      handleToggleStatue(vendorDetail.status, vendorDetail.vendorId)
    );
    // statusToggle.id = vendorDetail.item1.id;
    statusToggle.innerHTML = `<img class="height-20 btn-clickable" src=${active} />`;

    active = "/f98d92a34b2133068786.png";
    if (!vendorDetail.status) {
      statusToggle.innerHTML = `<img class="height-20 btn-clickable" src=${active} />`;
    }

    const editIcon = document.createElement("div");
    editIcon.innerHTML = `<img class="height-20 btn-clickable" src="/9a16a6f5e2a3c69ec1a9.png" />`; // TEMP
    editIcon.addEventListener("click", () => updateVendorModal(vendorDetail));

    div = document.createElement("td");
    div.classList.add("vendor-actions");
    div.appendChild(editIcon);
    div.appendChild(statusToggle);

    row.appendChild(div);
    tBody.appendChild(row);

    getMoreRows(tBody, OrgDiv, vendorDetail);
  }

  table.appendChild(tBody);

  vendorTable.appendChild(table);

  populateVendorStats();
};

const populateVendorStats = async () => {
  try {
    const invoiceStats = await getVendorStats();
    console.log("SHOW INVOICE STATS", invoiceStats);
    const invoiceStatsData = invoiceStats.data;
    console.log(invoiceStatsData.inactive);

    let activeVendorsCount = invoiceStatsData.active;
    let inActiveVectorsCount = invoiceStatsData.inactive;
    let totalVendorsCount = inActiveVectorsCount + activeVendorsCount;

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
