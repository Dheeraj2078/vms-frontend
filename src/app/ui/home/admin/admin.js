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

const getAdminsData = async () => {
  try {
    const res = await getAdmins();
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export default async function goToAdmin() {
  goToRoute(adminHtml, adminFormHtml, handleCross, handleAddAdmin);

  handleMultipleDropdown();
  createAdminTable();

  const allAdmins = await getAdminsData();
  if (allAdmins.length == 0) {
    const addBtn = document.getElementById("add-button");
    const div = noDataAdded("Admins", addBtn);
    homeRoot.innerHTML = "";
    homeRoot.appendChild(div);
  }
}

const createAdminTable = async () => {
  const adminTable = document.getElementsByClassName("admin-table")[0];

  const table = createTableHeader([
    "First Name",
    "Last Name",
    "Email",
    "Role",
    "Invite Status",
  ]);

  adminTable.appendChild(table);

  const admins = await getAdminsData();
  console.log("he", admins);

  admins.map((admin) => {
    const row = document.createElement("tr");

    console.log(admin.userName.split("$"));

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

    table.appendChild(row);
  });
};
