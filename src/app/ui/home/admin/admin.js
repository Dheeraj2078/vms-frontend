import adminHtml from "../admin/admin.html";
import adminFormHtml from "../../home/admin/adminForm/adminForm.html";
import {
  handleCross,
  handleMultipleDropdown,
  handleAddAdmin,
} from "./AdminForm/AdminForm";
import { getAdmins } from "../../../service/admins";
import { createTableHeader } from "../../../common/components/table";
// import searchHtml from "../../../common/components/search.html";
import { noDataAdded } from "../../../common/components/emptyData";
import { goToRoute } from "../../../common/components/goToRoute";
import { searchUser } from "../../../service/searchApi";
import { addPagination } from "../../../common/components/pagination";
import { searchModel } from "../../../common/components/search";

const getAdminsData = async () => {
  try {
    const res = await getAdmins();
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export default async function goToAdmin() {
  sessionStorage.setItem("tab", "admin");
  goToRoute(adminHtml, adminFormHtml, handleCross, handleAddAdmin);

  // const searchContainer = document.getElementsByClassName("search-holder")[0];
  // searchContainer.innerHTML = searchHtml;

  // // const searchInput = document.getElementById("internal-search");
  // // searchInput.setAttribute("placeholder", "Search Admins");

  // const search = document.getElementById("internal-search");
  // search.addEventListener("input", handleSearch);
  // search.setAttribute("placeholder", "Search Admins");

  searchModel("Search Admins", filterResults);

  handleMultipleDropdown();

  addPagination(getAdmins, createAdminTable, "No Admin Found");

  // const allAdmins = await getAdminsData();
  // if (allAdmins.length == 0) {
  //   const addBtn = document.getElementById("add-button");
  //   const div = noDataAdded("Admins", addBtn);
  //   const homeRoot = document.getElementsByClassName("container")[0];
  //   homeRoot.innerHTML = "";
  //   homeRoot.appendChild(div);
  // } else {
  //   createAdminTable(allAdmins);
  // }
}

// const handleSearch = async (e) => {
//   const value = e.target.value;
// };

function filterResults(value) {
  if (value.trim().length === 0) {
    addPagination(getAdmins, createAdminTable, "No Admin Found");
    // const allContracts = await getAdminsData();
    // if (allContracts == null || allContracts.length == 0) {
    //   const contactTable = document.getElementsByClassName("admin-table")[0];
    //   contactTable.innerHTML = `<h4>No Result Found for "${value}"`;
    // } else {
    //   const contracts = allContracts;
    //   createAdminTable(contracts);
    // }
  }
  if (value.length >= 2) {
    addPagination(getAdmins, createAdminTable, "No Admin Found", value);
    // const searchResult = await searchUser(value);

    // if (searchResult.data == null || searchResult.data.length == 0) {
    //   // showEmptyPage();
    //   const contactTable = document.getElementsByClassName("admin-table")[0];
    //   contactTable.innerHTML = `<h4>No Result Found for "${value}"`;
    // } else {
    //   const contracts = searchResult.data;
    //   console.log(contracts);
    //   createAdminTable(contracts);
    // }
  }
}

const createAdminTable = async (admins) => {
  console.log("ADMINS", admins);
  const adminTable = document.getElementsByClassName("admin-table")[0];
  adminTable.innerHTML = "";

  const table = createTableHeader([
    "First Name",
    "Last Name",
    "Email",
    "Role",
    "Invite Status",
  ]);

  adminTable.appendChild(table);

  // const admins = await getAdminsData();

  const tBody = document.createElement("tbody");
  tBody.classList.add("table-body");
  tBody.style.height = "330px";
  admins.map((admin) => {
    const row = document.createElement("tr");

    const firstName = admin.userName.split("$")[0];
    const lastName = admin.userName.split("$")[1];

    let div = document.createElement("td");
    div.innerHTML = firstName;
    row.appendChild(div);

    div = document.createElement("td");
    div.innerHTML = lastName;
    row.appendChild(div);

    div = document.createElement("td");
    div.innerHTML = admin.email;
    row.appendChild(div);

    div = document.createElement("td");
    div.innerHTML = admin.role;
    row.appendChild(div);

    div = document.createElement("td");
    const innerdiv = document.createElement("div");
    innerdiv.classList.add("status");
    if (admin.status) {
      innerdiv.innerHTML = "Accepted";
      innerdiv.classList.add("active");
    } else {
      innerdiv.innerHTML = "Pending";
      innerdiv.classList.add("inactive");
    }
    div.appendChild(innerdiv);
    row.appendChild(div);

    tBody.appendChild(row);
  });

  table.appendChild(tBody);
};
