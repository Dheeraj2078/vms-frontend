import { successModal } from "../../../../common/components/successModal";
import { postCategory } from "../../../../service/categoryApi";
import goToCategory from "../categories";

export function handleCross() {
  const vendorFormOutput = document.getElementById("form-output");
  vendorFormOutput.classList.add("hidden");

  const mainContainer = document.getElementsByClassName("main-container")[0];
  mainContainer.classList.remove("blur-background");
  document.body.classList.remove("overflow-hidden");

  goToCategory(0, 10, true);
}

function removeBorder(column, error) {
  if (!error.classList.contains("hidden")) {
    error.classList.add("hidden");
  }
  if (column.classList.contains("empty-field-border")) {
    column.classList.remove("empty-field-border");
  }
}

let categoryName_ = "";
let categoryDescription_ = "";

let categoryNameError = document.getElementsByClassName(
  "category-name-error"
)[0];
let categoryDescError = document.getElementsByClassName(
  "category-description-error"
)[0];
let categoryName = document.getElementById("category-name");
let categoryDescription = document.getElementById("category-description");

export function handleDataChange() {
  categoryName = document.getElementById("category-name");
  categoryDescription = document.getElementById("category-description");
  categoryNameError = document.getElementsByClassName("category-name-error")[0];
  categoryDescError = document.getElementsByClassName(
    "category-description-error"
  )[0];

  categoryName_ = categoryName.value;
  categoryName.addEventListener("input", (e) => {
    removeBorder(categoryName, categoryNameError);
    categoryName_ = e.target.value;
    const alreadyExists = document.getElementsByClassName("already-exists")[0];
    if (!alreadyExists.classList.contains("hidden")) {
      alreadyExists.classList.add("hidden");
    }
  });

  categoryDescription_ = categoryDescription.value;
  categoryDescription.addEventListener("input", (e) => {
    removeBorder(categoryDescription, categoryDescError);
    categoryDescription_ = e.target.value;
  });
}

export async function handleAddCategory() {
  let categoryNameError = document.getElementsByClassName(
    "category-name-error"
  )[0];
  let categoryDescError = document.getElementsByClassName(
    "category-description-error"
  )[0];
  categoryName_ = categoryName_.trim();
  categoryDescription_ = categoryDescription_.trim();

  let allValuesProvided = true;
  if (categoryName_ == "") {
    allValuesProvided = false;
    categoryName.classList.add("empty-field-border");
    categoryNameError.classList.remove("hidden");
  }
  if (categoryDescription_ == "") {
    allValuesProvided = false;
    categoryDescription.classList.add("empty-field-border");
    categoryDescError.classList.remove("hidden");
  }

  if (allValuesProvided == false) {
    return;
  }

  const postCategoryData = {
    name: categoryName_,
    description: categoryDescription_,
  };

  try {
    const res = await postCategory(postCategoryData);
    console.log("create category", res);

    categoryName_ = "";
    categoryDescription_ = "";

    if (res.error == null) {
      successModal("Category added", handleCross);
    }
  } catch (error) {
    console.log(error);
    const alreadyExists = document.getElementsByClassName("already-exists")[0];
    alreadyExists.classList.remove("hidden");
  }

  console.log(postCategoryData);
}
