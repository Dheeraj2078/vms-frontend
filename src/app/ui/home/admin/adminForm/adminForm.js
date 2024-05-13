import { redirectUrl } from "../../../../util/constants.js";
import { createAdmin } from "../../../../service/loginApi.js";
import { successModal } from "../../../../common/components/successModal.js";
import goToAdmin from "../admin.js";

export function handleCross() {
  const vendorFormOutput = document.getElementById("form-output");
  vendorFormOutput.classList.add("hidden");

  const mainContainer = document.getElementsByClassName("main-container")[0];
  mainContainer.classList.remove("blur-background");

  goToAdmin();
}

export async function handleMultipleDropdown() {
  const allRoles = document.getElementById("admin-roles");

  const div = document.createElement("div");
  div.classList.add("vendor-type-dropdown-option");

  const input = document.createElement("input");
  input.type = "radio";
  input.id = "admin";
  input.name = "vendorType";
  input.value = "admin";

  const label = document.createElement("label");
  label.setAttribute("for", "admin");
  label.innerHTML = "admin";

  div.appendChild(input);
  div.appendChild(label);

  allRoles.appendChild(div);

  const adminRoles = document.getElementById("admin-roles");
  const dropdown = document.getElementsByClassName("dropdown-icon")[0];
  dropdown.addEventListener("click", (e) => {
    if (adminRoles.classList.contains("hidden")) {
      adminRoles.classList.remove("hidden");
    } else {
      adminRoles.classList.add("hidden");
    }
  });

  handleDataChange();
}

let firstName_ = "";
let lastName_ = "";
let email_ = "";
let role_ = "";

let firstName = document.getElementById("first-name");
let lastName = document.getElementById("last-name");
let email = document.getElementById("admin-email");
let role = document.getElementById("all-roles");
let roleInput = document.querySelector("input[type=radio]");

let firstNameError = document.getElementsByClassName("first-name-error")[0];
let lastNameError = document.getElementsByClassName("last-name-error")[0];
let emailError = document.getElementsByClassName("email-error")[0];
let roleError = document.getElementsByClassName("role-error")[0];

function removeBorder(column, error) {
  if (!error.classList.contains("hidden")) {
    error.classList.add("hidden");
  }
  if (column.classList.contains("empty-field-border")) {
    column.classList.remove("empty-field-border");
  }
}

const handleDataChange = () => {
  firstName = document.getElementById("first-name");
  lastName = document.getElementById("last-name");
  email = document.getElementById("admin-email");
  role = document.getElementById("all-roles");
  roleInput = document.querySelector("input[type=radio]");

  firstNameError = document.getElementsByClassName("first-name-error")[0];
  lastNameError = document.getElementsByClassName("last-name-error")[0];
  emailError = document.getElementsByClassName("email-error")[0];
  roleError = document.getElementsByClassName("role-error")[0];

  firstName.addEventListener("input", (e) => {
    removeBorder(firstName, firstNameError);
    firstName_ = e.target.value;
  });
  lastName.addEventListener("input", (e) => {
    removeBorder(lastName, lastNameError);
    lastName_ = e.target.value;
  });
  email.addEventListener("input", (e) => {
    const emailExists = document.getElementsByClassName("email-exists")[0];
    if (!emailExists.classList.contains("hidden")) {
      emailExists.classList.add("hidden");
    }

    removeBorder(email, emailError);
    email_ = e.target.value;
  });
  roleInput.addEventListener("change", (e) => {
    removeBorder(role, roleError);
    if (roleInput.checked) {
      role_ = e.target.value;
    }

    if (role_ == "") {
      role.value = "Select Vendor Types";
    } else {
      role.value = role_;
    }

    const adminRoles = document.getElementById("admin-roles");
    adminRoles.classList.add("hidden");
  });
};

export async function handleAddAdmin() {
  const firstNameError = document.getElementsByClassName("first-name-error")[0];
  const lastNameError = document.getElementsByClassName("last-name-error")[0];
  const emailError = document.getElementsByClassName("email-error")[0];
  const roleError = document.getElementsByClassName("role-error")[0];

  firstName_ = firstName_.trim();
  lastName_ = lastName_.trim();
  email_ = email_.trim();

  let allValuesProvided = true;
  if (firstName_ == "") {
    allValuesProvided = false;
    firstName.classList.add("empty-field-border");
    firstNameError.classList.remove("hidden");
  }
  if (lastName_ == "") {
    allValuesProvided = false;
    lastName.classList.add("empty-field-border");
    lastNameError.classList.remove("hidden");
  }
  if (email_ == "") {
    allValuesProvided = false;
    email.classList.add("empty-field-border");
    emailError.classList.remove("hidden");
  }

  if (role_ == "") {
    allValuesProvided = false;
    role.classList.add("empty-field-border");
    roleError.classList.remove("hidden");
  }

  if (allValuesProvided == false) {
    return;
  }

  const userName = firstName_ + "$" + lastName_;

  const postAdminData = {
    userName,
    email: email_,
    role: role_,
    redirectUrl,
  };

  console.log(postAdminData);

  try {
    const res = await createAdmin(postAdminData);
    console.log("create admin", res);

    firstName_ = "";
    lastName_ = "";
    email_ = "";
    role_ = "";

    if (res.error == null) {
      successModal("Admin Added", handleCross);
    }
  } catch (error) {
    console.log(error);
    const emailExists = document.getElementsByClassName("email-exists")[0];
    emailExists.classList.remove("hidden");
  }
}
