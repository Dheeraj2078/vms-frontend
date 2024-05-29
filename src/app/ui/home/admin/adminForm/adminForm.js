import { redirectUrl } from "../../../../util/constants.js";
import { createAdmin } from "../../../../service/loginApi.js";
import { successModal } from "../../../../common/components/successModal.js";
import goToAdmin from "../admin.js";
import { validateEmail } from "../../../../util/util.js";

export function handleCross() {
  const vendorFormOutput = document.getElementById("form-output");
  vendorFormOutput.classList.add("hidden");

  const mainContainer = document.getElementsByClassName("main-container")[0];
  mainContainer.classList.remove("blur-background");
  document.body.classList.remove("overflow-hidden");

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
  input.classList.add("cursor-pointer");

  const label = document.createElement("label");
  label.setAttribute("for", "admin");
  label.innerHTML = "admin";
  label.classList.add("cursor-pointer");

  div.appendChild(input);
  div.appendChild(label);

  allRoles.appendChild(div);

  const adminRoles = document.getElementById("admin-roles");
  const dropdown = document.getElementsByClassName(
    "associated-category-wrapper"
  )[0];
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
  const cancelBtn = document.getElementsByClassName("btn-light")[0];
  const saveBtn = document.getElementsByClassName("btn-sm")[0];
  if (saveBtn.classList.contains("disabled")) {
    saveBtn.classList.remove("disabled");
  }
  if (cancelBtn.classList.contains("disabled-light")) {
    cancelBtn.classList.remove("disabled-light");
  }

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

  firstName_ = firstName.value;
  firstName.addEventListener("input", (e) => {
    removeBorder(firstName, firstNameError);
    firstName_ = e.target.value;
  });

  lastName_ = lastName.value;
  lastName.addEventListener("input", (e) => {
    removeBorder(lastName, lastNameError);
    lastName_ = e.target.value;
  });

  email_ = email.value;
  email.addEventListener("input", (e) => {
    const emailExists = document.getElementsByClassName("already-exists")[0];
    if (emailExists && !emailExists.classList.contains("hidden")) {
      emailExists.classList.add("hidden");
    }

    const error_ele = document.getElementById("wrong-email");
    if (!error_ele.classList.contains("hidden")) {
      error_ele.classList.add("hidden");
    }
    removeBorder(email, emailError);
    email_ = e.target.value;
  });

  role_ = role.value;
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

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    handleAddAdmin();
  }
});

export async function handleAddAdmin() {
  const firstNameError = document.getElementsByClassName("first-name-error")[0];
  const lastNameError = document.getElementsByClassName("last-name-error")[0];
  const emailError = document.getElementsByClassName("email-error")[0];
  const roleError = document.getElementsByClassName("role-error")[0];

  const cancelBtn = document.getElementsByClassName("btn-light")[0];
  const saveBtn = document.getElementsByClassName("btn-sm")[0];

  if (saveBtn.classList.contains("disabled")) {
    return;
  }

  firstName_ = firstName_.trim();
  lastName_ = lastName_.trim();
  email_ = email_.trim();

  let allValuesProvided = true;
  let noMail = false;
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
    noMail = true;
    email.classList.add("empty-field-border");
    emailError.classList.remove("hidden");
  }

  if (role_ == "") {
    allValuesProvided = false;
    role.classList.add("empty-field-border");
    roleError.classList.remove("hidden");
  }

  if (!noMail && !validateEmail(email_)) {
    const error_ele = document.getElementById("wrong-email");
    error_ele.classList.remove("hidden");
    allValuesProvided = false;
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
  saveBtn.classList.add("disabled");
  cancelBtn.classList.add("disabled-light");
  try {
    const res = await createAdmin(postAdminData);
    console.log("create admin", res);

    firstName_ = "";
    lastName_ = "";
    email_ = "";
    role_ = "";

    if (res.error == null) {
      successModal("Admin added", handleCross);
    }
  } catch (error) {
    console.log(error);
    const emailExists = document.getElementsByClassName("already-exists")[0];
    emailExists.classList.remove("hidden");
    if (saveBtn.classList.contains("disabled")) {
      saveBtn.classList.remove("disabled");
    }
    if (cancelBtn.classList.contains("disabled-light")) {
      cancelBtn.classList.remove("disabled-light");
    }
  }
}
