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

const getAllVendorsUtil = async () => {
  try {
    const vendors = await getAllVendors();
    return vendors.data;
  } catch (error) {
    console.log(error);
  }
};

export default async function goToVendor() {
  goToRoute(vendorHtml, vendorFormHtml, handleCross, handleAddVendor);
  handleMultipleDropdown();
  createVendorTable();

  const allVendors = await getAllVendorsUtil();
  if (allVendors == null || allVendors.length == 0) {
    const addBtn = document.getElementById("add-button");
    const div = noDataAdded("Vendors", addBtn);
    console.log("div", div);
    console.log("homeRoot", homeRoot);
    homeRoot.innerHTML = "";
    homeRoot.appendChild(div);
  }
}

const toggleStatus = async (e) => {
  const id = e.currentTarget.id;

  try {
    const res = await toggleVendorStatus(id);
    console.log("toogle", res);
  } catch (error) {
    console.log(error);
  }

  // goToVendor();
  createVendorTable();
};

const showModalOnClick = (column, value) => {
  column.addEventListener("click", vendorDetails);
  column.id = value.id;
};

let vendorIdToCategoriesId = new Map();
let vendorIdToVendorDetail = new Map();
let categoryIdToCategoryDetail = new Map();
const getMoreRows = (vId, table, lastOrgDiv) => {
  let cIds = vendorIdToCategoriesId.get(vId);
  let currentVendorDetails = vendorIdToVendorDetail.get(vId);

  cIds.shift();
  cIds.map((cId) => {
    lastOrgDiv.classList.add("border-bottom-none");
    const row = document.createElement("tr");
    row.addEventListener("click", vendorDetails);
    row.id = currentVendorDetails.id;

    let orgDiv = document.createElement("td");
    orgDiv.innerHTML = "";
    row.appendChild(orgDiv);
    lastOrgDiv = orgDiv;

    let div = document.createElement("td");
    div.innerHTML = currentVendorDetails.vendorType.name;
    row.appendChild(div);

    div = document.createElement("td");
    const categoryInfo = categoryIdToCategoryDetail.get(cId);
    div.innerHTML = categoryInfo.name;
    row.appendChild(div);

    div = document.createElement("td");
    div.innerHTML = currentVendorDetails.contactPersonName;
    row.appendChild(div);

    div = document.createElement("td");
    div.innerHTML = currentVendorDetails.contactPersonNumber;
    row.appendChild(div);

    div = document.createElement("td");
    div.innerHTML = currentVendorDetails.relationshipDuration;
    row.appendChild(div);

    div = document.createElement("td");
    // div.addEventListener("click", toggleStatus);
    div.id = currentVendorDetails.id;
    // div.innerHTML = currentVendorDetails.status;
    row.appendChild(div);
    table.appendChild(row);
  });
};

const createVendorTable = async () => {
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

  const vendors = await getAllVendorsUtil();

  vendorIdToCategoriesId = new Map();
  vendorIdToVendorDetail = new Map();
  categoryIdToCategoryDetail = new Map();
  vendors.map((vendor) => {
    const vId = vendor.vendorId;
    const cId = vendor.categoryId;

    if (!vendorIdToCategoriesId.has(vId)) {
      const arr = [];
      arr.push(cId);
      vendorIdToCategoriesId.set(vId, arr);
    } else {
      const last = vendorIdToCategoriesId.get(vId);
      last.push(cId);
      vendorIdToCategoriesId.set(vId, last);
    }

    vendorIdToVendorDetail.set(vId, vendor.vendor);
    categoryIdToCategoryDetail.set(cId, vendor.category);
  });

  const tBody = document.createElement("tbody")
  for (let [key, value] of vendorIdToVendorDetail) {
    const row = document.createElement("tr");
    // row.addEventListener("click", vendorDetails);
    // row.id = value.id;

    let OrgDiv = document.createElement("td");
    OrgDiv.innerHTML = value.organizationName;
    row.appendChild(OrgDiv);
    showModalOnClick(OrgDiv, value);

    let div = document.createElement("td");
    div.innerHTML = value.vendorType.name;
    row.appendChild(div);
    showModalOnClick(div, value);

    div = document.createElement("td");
    const categoryInfo = categoryIdToCategoryDetail.get(
      vendorIdToCategoriesId.get(key)[0]
    );
    div.innerHTML = categoryInfo.name;
    row.appendChild(div);
    showModalOnClick(div, value);

    div = document.createElement("td");
    div.innerHTML = value.contactPersonName;
    row.appendChild(div);
    showModalOnClick(div, value);

    div = document.createElement("td");
    div.innerHTML = value.contactPersonNumber;
    row.appendChild(div);
    showModalOnClick(div, value);

    div = document.createElement("td");
    div.innerHTML = value.relationshipDuration;
    row.appendChild(div);
    showModalOnClick(div, value);

    let active = "/46c701c4a4d073147798.png"; // TEMP
    const activeImage = document.createElement("div");
    activeImage.innerHTML = `<img class="height-20" src=${active} />`;

    div = document.createElement("td");
    div.addEventListener("click", toggleStatus);
    div.id = value.id;

    active = "/70905ed154027b87c042.png"; // TEMP
    if (!value.status) {
      activeImage.innerHTML = `<img class="height-20" src=${active} />`;
    }

    div.appendChild(activeImage);
    row.appendChild(div);
    tBody.appendChild(row);

    const moreRows = getMoreRows(key, table, OrgDiv);
  }

  table.appendChild(tBody)

  vendorTable.appendChild(table);

  populateVendorStatus();
};

const populateVendorStatus = () => {
  let activeVendorsCount = 0,
    inActiveVectorsCount = 0;
  for (let [key, value] of vendorIdToVendorDetail) {
    if (value.status == true) {
      activeVendorsCount += 1;
    } else {
      inActiveVectorsCount += 1;
    }
  }

  let totalVendorsCount = vendorIdToVendorDetail.size;

  const totalVendors = document.getElementById("total-vendors");
  totalVendors.innerHTML = totalVendorsCount;

  const activeVendors = document.getElementById("active-vendors");
  activeVendors.innerHTML = activeVendorsCount;

  const inActiveVendors = document.getElementById("inactive-vendors");
  inActiveVendors.innerHTML = inActiveVectorsCount;
};
