import goToInvoice from "../invoice";

import {
  getContractCategory,
  getContractFormData,
} from "../../../../service/contractsApi";
import { successModal } from "../../../../common/components/successModal";
import { addInvoice } from "../../../../service/invoiceApi";
import { validateAmount } from "../../../../util/util";

export function handleCross() {
  const vendorFormOutput = document.getElementById("form-output");
  vendorFormOutput.classList.add("hidden");

  const mainContainer = document.getElementsByClassName("main-container")[0];
  mainContainer.classList.remove("blur-background");
  document.body.classList.remove("overflow-hidden");

  goToInvoice();
}

const mapOrgNameToOrgId = {};
const orgCatMap = {};
const statusToStatusIdMap = {};
export async function handleMultipleDropdown() {
  const vendorOrganizationDropdown =
    document.getElementById("dropdown-options");

  const allOrgs = document.getElementsByClassName("dropdown-icon-wrapper")[0];
  allOrgs.addEventListener("click", (e) => {
    if (vendorOrganizationDropdown.classList.contains("hidden")) {
      vendorOrganizationDropdown.classList.remove("hidden");
    } else {
      vendorOrganizationDropdown.classList.add("hidden");
    }
  });

  const vendorCategoryDropdown = document.getElementById("associated-category");
  const allCategory = document.getElementsByClassName(
    "dropdown-icon-wrapper"
  )[1];
  allCategory.addEventListener("click", (e) => {
    if (vendorCategoryDropdown.classList.contains("hidden")) {
      vendorCategoryDropdown.classList.remove("hidden");
    } else {
      vendorCategoryDropdown.classList.add("hidden");
    }
  });

  const allStatus = document.getElementsByClassName("dropdown-icon-wrapper")[2];
  const statusDropdown = document.getElementById("status-dropdown-options");
  allStatus.addEventListener("click", (e) => {
    if (statusDropdown.classList.contains("hidden")) {
      statusDropdown.classList.remove("hidden");
    } else {
      statusDropdown.classList.add("hidden");
    }
  });

  const div = document.createElement("div");
  div.innerHTML = "Select Organization Name";
  vendorCategoryDropdown.appendChild(div);

  try {
    const response = await getContractFormData();
    console.log("res", response);

    const OrganizationNames = response.data.vendor;
    const statuses = [
      { id: true, name: "Paid" },
      { id: false, name: "Pending" },
    ];

    OrganizationNames.map((organizationObject) => {
      const div = document.createElement("div");
      div.classList.add("vendor-type-dropdown-option");
      const input = document.createElement("input");
      input.classList.add("org-name-checkbox");
      input.type = "radio";
      input.id = organizationObject.organizationName;
      input.name = "vendorType";
      input.value = organizationObject.organizationName;
      input.classList.add("cursor-pointer");

      const label = document.createElement("span");
      label.setAttribute("for", organizationObject.organizationName);
      label.innerHTML = organizationObject.organizationName;
      label.classList.add("cursor-pointer");

      div.appendChild(input);
      div.appendChild(label);

      vendorOrganizationDropdown.appendChild(div);
      mapOrgNameToOrgId[organizationObject.organizationName] =
        organizationObject.id;
    });

    console.log("SSSSSS", statuses);
    statuses.map((status) => {
      const div = document.createElement("div");
      div.classList.add("vendor-type-dropdown-option");
      const input = document.createElement("input");
      input.classList.add("status-checkbox");
      input.type = "radio";
      input.id = status.name;
      input.name = "statusType";
      input.value = status.name;
      input.classList.add("cursor-pointer");

      const label = document.createElement("span");
      label.setAttribute("for", status.name);
      label.innerHTML = status.name;
      label.classList.add("cursor-pointer");

      div.appendChild(input);
      div.appendChild(label);

      statusDropdown.appendChild(div);
      statusToStatusIdMap[status.name] = status.id;
    });
  } catch (error) {
    console.log(error);
  }
  handleDataChange();
}

let organizationName_ = "";
let contactPersonName_ = "";
let allCategory_ = "";
let contactPersonEmail_ = "";
let amount_ = "";
// let contactPhoneNumber_ = ""; // payment mode
let startDate_ = "";
// let endDate_ = "";
let status_ = "";
let contactDocument_ = "";

let organizationName = document.getElementById("vendor-organization-name");
let contactPersonName = document.getElementById("contact-person-name");
let allCategory = document.getElementById("all-category");
let contactPersonEmail = document.getElementById("contact-person-email");
let amount = document.getElementById("amount");
// let contactPhoneNumber = document.getElementById("payment-mode");
let startDate = document.getElementById("due-date");
// let endDate = document.getElementById("end-date");
let status = document.getElementById("status");
let contactDocument = document.getElementById("contact-document");
let vendorOrgDropdownOption =
  document.getElementsByClassName("org-name-checkbox");

