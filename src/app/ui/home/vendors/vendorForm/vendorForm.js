import { getVendorFormDropdown } from "../../../../service/vendorsApi";
import { addVendor } from "../../../../service/vendorsApi";
import { successModal } from "../../../../common/components/successModal";
import goToVendor from "../vendors";
import { updateVendor } from "../../../../service/vendorsApi";
import { validateEmail } from "../../../../util/util";

export function handleCross() {
  console.log(document.body.classList);
  console.log("triggered");
  const vendorFormOutput = document.getElementById("form-output");
  vendorFormOutput.classList.add("hidden");

  const mainContainer = document.getElementsByClassName("main-container")[0];
  mainContainer.classList.remove("blur-background");
  console.log(document.body.classList);
  document.body.classList.remove("overflow-hidden");

  goToVendor();
}

let mapCategoryToId = {};
let mapVendorTypeToId = {};
export async function handleMultipleDropdown() {
  const associatedCategorySelector = document.getElementById(
    "associated-category"
  );

  const associatedVendorType = document.getElementById("dropdown-options");

  try {
    const categoriesAndVendorType = await getVendorFormDropdown();

    const allCategories = categoriesAndVendorType.data.categories;
    const allVendorType = categoriesAndVendorType.data.vednorTypes;

    allCategories.map((category) => {
      const label = document.createElement("span");
      label.classList.add("category-dropdown-option");

      const input = document.createElement("input");
      input.type = "checkbox";
      input.value = category.name;
      input.classList.add("cursor-pointer");
      label.appendChild(input);

      const div = document.createElement("div");
      div.innerHTML = category.name;
      label.appendChild(div);
      label.classList.add("cursor-pointer");
      associatedCategorySelector.appendChild(label);

      mapCategoryToId[category.name] = category.id;
    });

    const allCategory = document.getElementsByClassName(
      "dropdown-icon-wrapper"
    )[1];
    allCategory.addEventListener("click", (e) => {
      if (associatedCategorySelector.classList.contains("hidden")) {
        associatedCategorySelector.classList.remove("hidden");
      } else {
        associatedCategorySelector.classList.add("hidden");
      }
    });

    allVendorType.map((vendorType) => {
      const div = document.createElement("div");
      div.classList.add("vendor-type-dropdown-option");

      const input = document.createElement("input");
      input.type = "radio";
      input.id = vendorType.name;
      input.name = "vendorType";
      input.value = vendorType.name;
      input.classList.add("cursor-pointer");

      const label = document.createElement("span");
      label.setAttribute("for", vendorType.name);
      label.innerHTML = vendorType.name;
      label.classList.add("cursor-pointer");

      div.appendChild(input);
      div.appendChild(label);

      associatedVendorType.appendChild(div);
      mapVendorTypeToId[vendorType.name] = vendorType.id;
    });

    const allVendorTypeDropdown = document.getElementsByClassName(
      "dropdown-icon-wrapper"
    )[0];
    allVendorTypeDropdown.addEventListener("click", (e) => {
      if (associatedVendorType.classList.contains("hidden")) {
        associatedVendorType.classList.remove("hidden");
      } else {
        associatedVendorType.classList.add("hidden");
      }
    });
  } catch (error) {
    console.log(error);
  }

  handleDataChange();
}

let organizationName_ = "";
let vendorType_ = "";
let relationshipDuration_ = "";
let contactPerson_ = "";
let contactEmail_ = "";
let contactPhoneNumber_ = "";
let vendorAddress_ = "";
let categories_ = new Set();

let organizationName = document.getElementById("vendor-organization-name");
let relationshipDuration = document.getElementById("relationship-duration");
let contactPerson = document.getElementById("contact-person");
let contactEmail = document.getElementById("contact-email");
let contactPhoneNumber = document.getElementById("contact-phone-number");
let vendorAddress = document.getElementById("vendor-address");
let categoryDropdownOption = document.querySelectorAll("input[type=checkbox]");
let vendorTypeDropdownOption = document.querySelectorAll("input[type=radio]");
let allCategory = document.getElementById("all-category");
let allVendorTypes = document.getElementById("all-vendor-types");

function removeBorder(column) {
  if (column.classList.contains("empty-field-border")) {
    column.classList.remove("empty-field-border");
  }
  // column = column.trim();
}

const isNullOrEmpty = (value) => {
  if (
    typeof value === "string" &&
    (value === null || value.trim().length === 0)
  ) {
    return true;
  }
  return value === null;
};

const showErrorMessage = (error_element, text) => {
  error_element.innerHTML = text;
  error_element.classList.remove("hidden");
};

