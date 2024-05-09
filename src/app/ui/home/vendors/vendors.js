import vendorHtml from "../vendors/vendors.html";
import vendorFormHtml from "../vendors/vendorFrom/vendorForm.html";
import {
  handleCross,
  handleMultipleDropdown,
  handleAddVendor,
} from "./vendorFrom/vendorForm.js";
import { createTableHeader } from "../../../common/components/table.js";
import {
  getAllVendors,
  toggleVendorStatus,
} from "../../../service/vendorsApi.js";
import { vendorDetails } from "./vendorDetails/vendorDetails.js";
import { noDataAdded } from "../../../common/components/emptyData.js";
import { goToRoute } from "../../../common/components/goToRoute.js";
import { confirmationModal } from "../../../common/components/confirmationModal.js";
import { updateVendorModal } from "./vendorFrom/vendorUpdateForm.js";
import { searchVendors } from "../../../service/searchApi.js";
import { addPagination } from "../../../common/components/pagination.js";

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

  const search = document.getElementById("internal-search");
  search.addEventListener("input", handleSearch);

  handleMultipleDropdown();

  addPagination(getAllVendors, createVendorTable);

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

  const successModalMessage = "Status Updated";

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
  column.addEventListener("click", vendorDetails);
  column.id = value.id;
};

const getMoreRows = (table, lastOrgDiv, vendorDetail) => {
  let cIdsArr = vendorDetail.item2;
  let currentVendorDetails = vendorDetail.item1;

  const cIds = cIdsArr.slice(1);
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
    div.innerHTML = currentVendorDetails.vendorType.name;
    div.classList.add("cursor-pointer");
    row.appendChild(div);

    div = document.createElement("td");
    div.innerHTML = cId;
    div.classList.add("cursor-pointer");
    row.appendChild(div);

    div = document.createElement("td");
    div.innerHTML = currentVendorDetails.contactPersonName;
    div.classList.add("cursor-pointer");
    row.appendChild(div);

    div = document.createElement("td");
    div.innerHTML = currentVendorDetails.contactPersonNumber;
    div.classList.add("cursor-pointer");
    row.appendChild(div);

    div = document.createElement("td");
    div.innerHTML = currentVendorDetails.relationshipDuration;
    div.classList.add("cursor-pointer");
    row.appendChild(div);

    div = document.createElement("td");
    // div.addEventListener("click", toggleStatus);
    div.id = currentVendorDetails.id;
    // div.innerHTML = currentVendorDetails.status;
    row.appendChild(div);
    table.appendChild(row);
  });
};

const handleSearch = async (e) => {
  const value = e.target.value;
  if (value.length === 0) {
    const allContracts = await getAllVendorsUtil();
    if (allContracts == null || allContracts.length == 0) {
      const contactTable = document.getElementsByClassName("vendor-table")[0];
      contactTable.innerHTML = `<h4>No Result Found for "${value}"`;
    } else {
      const contracts = allContracts;
      createVendorTable(contracts);
    }
  }
  if (value.length >= 2) {
    const contractsData = await searchVendors(value);

    if (contractsData.data == null || contractsData.data.length == 0) {
      // showEmptyPage();
      const contactTable = document.getElementsByClassName("vendor-table")[0];
      contactTable.innerHTML = `<h4>No Result Found for "${value}"`;
    } else {
      const contracts = contractsData.data;
      console.log(contracts);
      createVendorTable(contracts);
    }
  }
};

const createVendorTable = async (vendorsDetails) => {
  const vendorTable = document.getElementsByClassName("vendor-table")[0];
  vendorTable.innerHTML = "";

  const table = createTableHeader([
    "Organization Name",
    "Vendor Type",
    "Category",
    "Contact Name",
    "Contact Number",
    "Duration",
    "Action",
  ]);

  // const vendorsDetails = await getAllVendorsUtil();

  for (let vendorDetail of vendorsDetails) {
    const row = document.createElement("tr");
    let OrgDiv = document.createElement("td");
    OrgDiv.innerHTML = vendorDetail.item1.organizationName;
    OrgDiv.classList.add("cursor-pointer");
    row.appendChild(OrgDiv);
    showModalOnClick(OrgDiv, vendorDetail.item1);

    let div = document.createElement("td");
    div.innerHTML = vendorDetail.item1.vendorType.name;
    div.classList.add("cursor-pointer");
    row.appendChild(div);
    showModalOnClick(div, vendorDetail.item1);

    div = document.createElement("td");
    const categoryInfo = vendorDetail.item2[0];
    div.innerHTML = categoryInfo;
    div.classList.add("cursor-pointer");
    row.appendChild(div);
    showModalOnClick(div, vendorDetail.item1);

    div = document.createElement("td");
    div.innerHTML = vendorDetail.item1.contactPersonName;
    div.classList.add("cursor-pointer");
    row.appendChild(div);
    showModalOnClick(div, vendorDetail.item1);

    div = document.createElement("td");
    div.innerHTML = vendorDetail.item1.contactPersonNumber;
    div.classList.add("cursor-pointer");
    row.appendChild(div);
    showModalOnClick(div, vendorDetail.item1);

    div = document.createElement("td");
    div.innerHTML = vendorDetail.item1.relationshipDuration;
    div.classList.add("cursor-pointer");
    row.appendChild(div);
    showModalOnClick(div, vendorDetail.item1);

    // action
    let active = "/fc364e677a0ec292045d.png"; // TEMP
    const statusToggle = document.createElement("div");
    statusToggle.addEventListener("click", () =>
      handleToggleStatue(vendorDetail.item1.status, vendorDetail.item1.id)
    );
    // statusToggle.id = vendorDetail.item1.id;
    statusToggle.innerHTML = `<img class="height-20 btn-clickable" src=${active} />`;

    active = "/f98d92a34b2133068786.png"; // TEMP
    if (!vendorDetail.item1.status) {
      statusToggle.innerHTML = `<img class="height-20 btn-clickable" src=${active} />`;
    }

    const editIcon = document.createElement("div");
    editIcon.innerHTML = `<img class="height-20 btn-clickable" src="/9a16a6f5e2a3c69ec1a9.png" />`; // TEMP
    console.log("dddd", vendorDetail);
    editIcon.addEventListener("click", () => updateVendorModal(vendorDetail));

    div = document.createElement("td");
    div.classList.add("vendor-actions");
    div.appendChild(editIcon);
    div.appendChild(statusToggle);

    row.appendChild(div);
    table.appendChild(row);

    getMoreRows(table, OrgDiv, vendorDetail);
  }

  vendorTable.appendChild(table);

  populateVendorStatus(vendorsDetails);
};

const populateVendorStatus = (vendorsDetailsArr) => {
  console.log("arr", vendorsDetailsArr);
  let activeVendorsCount = 0,
    inActiveVectorsCount = 0;
  for (let vendorDetail of vendorsDetailsArr) {
    if (vendorDetail.item1.status == true) {
      activeVendorsCount += 1;
    } else {
      inActiveVectorsCount += 1;
    }
  }

  let totalVendorsCount = vendorsDetailsArr.length;

  const totalVendors = document.getElementById("total-vendors");
  totalVendors.innerHTML = totalVendorsCount;

  const activeVendors = document.getElementById("active-vendors");
  activeVendors.innerHTML = activeVendorsCount;

  const inActiveVendors = document.getElementById("inactive-vendors");
  inActiveVendors.innerHTML = inActiveVectorsCount;
};
