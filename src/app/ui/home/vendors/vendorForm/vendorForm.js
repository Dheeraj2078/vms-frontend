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
export async function handleMultipleDropdown(formData) {
  const associatedCategorySelector = document.getElementById(
    "associated-category"
  );

  const associatedVendorType = document.getElementById("dropdown-options");
  const slautationDropdown = document.getElementById("salutation-dropdown");

  try {
    const allCategories = formData.data.categories;
    const allVendorType = formData.data.vednorTypes;
    const salutation = formData.data.salutations;

    const allSalutations = document.getElementsByClassName(
      "dropdown-icon-wrapper"
    )[0];
    allSalutations.addEventListener("click", (e) => {
      if (slautationDropdown.classList.contains("hidden")) {
        slautationDropdown.classList.remove("hidden");
      } else {
        slautationDropdown.classList.add("hidden");
      }
    });

    salutation.map((sal) => {
      const div = document.createElement("div");
      div.classList.add("vendor-type-dropdown-option");

      const input = document.createElement("input");
      input.type = "radio";
      input.id = sal;
      input.name = "vendorType";
      input.value = sal;
      input.classList.add("cursor-pointer");
      input.classList.add("salutation-item");

      const label = document.createElement("label");
      label.setAttribute("for", sal);
      label.innerHTML = sal;
      label.classList.add("cursor-pointer");

      div.appendChild(input);
      div.appendChild(label);

      slautationDropdown.appendChild(div);
    });

    allCategories.map((category) => {
      const label = document.createElement("label");
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
    )[2];
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
      input.classList.add("vendor-type-item");

      const label = document.createElement("label");
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
    )[1];
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

let salutation_ = "";
let organizationName_ = "";
let vendorType_ = "";
let relationshipDuration_ = "";
let contactPerson_ = "";
let lastName_ = "";
let contactEmail_ = "";
let contactPhoneNumber_ = "";
let categories_ = new Set();
let categoryString_ = "";

let organizationName = document.getElementById("vendor-organization-name");
let relationshipDuration = document.getElementById("relationship-duration");
let contactPerson = document.getElementById("contact-person");
let lastName = document.getElementById("last-name");
let contactEmail = document.getElementById("contact-email");
let contactPhoneNumber = document.getElementById("contact-phone-number");
let categoryDropdownOption = document.querySelectorAll("input[type=checkbox]");
let vendorTypeDropdownOption =
  document.getElementsByClassName("vendor-type-item");
let allCategory = document.getElementById("all-category");
let allVendorTypes = document.getElementById("all-vendor-types");
let salutation = document.getElementById("salutation");
let salutationItem = document.getElementsByClassName("salutation-item");

function removeBorder(column) {
  if (column.classList.contains("empty-field-border")) {
    column.classList.remove("empty-field-border");
  }
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
  if (isNullOrEmpty(salutation_)) {
    const error_element = document.getElementById("salutation-error");
    showErrorMessage(error_element, "");
    salutation.classList.add("empty-field-border");
    checkResult = false;
  }
  if (isNullOrEmpty(organizationName_)) {
    const error_element = document.getElementById("orgName-error");
    showErrorMessage(error_element, "Please Select Organization Name");
    organizationName.classList.add("empty-field-border");
    checkResult = false;
  }
  if (categories_.size === 0) {
    const error_element = document.getElementById("category-error");
    showErrorMessage(error_element, "Please select category");
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
    showErrorMessage(error_element, "Please enter mobile number");
    relationshipDuration.classList.add("empty-field-border");
    checkResult = false;
  }
  if (isNullOrEmpty(contactPerson_)) {
    const error_element = document.getElementById("name-error");
    showErrorMessage(error_element, "Please enter first name");
    contactPerson.classList.add("empty-field-border");
    checkResult = false;
  }
  if (isNullOrEmpty(lastName_)) {
    const error_element = document.getElementById("l-name-error");
    showErrorMessage(error_element, "Please enter last name");
    lastName.classList.add("empty-field-border");
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
    showErrorMessage(error_element, "Please enter contact person phone number");
    contactPhoneNumber.classList.add("empty-field-border");
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

  if (!validatePhoneNumber(relationshipDuration_)) {
    const error_ele = document.getElementById("relationship-duration-error");
    showErrorMessage(error_ele, "Please enter correct phone number");
    checkResult = false;
  }
  return checkResult;
};

function validatePhoneNumber(phoneNumber) {
  console.log("ph", phoneNumber);
  const phoneRegex = /^\d{10}$/;
  return phoneRegex.test(phoneNumber);
}

export async function handleDataChange() {
  organizationName = document.getElementById("vendor-organization-name");
  relationshipDuration = document.getElementById("relationship-duration");
  contactPerson = document.getElementById("contact-person");
  lastName = document.getElementById("last-name");
  contactEmail = document.getElementById("contact-email");
  contactPhoneNumber = document.getElementById("contact-phone-number");
  allCategory = document.getElementById("all-category");
  allCategory.value = categoryString_;
  categoryDropdownOption = document.querySelectorAll("input[type=checkbox]");
  vendorTypeDropdownOption =
    document.getElementsByClassName("vendor-type-item");
  allVendorTypes = document.getElementById("all-vendor-types");
  allVendorTypes.value = vendorType_;
  salutation = document.getElementById("salutation");
  salutation.value = salutation_;
  salutationItem = document.getElementsByClassName("salutation-item");
  categories_ = new Set();

  const categoryDropdownOptionArr = [...categoryDropdownOption];
  const catArr = allCategory.value.split(";");

  categoryDropdownOptionArr.map((category) => {
    if (catArr.includes(category.value)) {
      category.setAttribute("checked", true);
      categories_.add(category.value);
    }
  });

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
        categoryString_ = string;
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

  const salutationArr = [...salutationItem];
  salutationArr.map((vendorType) => {
    vendorType.addEventListener("change", (e) => {
      removeBorder(salutation);
      document.getElementById("salutation-error").classList.add("hidden");
      if (vendorType.checked) {
        salutation_ = e.target.value;
      }

      if (salutation_ == "") {
        salutation.value = "Select Vendor Types";
      } else {
        salutation.value = salutation_;
      }

      const salutationDropdown = document.getElementById("salutation-dropdown");
      salutationDropdown.classList.add("hidden");
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

  lastName.value = lastName_;
  lastName.addEventListener("input", (e) => {
    removeBorder(lastName);
    lastName_ = e.target.value;
    document.getElementById("l-name-error").classList.add("hidden");
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
}

const dataAndCheck = () => {
  const categoriesIds = [];
  categories_.forEach((c) => {
    categoriesIds.push(mapCategoryToId[c]);
  });

  const vendorTypeId = mapVendorTypeToId[vendorType_];

  const postData = {
    salutation: salutation_,
    companyName: organizationName_,
    typeId: vendorTypeId,
    firstName: contactPerson_,
    lastName: lastName_,
    workPhone: contactPhoneNumber_,
    mobilePhone: relationshipDuration_,
    email: contactEmail_,
    relationshipDuration: relationshipDuration_,
    categoryIds: categoriesIds,
  };

  console.log(postData);

  salutation_ = salutation_.trim();
  organizationName_ = organizationName_.trim();
  relationshipDuration_ = relationshipDuration_.trim();
  contactEmail_ = contactEmail_.trim();
  contactPhoneNumber_ = contactPhoneNumber_.trim();
  contactPerson_ = contactPerson_.trim();
  lastName_ = lastName_.trim();
  vendorType_ = vendorType_.trim();

  console.log(postData);

  if (!checkFieldValues()) {
    console.log("all fields are mandatory");
    return null;
  }
  return postData;
};

export async function getVendorFormInformation() {
  const postData = dataAndCheck();
  return postData;
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

export async function clearVendorData() {
  salutation_ = "";
  organizationName_ = "";
  vendorType_ = "";
  contactPerson_ = "";
  lastName_ = "";
  contactPhoneNumber_ = "";
  contactEmail_ = "";
  relationshipDuration_ = "";
  categoryString_ = "";
}

export const updateVendorObj = (obj) => {
  console.log("OBJ", obj);
  salutation_ = obj.salutation;
  organizationName_ = obj.companyName;
  vendorType_ = obj.vendorType;
  contactPerson_ = obj.contactPerson;
  lastName_ = obj.lastName;
  contactPhoneNumber_ = obj.contactPhoneNumber;
  contactEmail_ = obj.contactEmail;
  relationshipDuration_ = obj.mobilePhone;
  categoryString_ = obj.categoryString;

  console.log("--->", categoryString_);
  const cat = categoryString_.split(";");
  // for (let v in cat) {
  //   categories_.add(v);
  // }
  cat.map((c) => {
    categories_.add(c);
  });
  console.log("CCC", cat);
  console.log(categories_);
};