const checkFieldValues = () => {
  let checkResult = true;
  if (isNullOrEmpty(organizationName_)) {
    const error_element = document.getElementById("orgName-error");
    showErrorMessage(error_element, "Please Select Organization Name");
    organizationName.classList.add("empty-field-border");
    checkResult = false;
  }
  if (categories_.size === 0) {
    const error_element = document.getElementById("category-error");
    showErrorMessage(error_element, "Please select Category");
    allCategory.classList.add("empty-field-border");
    checkResult = false;
  }

  if (isNullOrEmpty(vendorType_)) {
    const error_element = document.getElementById("vendorType-error");
    showErrorMessage(error_element, "Please select Vendor Type");
    allVendorTypes.classList.add("empty-field-border");
    checkResult = false;
  }
  if (isNullOrEmpty(relationshipDuration_)) {
    const error_element = document.getElementById(
      "relationship-duration-error"
    );
    showErrorMessage(error_element, "Please enter Relationship Duration");
    relationshipDuration.classList.add("empty-field-border");
    checkResult = false;
  }
  if (isNullOrEmpty(contactPerson_)) {
    const error_element = document.getElementById("name-error");
    showErrorMessage(error_element, "Please enter Contact Person Name");
    contactPerson.classList.add("empty-field-border");
    checkResult = false;
  }

  if (isNullOrEmpty(contactEmail_)) {
    const error_element = document.getElementById("email-error");
    showErrorMessage(error_element, "Please enter contact Person Email");
    contactEmail.classList.add("empty-field-border");
    checkResult = false;
  }
  if (isNullOrEmpty(contactPhoneNumber_)) {
    const error_element = document.getElementById("phNumber-error");
    showErrorMessage(error_element, "Please enter Contact Person Phone Number");
    contactPhoneNumber.classList.add("empty-field-border");
    checkResult = false;
  }
  if (isNullOrEmpty(vendorAddress_)) {
    const error_element = document.getElementById("address-error");
    showErrorMessage(error_element, "Please enter Address");
    vendorAddress.classList.add("empty-field-border");
    checkResult = false;
  }

  if (!validateEmail(contactEmail_)) {
    const error_ele = document.getElementById("email-error");
    showErrorMessage(error_ele, "Please enter correct email");
    checkResult = false;
  }
  if (!validatePhoneNumber(contactPhoneNumber_)) {
    const error_ele = document.getElementById("phNumber-error");
    showErrorMessage(error_ele, "Please enter correct phone number");
    checkResult = false;
  }

  return checkResult;
};

function validatePhoneNumber(phoneNumber) {
  // Regular expression for a 10-digit phone number
  console.log("ph", phoneNumber);
  const phoneRegex = /^\d{10}$/;
  return phoneRegex.test(phoneNumber);
}

export async function handleDataChange(caller) {
  organizationName = document.getElementById("vendor-organization-name");
  relationshipDuration = document.getElementById("relationship-duration");
  contactPerson = document.getElementById("contact-person");
  contactEmail = document.getElementById("contact-email");
  contactPhoneNumber = document.getElementById("contact-phone-number");
  vendorAddress = document.getElementById("vendor-address");
  allCategory = document.getElementById("all-category");
  categoryDropdownOption = document.querySelectorAll("input[type=checkbox]");
  vendorTypeDropdownOption = document.querySelectorAll("input[type=radio]");
  allVendorTypes = document.getElementById("all-vendor-types");
  categories_ = new Set();

  const categoryDropdownOptionArr = [...categoryDropdownOption];
  const catArr = allCategory.value.split(";");
  // console.log("1. categoryDropdownOptionArr", categoryDropdownOptionArr);

  categoryDropdownOptionArr.map((category) => {
    if (catArr.includes(category.value)) {
      category.setAttribute("checked", true);
      categories_.add(category.value);
    }
  });

  // console.log("CRRRRRRRRRRRRRRRRRRRRRRRRR", categoryDropdownOptionArr);
  categoryDropdownOptionArr.map((category) => {
    console.log("CR", category.checked);
    category.addEventListener("change", (e) => {
      removeBorder(allCategory);
      document.getElementById("category-error").classList.add("hidden");
      if (category.checked) {
        categories_.add(category.value);
      } else {
        categories_.delete(category.value);
      }

      let string = "";
      categories_.forEach((c) => {
        console.log(c);
        string += c;
        string += ";";
      });

      if (string == "") {
        allCategory.value = "Select categories";
      } else {
        allCategory.value = string;
      }
    });
  });

  const vendorTypeDropdownOptionArr = [...vendorTypeDropdownOption];
  vendorType_ = allVendorTypes.value;

  let key_ = "";
  for (const key in mapVendorTypeToId) {
    if (key == vendorType_) {
      key_ = key;
    }
  }

  vendorTypeDropdownOptionArr.map((vendorType) => {
    if (vendorType.value == key_) {
      vendorType.setAttribute("checked", true);
    }
  });

  vendorTypeDropdownOptionArr.map((vendorType) => {
    vendorType.addEventListener("change", (e) => {
      removeBorder(allVendorTypes);
      document.getElementById("vendorType-error").classList.add("hidden");
      if (vendorType.checked) {
        vendorType_ = e.target.value;
      }

      if (vendorType_ == "") {
        allVendorTypes.value = "Select Vendor Types";
      } else {
        allVendorTypes.value = vendorType_;
      }

      const associatedVendorType = document.getElementById("dropdown-options");
      associatedVendorType.classList.add("hidden");
    });
  });

  organizationName.value = organizationName_;
  organizationName.addEventListener("input", (e) => {
    removeBorder(organizationName);
    organizationName_ = e.target.value;
    document.getElementById("orgName-error").classList.add("hidden");
  });

  relationshipDuration.value = relationshipDuration_;
  relationshipDuration.addEventListener("input", (e) => {
    removeBorder(relationshipDuration);
    relationshipDuration_ = e.target.value;
    document
      .getElementById("relationship-duration-error")
      .classList.add("hidden");
  });

  contactPerson.value = contactPerson_;
  contactPerson.addEventListener("input", (e) => {
    removeBorder(contactPerson);
    contactPerson_ = e.target.value;
    document.getElementById("name-error").classList.add("hidden");
  });

  contactEmail.value = contactEmail_;
  contactEmail.addEventListener("input", (e) => {
    removeBorder(contactEmail);
    contactEmail_ = e.target.value;
    document.getElementById("email-error").classList.add("hidden");
  });

  contactPhoneNumber.value = contactPhoneNumber_;
  contactPhoneNumber.addEventListener("input", (e) => {
    removeBorder(contactPhoneNumber);
    contactPhoneNumber_ = e.target.value;
    document.getElementById("phNumber-error").classList.add("hidden");
  });

  vendorAddress.value = vendorAddress_;
  vendorAddress.addEventListener("input", (e) => {
    removeBorder(vendorAddress);
    vendorAddress_ = e.target.value;
    document.getElementById("address-error").classList.add("hidden");
  });
}

