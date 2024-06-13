import adminHtml from "../admin/admin.html";
import adminFormHtml from "../../home/admin/adminForm/adminForm.html";
import {
  handleCross,
  handleMultipleDropdown,
  handleAddAdmin,
} from "./AdminForm/AdminForm";
import { getAdmins } from "../../../service/admins";
import { createTableHeader } from "../../../common/components/table";
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

  searchModel("Search Admins", filterResults);

  handleMultipleDropdown();

  addPagination(getAdmins, createAdminTable, "No Admin Found");
}

function filterResults(value) {
  if (value.trim().length === 0) {
    addPagination(getAdmins, createAdminTable, "No Admin Found");
  }
  if (value.length >= 2) {
    addPagination(getAdmins, createAdminTable, "No Admin Found", value);
  }
}

const createAdminTable = async (admins) => {
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
