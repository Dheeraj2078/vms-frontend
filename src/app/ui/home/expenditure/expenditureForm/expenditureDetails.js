import { successModal } from "../../../../common/components/successModal";
import { createTableHeader } from "../../../../common/components/table";
import {
  getExpenditureById,
  postExpenditure,
} from "../../../../service/expenditureApi";
import addExpenditureFormHtml from "./addExpenditureForm.html";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

export const showEventDetail = (event) => {
  const eventName = document.getElementsByClassName("top-heading")[0];
  eventName.innerHTML = event.name;

  const eventDescription =
    document.getElementsByClassName("event-description")[0];
  eventDescription.innerHTML = event.description;

  const totalExpenditureCard = document.getElementsByClassName(
    "expenditure-right-wrapper"
  )[0];
  totalExpenditureCard.innerHTML = "";

  // 1
  let div = document.createElement("div");
  div.classList.add("total-expenditure-card");
  const totalBudget = document.createElement("p");
  totalBudget.innerHTML = "Total Budget";

  let p = document.createElement("p");
  p.innerHTML = "&#8377;" + event.budget;

  div.appendChild(totalBudget);
  div.appendChild(p);
  totalExpenditureCard.appendChild(div);

  // 2
  div = document.createElement("div");
  div.classList.add("total-expenditure-card");
  const totalExpense = document.createElement("p");
  totalExpense.innerHTML = "Total Expense";

  p = document.createElement("p");
  p.innerHTML = "&#8377;" + event.budget;
  p.id = "event-expense";

  div.appendChild(totalExpense);
  div.appendChild(p);
  totalExpenditureCard.appendChild(div);

  const addButton = document.getElementById("add-button");
  addButton.addEventListener("click", () => showModal(event));

  createExpensesTable(event);
};

const showModal = (event) => {
  const vendorFormOutput = document.getElementById("form-output");
  vendorFormOutput.innerHTML = addExpenditureFormHtml;

  const addVendorsButton = document.getElementById("add-button");
  addVendorsButton.addEventListener("click", (e) => {
    vendorFormOutput.classList.remove("hidden");
    const vendorFormCross = document.getElementById("form-cross");
    vendorFormCross.addEventListener("click", (e) => {
      handleCross();
    });

    const vendorFormCancel = document.getElementsByClassName("form-cancel")[0];
    vendorFormCancel.addEventListener("click", (e) => {
      handleCross();
    });

    changeBackgroundOnModal();
  });

  handleDataChange();
  const addToDb = document.getElementById("add-to-db");
  addToDb.addEventListener("click", () => handleAddEvent(event));
};

export const changeBackgroundOnModal = () => {
  const mainContainer = document.getElementsByClassName("main-container")[0];
  mainContainer.classList.add("blur-background");
  document.body.classList.add("overflow-hidden");
};

let eventName_ = "";
let eventDate_ = "";
let eventExpenditure_ = "";
let eventDescription_ = "";
// let eventMemory_ = "";

let eventName = document.getElementById("event-name");
let eventDate = document.getElementById("event-date");
let eventExpenditure = document.getElementById("event-expenditure");
let eventDescription = document.getElementById("event-description");
// let eventMemory = document.getElementById("event-memory");

const handleDataChange = () => {
  eventName = document.getElementById("event-name");
  eventDescription = document.getElementById("event-description");
  eventDate = document.getElementById("event-date");
  eventExpenditure = document.getElementById("event-expenditure");
  // eventMemory = document.getElementById("event-memory");

  eventName_ = eventName.value;
  eventName.addEventListener("input", (e) => {
    document.getElementById("event-name-error").classList.add("hidden");
    removeBorder(eventName);
    eventName_ = e.target.value;
  });

  eventDate_ = eventDate.value;
  eventDate.addEventListener("input", (e) => {
    document.getElementById("event-date-error").classList.add("hidden");
    removeBorder(eventDate);
    eventDate_ = e.target.value;
  });

  eventExpenditure_ = eventExpenditure.value;
  eventExpenditure.addEventListener("input", (e) => {
    document.getElementById("event-expenditure-error").classList.add("hidden");
    removeBorder(eventExpenditure);
    eventExpenditure_ = e.target.value;
  });

  eventDescription_ = eventDescription.value;
  eventDescription.addEventListener("input", (e) => {
    eventDescription_ = e.target.value;
  });

  // eventMemory_ = eventMemory.value;
  // eventMemory.addEventListener("input", (e) => {
  //   eventMemory_ = e.target.value;
  // });
};

