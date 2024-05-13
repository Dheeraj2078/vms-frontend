import { getVendorFormDropdown } from "../../../../service/vendorsApi";
import { addVendor } from "../../../../service/vendorsApi";
import { successModal } from "../../../../common/components/successModal";
import goToVendor from "../vendors";

export function handleCross() {
  const vendorFormOutput = document.getElementById("form-output");
  vendorFormOutput.classList.add("hidden");

  const mainContainer = document.getElementsByClassName("main-container")[0];
  mainContainer.classList.remove("blur-background");
  document.body.classList.remove("overflow-hidden");

  goToVendor();
}

let mapCategoryToId = {};
let mapVendorTypeToId = {};
export async function handleMultipleDropdown() {
  const associatedCategorySelector = document.getElementById(
    "associated-category"
  );

  const associatedVendorType = document.getElementById(
    "associated-vendor-type"
  );

  try {
    const categoriesAndVendorType = await getVendorFormDropdown();

    const allCategories = categoriesAndVendorType.data.categories;
    const allVendorType = categoriesAndVendorType.data.vednorTypes;

    allCategories.map((category) => {
      const label = document.createElement("label");
      label.classList.add("category-dropdown-option");

      const input = document.createElement("input");
      input.type = "checkbox";
      input.value = category.name;
      label.appendChild(input);

      const div = document.createElement("div");
      div.innerHTML = category.name;
      label.appendChild(div);
      associatedCategorySelector.appendChild(label);

      mapCategoryToId[category.name] = category.id;
    });

    const allCategory = document.getElementsByClassName("dropdown-icon")[1];
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

      const label = document.createElement("label");
      label.setAttribute("for", vendorType.name);
      label.innerHTML = vendorType.name;

      div.appendChild(input);
      div.appendChild(label);

      associatedVendorType.appendChild(div);
      mapVendorTypeToId[vendorType.name] = vendorType.id;
    });

    const allVendorTypeDropdown =
      document.getElementsByClassName("dropdown-icon")[0];
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
const categories_ = new Set();

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
}

export async function handleDataChange() {
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

  const categoryDropdownOptionArr = [...categoryDropdownOption];

  categoryDropdownOptionArr.map((category) => {
    category.addEventListener("change", (e) => {
      removeBorder(allCategory);
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

  vendorTypeDropdownOptionArr.map((vendorType) => {
    vendorType.addEventListener("change", (e) => {
      removeBorder(allVendorTypes);
      if (vendorType.checked) {
        vendorType_ = e.target.value;
      }

      if (vendorType_ == "") {
        allVendorTypes.value = "Select Vendor Types";
      } else {
        allVendorTypes.value = vendorType_;
      }

      const associatedVendorType = document.getElementById(
        "associated-vendor-type"
      );
      associatedVendorType.classList.add("hidden");
    });
  });

  organizationName.addEventListener("input", (e) => {
    removeBorder(organizationName);
    organizationName_ = e.target.value;
  });
  relationshipDuration.addEventListener("input", (e) => {
    removeBorder(relationshipDuration);
    relationshipDuration_ = e.target.value;
  });
  contactPerson.addEventListener("input", (e) => {
    removeBorder(contactPerson);
    contactPerson_ = e.target.value;
  });
  contactEmail.addEventListener("input", (e) => {
    removeBorder(contactEmail);
    contactEmail_ = e.target.value;
  });
  contactPhoneNumber.addEventListener("input", (e) => {
    removeBorder(contactPhoneNumber);
    contactPhoneNumber_ = e.target.value;
  });
  vendorAddress.addEventListener("input", (e) => {
    removeBorder(vendorAddress);
    vendorAddress_ = e.target.value;
  });
}

export async function handleAddVendor() {
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

  let allValuesProvided = true;
  if (organizationName_ == "") {
    allValuesProvided = false;
    organizationName.classList.add("empty-field-border");
  }
  if (relationshipDuration_ == "") {
    allValuesProvided = false;
    relationshipDuration.classList.add("empty-field-border");
  }

  if (contactEmail_ == "") {
    allValuesProvided = false;
    contactEmail.classList.add("empty-field-border");
  }

  if (contactPhoneNumber_ == "") {
    allValuesProvided = false;
    contactPhoneNumber.classList.add("empty-field-border");
  }

  if (vendorAddress_ == "") {
    allValuesProvided = false;
    vendorAddress.classList.add("empty-field-border");
  }

  if (contactPerson_ == "") {
    allValuesProvided = false;
    contactPerson.classList.add("empty-field-border");
  }

  if (categories_.size == 0) {
    allValuesProvided = false;
    allCategory.classList.add("empty-field-border");
  }

  if (vendorType_ == "") {
    allValuesProvided = false;
    allVendorTypes.classList.add("empty-field-border");
  }

  if (allValuesProvided == false) {
    console.log("all fields are mandatory");
    return;
  }

  try {
    const res = await addVendor(postData);
    console.log(res);

    if (res.error == null) {
      successModal("Vendor Added", handleCross);
    }
  } catch (error) {
    console.log(error);
  }
}
