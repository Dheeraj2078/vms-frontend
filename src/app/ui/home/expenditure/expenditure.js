import expenditureHtml from "./expenditure.html";
import expenditureFormHtml from "./expenditureForm/expenditureForm.html";
import {
  deleteCategoryById,
  getAllCategories,
} from "../../../service/categoryApi";
import { handleCross } from "./expenditureForm/expenditureForm";
import { noDataAdded } from "../../../common/components/emptyData";
import { createTableHeader } from "../../../common/components/table";
import {
  handleAddEvent,
  handleDataChange,
} from "./expenditureForm/expenditureForm";
import { goToRoute } from "../../../common/components/goToRoute";
import { confirmationModal } from "../../../common/components/confirmationModal";
import { searchCategories } from "../../../service/searchApi";
import { addPagination } from "../../../common/components/pagination";
import { searchModel } from "../../../common/components/search";
import {
  getAllEvents,
  getTopEvents,
  getTopExpenditure,
} from "../../../service/expenditureApi";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

import expenditureDetailsHtml from "./expenditureForm/expenditureDetails.html";
import { showEventDetail } from "./expenditureForm/expenditureDetails";

export default async function goToExpenditure() {
  sessionStorage.setItem("tab", "expenditure");
  goToRoute(expenditureHtml, expenditureFormHtml, handleCross, handleAddEvent);
  handleDataChange();

  //   const search = document.getElementById("internal-search");
  //   search.addEventListener("input", handleSearch);

  showExpenditureGraphs();
  searchModel("Search Events", filterResults);
  addPagination(getAllEvents, createExpenditureTable, "No Expenditure Found");
}

const showExpenditureGraphs = async () => {
  const response = await getTopEvents(4);

  console.log("getTopEvents", response);
  const data = response.data;

  const expenditureCardStats = document.getElementsByClassName(
    "expenditure-card-stats"
  )[0];
  expenditureCardStats.innerHTML = "";

  const labelAsName = [],
    dataAsAmount = [],
    color = [
      "rgba(231, 251, 232, 1)",
      "rgba(244, 234, 244, 1)",
      "rgba(254, 230, 230, 1)",
      "rgba(255, 245, 232, 1)",
    ];

  let total = 0;
  let i = 0;

  data.map((event) => {
    labelAsName.push(event.name);
    dataAsAmount.push(event.budget);
    total += event.budget;

    const div = document.createElement("div");
    div.classList.add("top-single-item");
    div.style.background = color[i++];

    const left = document.createElement("p");
    left.innerHTML = event.name;
    const right = document.createElement("p");
    right.innerHTML = "&#8377;" + event.budget;

    div.appendChild(left);
    div.appendChild(right);

    expenditureCardStats.appendChild(div);
  });

  const totalExpenditureCard = document.getElementsByClassName(
    "total-expenditure-card"
  )[0];

  // totalExpenditureCard.innerHTML = "&#8377;" + total;
  const eHeading = document.createElement("p");
  eHeading.innerHTML = "Total Expenditure";

  const p = document.createElement("p");
  p.innerHTML = "&#8377;" + total;

  totalExpenditureCard.appendChild(eHeading);
  totalExpenditureCard.appendChild(p);

  var ctx = document.getElementById("expenditure-graph").getContext("2d");

  console.log("ctx", ctx);
  var myChart = new Chart(ctx, {
    type: "doughnut", // Change this to the type of chart you want to create
    data: {
      labels: labelAsName,
      datasets: [
        {
          label: "expenditure",
          data: dataAsAmount,
          backgroundColor: [
            "rgba(231, 251, 232, 1)",
            "rgba(244, 234, 244, 1)",
            "rgba(254, 230, 230, 1)",
            "rgba(255, 245, 232, 1)",
          ],
          borderColor: [
            "rgba(231, 251, 232, 1)",
            "rgba(244, 234, 244, 1)",
            "rgba(254, 230, 230, 1)",
            "rgba(255, 245, 232, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        xAxes: [
          {
            gridLines: {
              display: false,
            },
          },
        ],
        yAxes: [
          {
            gridLines: {
              display: false,
            },
          },
        ],
      },
      plugins: {
        legend: {
          display: false,
        },
      },
      // rotation: -90,
      // circumference: 180,
    },
  });
};

function filterResults(value) {
  if (value.trim().length === 0) {
    addPagination(
      getAllCategories,
      createExpenditureTable,
      "No Category Found"
    );
    // const allContracts = await getCategoriesData();
    // if (allContracts == null || allContracts.length == 0) {
    //   const contactTable =
    //     document.getElementsByClassName("categories-table")[0];
    //   contactTable.innerHTML = `<h4>No Result Found for "${value}"`;
    // } else {
    //   const contracts = allContracts;
    //   createExpenditureTable(contracts);
    // }
  }
  if (value.length >= 2) {
    addPagination(
      getAllCategories,
      createExpenditureTable,
      "No Category Found",
      value
    );
    // const searchResult = await searchCategories(value);

    // if (searchResult.data == null || searchResult.data.length == 0) {
    //   // showEmptyPage();
    //   const contactTable =
    //     document.getElementsByClassName("categories-table")[0];
    //   contactTable.innerHTML = `<h4>No Result Found for "${value}"`;
    // } else {
    //   const contracts = searchResult.data;
    //   console.log(contracts);
    //   createExpenditureTable(contracts);
    //   addPagination(goToCategory, Maincursor);
    // }
  }
}

const createExpenditureTable = async (expenditures) => {
  console.log("expenditures", expenditures);
  const categoriesTable =
    document.getElementsByClassName("expenditure-table")[0];
  categoriesTable.innerHTML = "";

  const table = createTableHeader([
    "Id",
    "Name",
    "Description",
    "Date",
    "Budget",
    "Memory",
  ]);

  categoriesTable.appendChild(table);

  // const categories = await getCategoriesData();
  const tBody = document.createElement("tbody");
  tBody.classList.add("table-body");
  tBody.style.height = "330px";
  expenditures.map((expenditure) => {
    const row = document.createElement("tr");
    row.classList.add("cursor-pointer");
    row.addEventListener("click", () => showEventDetails(expenditure));

    let div = document.createElement("td");
    div.innerHTML = expenditure.id;
    row.appendChild(div);

    div = document.createElement("td");
    div.innerHTML = expenditure.name;
    row.appendChild(div);

    div = document.createElement("td");
    div.innerHTML = expenditure.description;
    row.appendChild(div);

    div = document.createElement("td");
    div.innerHTML = expenditure.date;
    row.appendChild(div);

    div = document.createElement("td");
    div.innerHTML = expenditure.budget;
    row.appendChild(div);

    div = document.createElement("td");
    div.innerHTML = "";
    const a = document.createElement("a");
    a.href = expenditure.link;
    a.target = "_blank";
    a.innerHTML = "Link";
    div.appendChild(a);

    row.appendChild(div);

    tBody.appendChild(row);

    // const pagination = document.createElement
  });

  table.appendChild(tBody);
};

const showEventDetails = (expenditure) => {
  const homeRoot = document.querySelector("main");
  console.log(homeRoot);
  homeRoot.innerHTML = expenditureDetailsHtml;

  console.log("-->", expenditure);
  showEventDetail(expenditure);
};