export async function handleAddEvent(event) {
  eventName_ = eventName_.trim();
  eventDescription_ = eventDescription_.trim();

  if (!checkFieldValues()) {
    return;
  }

  const posteventData = {
    name: eventName_,
    amount: parseFloat(eventExpenditure_),
    date: eventDate_,
    description: eventDescription_,
  };

  try {
    console.log("expenditure", posteventData);

    const postExpData = [];
    postExpData.push(posteventData);
    const res = await postExpenditure(postExpData, event.id);
    // const res = await postEvent(posteventData);
    if (res.error == null) {
      successModal("Event added", () => handleCross(event));
    }
  } catch (error) {
    console.log(error);
  }
}

const checkFieldValues = () => {
  let checkResult = true;
  if (isNullOrEmpty(eventName_)) {
    const error_element = document.getElementById("event-name-error");
    showErrorMessage(error_element, "Please enter event name");
    eventName.classList.add("empty-field-border");
    checkResult = false;
  }

  if (isNullOrEmpty(eventExpenditure_)) {
    const error_element = document.getElementById("event-expenditure-error");
    showErrorMessage(error_element, "Please enter event expenditure");
    eventExpenditure.classList.add("empty-field-border");
    checkResult = false;
  }
  if (isNullOrEmpty(eventDate_)) {
    const error_element = document.getElementById("event-date-error");
    console.log(error_element);
    showErrorMessage(error_element, "Please enter event date");
    eventDate.classList.add("empty-field-border");
    checkResult = false;
  }

  return checkResult;
};

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
  if (error_element) {
    error_element.innerHTML = text;
    error_element.classList.remove("hidden");
  }
};

function removeBorder(column) {
  if (column.classList.contains("empty-field-border")) {
    column.classList.remove("empty-field-border");
  }
}

function handleCross(event) {
  const vendorFormOutput = document.getElementById("form-output");
  vendorFormOutput.classList.add("hidden");
  const mainContainer = document.getElementsByClassName("main-container")[0];
  mainContainer.classList.remove("blur-background");
  document.body.classList.remove("overflow-hidden");
  showEventDetail(event);
}

async function createExpensesTable(event) {
  const response = await getExpenditureById(event.id);
  console.log("ID ->", event.id);
  const data = response.data;

  const categoriesTable =
    document.getElementsByClassName("expenditure-table")[0];
  categoriesTable.innerHTML = "";

  const table = createTableHeader([
    "Id",
    "Name",
    "Description",
    "Date",
    "Expense",
  ]);

  categoriesTable.appendChild(table);

  // const categories = await getCategoriesData();

  const labelAsName = [],
    dataAsAmount = [];
  const tBody = document.createElement("tbody");
  tBody.classList.add("table-body");
  tBody.style.height = "330px";

  let totalExpense = 0;
  data.map((expenditure) => {
    const row = document.createElement("tr");
    // row.addEventListener("click", () => showEventDetails(expenditure));

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
    div.innerHTML = expenditure.amount;
    row.appendChild(div);
    totalExpense += expenditure.amount;

    tBody.appendChild(row);

    labelAsName.push(expenditure.name);
    dataAsAmount.push(expenditure.amount);
  });

  table.appendChild(tBody);

  console.log("da da", data);
  const eventExpense = document.getElementById("event-expense");
  eventExpense.innerHTML = "&#8377;" + totalExpense;

  showExpenditureGraphs(labelAsName, dataAsAmount);
}

let myChart;
const showExpenditureGraphs = async (labelAsName, dataAsAmount) => {
  // const expenditureCardStats = document.getElementsByClassName(
  //   "expenditure-card-stats"
  // )[0];
  // expenditureCardStats.innerHTML = "";

  const color = [
    "rgba(255, 99, 132)",
    "rgba(54, 162, 235)",
    "rgba(255, 206, 86)",
    "rgba(75, 192, 192)",
  ];

  if (myChart) {
    myChart.destroy();
  }

  var ctx = document.getElementById("expenditure-graph").getContext("2d");

  console.log("ctx", ctx);
  myChart = new Chart(ctx, {
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
    },
  });
};