function removeBorder(column) {
  if (column.classList.contains("empty-field-border")) {
    column.classList.remove("empty-field-border");
  }
}

const handleCategoryChange = () => {
  const particularCategory = document.getElementsByClassName(
    "particular-category"
  );
  console.log("particularCategory", particularCategory);
  const particularCategoryArr = [...particularCategory];

  particularCategoryArr.map((catObj) => {
    catObj.addEventListener("change", async (e) => {
      removeBorder(allCategory);
      if (catObj.checked) {
        allCategory_ = e.target.value;
      }

      if (allCategory_ == "") {
        allCategory.value = "Select Vendor Types";
      } else {
        allCategory.value = allCategory_;
      }

      const vendorOrganizationDropdown = document.getElementById(
        "associated-category"
      );
      vendorOrganizationDropdown.classList.add("hidden");
      // orgCatMap
    });
  });
};

export async function handleDataChange() {
  vendorOrgDropdownOption =
    document.getElementsByClassName("org-name-checkbox");
  organizationName = document.getElementById("vendor-organization-name");
  contactPersonName = document.getElementById("contact-person-name");
  allCategory = document.getElementById("all-category");
  contactPersonEmail = document.getElementById("contact-person-email");
  amount = document.getElementById("amount");
  // contactPhoneNumber = document.getElementById("payment-mode");
  startDate = document.getElementById("due-date");
  // endDate = document.getElementById("end-date");
  status = document.getElementById("status");
  contactDocument = document.getElementById("contact-document");

  startDate.addEventListener("keydown", (e) => {
    e.preventDefault();
  });

  startDate.addEventListener("click", () => {
    // startDate.blur();
    startDate.click();
  });

  // console.log("MMMMMMMMM", vendorOrgDropdownOption);

  const vendorOrgDropdownOptionArr = [...vendorOrgDropdownOption];
  vendorOrgDropdownOptionArr.map((org) => {
    org.addEventListener("change", async (e) => {
      removeBorder(organizationName);
      if (org.checked) {
        organizationName_ = e.target.value;
      }

      if (organizationName_ == "") {
        organizationName.value = "Select Vendor Types";
      } else {
        organizationName.value = organizationName_;
        allCategory.value = "";
        try {
          // const response = await fetch()
          const id = mapOrgNameToOrgId[organizationName_];
          const response = await getContractCategory(id);
          const categoriesForOrg = response.data;
          console.log("categoriesForOrg", categoriesForOrg);

          const associatedCategory = document.getElementById(
            "associated-category"
          );
          associatedCategory.innerHTML = "";

          categoriesForOrg.map((catObj) => {
            const div = document.createElement("div");
            div.classList.add("vendor-type-dropdown-option");

            const input = document.createElement("input");
            input.type = "radio";
            input.id = catObj.categoryName;
            input.name = "categoryType";
            input.value = catObj.categoryName;
            input.classList.add("particular-category");
            input.classList.add("cursor-pointer");

            const label = document.createElement("span");
            label.setAttribute("for", catObj.categoryName);
            label.innerHTML = catObj.categoryName;
            label.classList.add("cursor-pointer");

            div.appendChild(input);
            div.appendChild(label);

            associatedCategory.appendChild(div);
            orgCatMap[catObj.categoryName] = catObj.mappingId;
          });
        } catch (error) {
          console.log(error);
        }
      }

      const vendorOrganizationDropdown =
        document.getElementById("dropdown-options");
      vendorOrganizationDropdown.classList.add("hidden");
      handleCategoryChange();
    });
  });

  organizationName_ = organizationName.value;
  organizationName.addEventListener("click", (e) => {
    removeBorder(organizationName);
    organizationName_ = e.target.value;
    document.getElementById("organization-name-error").classList.add("hidden");
  });

  allCategory_ = allCategory.value;
  allCategory.addEventListener("click", (e) => {
    removeBorder(allCategory);
    allCategory_ = e.target.value;
    document.getElementById("category-error").classList.add("hidden");
  });

  contactPersonName_ = contactPersonName.value;
  contactPersonName.addEventListener("input", (e) => {
    removeBorder(contactPersonName);
    contactPersonName_ = e.target.value;
    document.getElementById("contact-name-error").classList.add("hidden");
  });

  contactPersonEmail_ = contactPersonEmail.value;
  contactPersonEmail.addEventListener("input", (e) => {
    removeBorder(contactPersonEmail);
    contactPersonEmail_ = e.target.value;
    document.getElementById("contact-email-error").classList.add("hidden");
  });

  amount_ = amount.value;
  amount.addEventListener("input", (e) => {
    removeBorder(amount);
    amount_ = e.target.value;
    document.getElementById("amount-error").classList.add("hidden");
  });

  // contactPhoneNumber_ = contactPhoneNumber.value;
  // contactPhoneNumber.addEventListener("input", (e) => {
  //   removeBorder(contactPhoneNumber);
  //   contactPhoneNumber_ = e.target.value;
  // });

  startDate_ = startDate.value;
  startDate.addEventListener("input", (e) => {
    removeBorder(startDate);
    startDate_ = e.target.value;
    document.getElementById("due-date-error").classList.add("hidden");
  });

  // endDate_ = endDate.value;
  // endDate.addEventListener("input", (e) => {
  //   removeBorder(endDate);
  //   endDate_ = e.target.value;
  // });

  contactDocument_ = contactDocument.value;
  contactDocument.addEventListener("change", (e) => {
    removeBorder(contactDocument);
    contactDocument_ = e.target.files;
    document.getElementById("document-error").classList.add("hidden");
  });

  status_ = status.value;
  status.addEventListener("input", (e) => {
    status_ = e.target.value;
  });

  const allStatus = document.getElementsByClassName("status-checkbox");
  console.log("aaaaa", allStatus);
  const allStatusArr = [...allStatus];

  allStatusArr.map((statusOption) => {
    statusOption.addEventListener("click", (e) => {
      removeBorder(status);
      document.getElementById("status-error").classList.add("hidden");
      if (statusOption.checked) {
        status_ = e.target.value;
      }

      if (status_ == "") {
        status.value = "Select Vendor Types";
      } else {
        status.value = status_;
      }

      const vendorOrganizationDropdown = document.getElementById(
        "status-dropdown-options"
      );
      vendorOrganizationDropdown.classList.add("hidden");
    });
  });
}