const dataAndCheck = () => {
  const categoriesIds = [];
  categories_.forEach((c) => {
    categoriesIds.push(mapCategoryToId[c]);
  });

  const vendorTypeId = mapVendorTypeToId[vendorType_];

  const postData = {
    organizationName: organizationName_,
    vendorTypeId: vendorTypeId,
    address: vendorAddress_,
    contactPersonName: contactPerson_,
    contactPersonNumber: contactPhoneNumber_,
    ContactPersonEmail: contactEmail_,
    relationshipDuration: relationshipDuration_,
    categoryIds: categoriesIds,
  };

  console.log(postData);

  organizationName_ = organizationName_.trim();
  relationshipDuration_ = relationshipDuration_.trim();
  contactEmail_ = contactEmail_.trim();
  contactPhoneNumber_ = contactPhoneNumber_.trim();
  vendorAddress_ = vendorAddress_.trim();
  contactPerson_ = contactPerson_.trim();
  vendorType_ = vendorType_.trim();

  console.log(postData);
  // let allValuesProvided = true;
  // if (organizationName_ == "") {
  //   allValuesProvided = false;
  //   organizationName.classList.add("empty-field-border");
  // }

  // if (relationshipDuration_ == "") {
  //   allValuesProvided = false;
  //   relationshipDuration.classList.add("empty-field-border");
  // }

  // if (contactEmail_ == "") {
  //   allValuesProvided = false;
  //   contactEmail.classList.add("empty-field-border");
  // }

  // if (contactPhoneNumber_ == "") {
  //   allValuesProvided = false;
  //   contactPhoneNumber.classList.add("empty-field-border");
  // }

  // if (vendorAddress_ == "") {
  //   allValuesProvided = false;
  //   vendorAddress.classList.add("empty-field-border");
  // }

  // if (contactPerson_ == "") {
  //   allValuesProvided = false;
  //   contactPerson.classList.add("empty-field-border");
  // }

  // if (categories_.size == 0) {
  //   allValuesProvided = false;
  //   allCategory.classList.add("empty-field-border");
  // }

  // if (vendorType_ == "") {
  //   allValuesProvided = false;
  //   allVendorTypes.classList.add("empty-field-border");
  // }

  if (!checkFieldValues()) {
    console.log("all fields are mandatory");
    return null;
  }
  return postData;
};

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    handleAddVendor();
  }
});

export async function handleAddVendor() {
  const postData = dataAndCheck();

  if (postData == null) {
    return;
  }

  try {
    const res = await addVendor(postData);
    console.log("RESSSS", res);

    if (res.error == null) {
      successModal("Vendor added", handleCross);
    }
  } catch (error) {
    console.log(error);
  }
}

export async function handleUpdateVendor(id) {
  const postData = dataAndCheck();

  if (postData == null) {
    return;
  }

  try {
    const res = await updateVendor(id, postData);
    console.log(res);

    if (res.error == null) {
      successModal("Vendor Updated", handleCross);
    }
  } catch (error) {
    console.log(error);
  }
}
