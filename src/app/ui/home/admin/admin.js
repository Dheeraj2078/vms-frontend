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

const getAdminsData = async () => {
  try {
    const res = await getAdmins();
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export default async function goToAdmin() {
  const homeRoot = document.getElementById("home-root");
  homeRoot.innerHTML = adminHtml;

  const createAdminFormOutput = document.getElementById("form-output");
  createAdminFormOutput.innerHTML = adminFormHtml;

  const addVendorsButton = document.getElementById("add-button");
  addVendorsButton.addEventListener("click", (e) => {
    createAdminFormOutput.classList.remove("hidden");
    const vendorFormCross = document.getElementById("form-cross");
    vendorFormCross.addEventListener("click", (e) => {
      handleCross();
    });

    const vendorFormCancel = document.getElementsByClassName("form-cancel")[0];
    vendorFormCancel.addEventListener("click", (e) => {
      handleCross();
    });

    const mainContainer = document.getElementById("main-container");
    mainContainer.classList.add("blur-background");
  });

  const addVendorBtn = document.getElementById("add-admin");
  addVendorBtn.addEventListener("click", handleAddAdmin);

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
    "Status",
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
    // div.innerHTML = admin.status;
    const innerdiv = document.createElement("div");
    innerdiv.classList.add("status");
    if (admin.status) {
      innerdiv.innerHTML = "Active";
      innerdiv.classList.add("active");
    } else {
      innerdiv.innerHTML = "In active";
      innerdiv.classList.add("inactive");
    }
    div.appendChild(innerdiv);
    row.appendChild(div);

    table.appendChild(row);
  });
};
