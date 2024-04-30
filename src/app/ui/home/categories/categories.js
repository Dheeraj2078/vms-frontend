import categoriesHtml from "./categories.html";
import categoriesFormHtml from "./categoriesForm/categoriesForm.html";
import {
  deleteCategoryById,
  getAllCategories,
} from "../../../service/categoryApi";
import { handleCross } from "./categoriesForm/categoriesForm";
import { noDataAdded } from "../../../common/components/emptyData";
import { createTableHeader } from "../../../common/components/table";
import {
  handleAddCategory,
  handleDataChange,
} from "./categoriesForm/categoriesForm";
import { goToRoute } from "../../../common/components/goToRoute";
import { confirmationModal } from "../../../common/components/confirmationModal";

const getCategoriesData = async () => {
  try {
    const res = await getAllCategories();
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export default async function goToCategory() {
  goToRoute(categoriesHtml, categoriesFormHtml, handleCross, handleAddCategory);
  handleDataChange();
  createCategoryTable();

  const allAdmins = await getCategoriesData();
  console.log("all cats", allAdmins);
  if (allAdmins.length == 0) {
    const addBtn = document.getElementById("add-button");
    const div = noDataAdded("Category", addBtn);
    homeRoot.innerHTML = "";
    homeRoot.appendChild(div);
  }
}

async function deleteCategory(id) {
  console.log("IIT", id);
  try {
    const res = await deleteCategoryById(id);
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
}

const handleDeleteCategory = (e) => {
  const id = e.currentTarget.id;
  const question = "Are you sure you want to delete";

  const showError = () => {
    const errorMessage = document.getElementsByClassName("error-message")[0];
    errorMessage.classList.remove("hidden");
  };

  const reply = confirmationModal(
    question,
    () => deleteCategory(id),
    handleCross,
    showError
  );
  console.log("reply", reply);
};

const createCategoryTable = async () => {
  const categoriesTable =
    document.getElementsByClassName("categories-table")[0];

  const table = createTableHeader(["Name", "Description", "Action"]);

  categoriesTable.appendChild(table);

  const tBody = document.createElement("tbody");
  const categories = await getCategoriesData();
  categories.map((category) => {
    const row = document.createElement("tr");

    let div = document.createElement("td");
    div.innerHTML = category.name;
    row.appendChild(div);

    div = document.createElement("td");
    div.innerHTML = category.description;
    row.appendChild(div);

    div = document.createElement("td");
    const image = `/bdc1c14e14645f2b1d0a.png`; // TEMP

    div.innerHTML = `<img class="height-20" src=${image} />`;
    div.addEventListener("click", handleDeleteCategory);
    div.id = category.id;
    row.appendChild(div);

    tBody.appendChild(row);
  });
  table.appendChild(tBody)
};