const isNullOrEmpty = (value) => {
  if (
    typeof value === "string" &&
    (value === null || value.trim().length === 0)
  ) {
    return true;
  } else if (value === null) {
    return true;
  } else {
    return false;
  }
};

const showErrorMessage = (error_element, text) => {
  error_element.innerHTML = text;
  error_element.classList.remove("hidden");
};

const checkFieldValues = () => {
  let checkResult = true;
  if (isNullOrEmpty(organizationName_)) {
    const error_element = document.getElementById("organization-name-error");
    showErrorMessage(error_element, "Please Select Organization Name");
    organizationName.classList.add("empty-field-border");
    checkResult = false;
  }

  if (isNullOrEmpty(allCategory_)) {
    const error_element = document.getElementById("category-error");
    showErrorMessage(error_element, "Please select Category");
    allCategory.classList.add("empty-field-border");
    checkResult = false;
  }

  if (isNullOrEmpty(status_)) {
    const error_element = document.getElementById("status-error");
    showErrorMessage(error_element, "Please select Status");
    status.classList.add("empty-field-border");
    checkResult = false;
  }

  if (isNullOrEmpty(contactPersonName_)) {
    const error_element = document.getElementById("contact-name-error");
    showErrorMessage(error_element, "Please enter Contact Person Name");
    contactPersonName.classList.add("empty-field-border");
    checkResult = false;
  }
  if (isNullOrEmpty(contactPersonEmail_)) {
    const error_element = document.getElementById("contact-email-error");
    showErrorMessage(error_element, "Please enter contact Person Email");
    contactPersonEmail.classList.add("empty-field-border");
    checkResult = false;
  }
  if (isNullOrEmpty(amount_)) {
    const error_element = document.getElementById("amount-error");
    showErrorMessage(error_element, "Please enter Amount");
    amount.classList.add("empty-field-border");
    checkResult = false;
  }
  if (isNullOrEmpty(startDate_)) {
    const error_element = document.getElementById("due-date-error");
    showErrorMessage(error_element, "Please enter Due Date");
    startDate.classList.add("empty-field-border");
    checkResult = false;
  }

  if (isNullOrEmpty(contactDocument_)) {
    const error_element = document.getElementById("document-error");
    showErrorMessage(error_element, "Please select a Document");
    contactDocument.classList.add("empty-field-border");
    checkResult = false;
  } else {
    const maxSize = 5 * 1024 * 1024;
    const error_ele = document.getElementById("document-error");
    const userFile = document.getElementById("contact-document").files[0];
    const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
    if (!allowedTypes.includes(userFile.type)) {
      showErrorMessage(
        error_ele,
        "Only PDF, Word, JPEG, and PNG files are allowed"
      );
      contactDocument.classList.add("empty-field-border");
      checkResult = false;
    } else if (userFile.size > maxSize) {
      showErrorMessage(error_ele, "File size exceeds the maximum limit (5MB)");
      contactDocument.classList.add("empty-field-border");
      checkResult = false;
    }
  }

  if (!validateEmail(contactPersonEmail_)) {
    const error_ele = document.getElementById("contact-email-error");
    showErrorMessage(error_ele, "Please enter correct email");
    checkResult = false;
  }

  if (!validateAmount(amount_)) {
    const error_ele = document.getElementById("amount-error");
    showErrorMessage(error_ele, "Please enter valid amount");
    checkResult = false;
  }

  return checkResult;
};

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const dataAndCheck = () => {
  const userFile = document.getElementById("contact-document").files[0];
  console.log(userFile);

  const ress = validateEmail(contactPersonEmail_);
  console.log("rwss", ress);

  const formData = new FormData();
  formData.append("vendorCategoryMappingId", orgCatMap[allCategory_]);
  formData.append("contactPersonName", contactPersonName_);
  formData.append("contactPersonEmail", contactPersonEmail_);
  formData.append("amount", amount_);
  formData.append("dueDate", startDate_);
  // formData.append("endDate", endDate_);
  // formData.append("paymentMode", contactPhoneNumber_);
  formData.append("status", statusToStatusIdMap[status_]);
  formData.append("file", userFile);

  organizationName_ = organizationName_.trim();
  contactPersonName_ = contactPersonName_.trim();
  allCategory_ = allCategory_.trim();
  contactPersonEmail_ = contactPersonEmail_.trim();
  amount_ = amount_.trim();
  // contactPhoneNumber_ = contactPhoneNumber_.trim();
  startDate_ = startDate_.trim();
  // endDate_ = endDate_.trim();
  status_ = status_.trim();
  contactDocument_ = contactDocument_;

  // let allValuesProvided = true;
  // if (organizationName_ == "") {
  //   allValuesProvided = false;
  //   organizationName.classList.add("empty-field-border");
  // }
  // if (contactPersonName_ == "") {
  //   allValuesProvided = false;
  //   contactPersonName.classList.add("empty-field-border");
  // }

  // if (allCategory_ == "") {
  //   allValuesProvided = false;
  //   allCategory.classList.add("empty-field-border");
  // }

  // if (contactPersonEmail_ == "") {
  //   allValuesProvided = false;
  //   contactPersonEmail.classList.add("empty-field-border");
  // }

  // if (amount_ == "") {
  //   allValuesProvided = false;
  //   amount.classList.add("empty-field-border");
  // }

  // // if (contactPhoneNumber_ == "") {
  // //   allValuesProvided = false;
  // //   contactPhoneNumber.classList.add("empty-field-border");
  // // }

  // if (startDate_ == "") {
  //   allValuesProvided = false;
  //   startDate.classList.add("empty-field-border");
  // }

  // // if (endDate_ == "") {
  // //   allValuesProvided = false;
  // //   endDate.classList.add("empty-field-border");
  // // }

  // if (status_ == "") {
  //   allValuesProvided = false;
  //   status.classList.add("empty-field-border");
  // }

  // if (contactDocument_ == "") {
  //   allValuesProvided = false;
  //   contactDocument.classList.add("empty-field-border");
  // }

  if (!checkFieldValues()) {
    console.log("all fields are mandatory");
    return null;
  }
  return formData;
};

export async function handleAddInvoice() {
  const formData = dataAndCheck();

  if (formData == null) {
    return;
  }

  const cancelBtn = document.getElementsByClassName("btn-light")[0];
  const saveBtn = document.getElementsByClassName("btn-sm")[0];
  const formCorss = document.getElementById("form-cross");

  console.log("sace", saveBtn);
  saveBtn.classList.add("disabled");
  cancelBtn.classList.add("disabled-light");
  formCorss.classList.add("disabled-cross");

  console.log("fr", formData);
  try {
    const res = await addInvoice(formData);
    console.log("data 2", res);
    if (res.error == null) {
      successModal("Invoice Added", handleCross);
    }
  } catch (error) {
    console.log(error);

    if (saveBtn.classList.contains("disabled")) {
      saveBtn.classList.remove("disabled");
    }
    if (cancelBtn.classList.contains("disabled-light")) {
      cancelBtn.classList.remove("disabled-light");
    }
    if (formCorss.classList.contains("disabled-cross")) {
      formCorss.classList.remove("disabled-cross");
    }
  }
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    handleAddInvoice();
  }
});
