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
import { searchCategories } from "../../../service/searchApi";

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
  sessionStorage.setItem("tab", "category");
  goToRoute(categoriesHtml, categoriesFormHtml, handleCross, handleAddCategory);
  handleDataChange();

  const search = document.getElementById("internal-search");
  search.addEventListener("input", handleSearch);

  const allAdmins = await getCategoriesData();
  console.log("all cats", allAdmins);
  if (allAdmins.length == 0) {
    const addBtn = document.getElementById("add-button");
    const div = noDataAdded("Category", addBtn);
    const homeRoot = document.getElementsByClassName("container")[0];
    homeRoot.innerHTML = "";
    homeRoot.appendChild(div);
  } else {
    createCategoryTable(allAdmins);
  }
}

const handleSearch = async (e) => {
  const value = e.target.value;
  if (value.length === 0) {
    const allContracts = await getCategoriesData();
    if (allContracts == null || allContracts.length == 0) {
      const contactTable =
        document.getElementsByClassName("categories-table")[0];
      contactTable.innerHTML = `<h4>No Result Found for "${value}"`;
    } else {
      const contracts = allContracts;
      createCategoryTable(contracts);
    }
  }
  if (value.length >= 2) {
    const searchResult = await searchCategories(value);

    if (searchResult.data == null || searchResult.data.length == 0) {
      // showEmptyPage();
      const contactTable =
        document.getElementsByClassName("categories-table")[0];
      contactTable.innerHTML = `<h4>No Result Found for "${value}"`;
    } else {
      const contracts = searchResult.data;
      console.log(contracts);
      createCategoryTable(contracts);
    }
  }
};

async function deleteCategory(id) {
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

const createCategoryTable = async (categories) => {
  const categoriesTable =
    document.getElementsByClassName("categories-table")[0];
  categoriesTable.innerHTML = "";

  const table = createTableHeader(["ID", "Name", "Description", "Action"]);

  categoriesTable.appendChild(table);

  // const categories = await getCategoriesData();
  categories.map((category) => {
    const row = document.createElement("tr");

    let div = document.createElement("td");
    div.innerHTML = category.id;
    row.appendChild(div);

    div = document.createElement("td");
    div.innerHTML = category.name;
    row.appendChild(div);

    div = document.createElement("td");
    div.innerHTML = category.description;
    row.appendChild(div);

    div = document.createElement("td");
    const image = `/9574521e3c2fb864b257.png`; // TEMP

    div.innerHTML = `<img class="height-20 btn-clickable" src=${image} />`;

    if (category.isUsed) {
      div.innerHTML = `
        <div>
          <img class="height-20 btn-disabled tooltip" src=${image} />
          <span class="tooltiptext hidden">vendor needs to be active for this action</span>
        </div>
      `;
    } else {
      div.innerHTML = `<img class="height-20 btn-clickable" src=${image} />`;
      div.addEventListener("click", handleDeleteCategory);
    }
    div.id = category.id;

    row.appendChild(div);

    table.appendChild(row);
  });

  const toolTip = document.getElementsByClassName("tooltip");
  if (toolTip) {
    const toolTipArr = [...toolTip];
    let i = 0;
    toolTipArr.map((tip) => {
      const I = i;
      tip.addEventListener("mouseenter", () => handleMouseEnter(I));
      tip.addEventListener("mouseleave", () => handleMouseLeave(I));
      i++;
    });
  }
};

function handleMouseEnter(i) {
  console.log("hover-element");
  const toolTipText = document.getElementsByClassName("tooltiptext");
  const toolTipTextArr = [...toolTipText];

  let I = 0;

  toolTipTextArr.map((single) => {
    console.log(i, " - ", I);
    if (i == I) {
      single.classList.remove("hidden");
    }
    I++;
  });
}

function handleMouseLeave(i) {
  console.log("hover-element");
  const toolTipText = document.getElementsByClassName("tooltiptext");
  const toolTipTextArr = [...toolTipText];

  let I = 0;

  toolTipTextArr.map((single) => {
    if (i == I) {
      single.classList.add("hidden");
    }
    I++;
  });
}
