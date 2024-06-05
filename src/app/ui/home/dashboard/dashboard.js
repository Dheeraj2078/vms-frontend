import dashBoardHtml from "../dashboard/dashboard.html";
import signatureHtml from "./signature.html";
import { getTopEvents } from "../../../../app/service/expenditureApi";
import { Chart, registerables } from "chart.js";
import { createTableHeader } from "../../../common/components/table";
import { saveSignature, getDashboardData } from "../../../service/dashboard";
import { format } from "path-browserify";
Chart.register(...registerables);

const showLoader = () => {
  const loader = document.getElementById("loader");
  const content = document.querySelector("main");
  loader.classList.remove("hidden");
  content.style.display = "none";
};

const removeLoader = () => {
  const loader = document.getElementById("loader");
  const content = document.querySelector("main");
  loader.classList.add("hidden");
  content.style.display = "block";
};

export default async function goToDashboard() {
  sessionStorage.setItem("tab", "dashboard");
  const homeRoot = document.querySelector("main");
  homeRoot.innerHTML = dashBoardHtml;
  console.log("D", dashBoardHtml);
  console.log(vendorRoute);
  showLoader();

  // addSignature();
  showGraph();
  // await createDashBoardTable();
  // await populateDashBoard();

  const apiCalls = [createDashBoardTable(), populateDashBoard()];

  try {
    await Promise.all(apiCalls);
    console.log("Both API calls have completed successfully.");
    removeLoader();
  } catch (error) {
    console.error("An error occurred while loading the dashboard data:", error);
    removeLoader();
  }
}

export const showGraph = () => {
  // let ctx = document.getElementById("myChart");
  // console.log("ctx", ctx);
  var ctx = document.getElementById("myChart").getContext("2d");
  console.log("ctx", ctx);
  var myChart = new Chart(ctx, {
    type: "line", // Change this to the type of chart you want to create
    data: {
      labels: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug"],
      datasets: [
        {
          label: "expenditure",
          data: [12, 19, 3, 5, 2, 3, 7, 1],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
};

const createDashBoardTable = async () => {
  const response = await getTopEvents(3);
  const data = response.data;

  const poTable = document.getElementsByClassName(
    "dashboard-table-container"
  )[0];
  poTable.innerHTML = "";

  const table = createTableHeader(["Id", "EVENT", "DATE", "BUDGET"]);
  const tBody = document.createElement("tbody");
  tBody.classList.add("table-body");

  poTable.appendChild(table);

  data.map((event) => {
    const row = document.createElement("tr");

    let div = document.createElement("td");
    div.innerHTML = event.id;
    row.appendChild(div);

    div = document.createElement("td");
    div.innerHTML = event.name;
    row.appendChild(div);

    div = document.createElement("td");
    div.innerHTML = event.date;
    row.appendChild(div);

    div = document.createElement("td");
    div.innerHTML = event.budget;
    row.appendChild(div);

    tBody.appendChild(row);
  });

  table.appendChild(tBody);
};

const populateDashBoard = async () => {
  const result = await getDashboardData();
  if (!result.error) {
    const vendorData = result.data.vendorDetails;
    const expenditure = result.data.expenditure;

    document.getElementById("vendor-totalCount").innerText =
      vendorData.vendorCount;
    const innerContainer = document.getElementById("vendorDetails");
    innerContainer.innerHTML = "";
    let child = "";
    vendorData.typeCount.map((vendor) => {
      child += `<p>
    ${vendor.type} : <span id="count">${vendor.count}</span>
  </p>`;
    });
    innerContainer.innerHTML = child;

    const currencyFormatter = new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    });

    document.getElementsByClassName("dashboard-amount")[0].innerText =
      currencyFormatter.format(expenditure.totalExpenditure);

    const expenditureCards =
      document.getElementsByClassName("expenditure-card");
    const expenditureCardsArr = [...expenditureCards];
    let index = 0;
    // expenditure.categoryExpenditures.forEach((exp) => {
    //   expenditureCardsArr[index].getElementsByClassName(
    //     "expenditure-price"
    //   )[0].innerText = exp.expenditure;
    //   expenditureCardsArr[index].getElementsByClassName(
    //     "expenditure-name"
    //   )[0].innerText = exp.name;
    // });
    expenditureCardsArr.forEach((element) => {
      element.getElementsByClassName("expenditure-price")[0].innerText =
        currencyFormatter.format(
          expenditure.categoryExpenditures[index].expenditure
        );
      element.getElementsByClassName("expenditure-name")[0].innerText =
        expenditure.categoryExpenditures[index].name;
      index++;
    });
  }
};
