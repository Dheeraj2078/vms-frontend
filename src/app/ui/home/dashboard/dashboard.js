import dashBoardHtml from "../dashboard/dashboard.html";
import signatureHtml from "./signature.html";
import { getTopEvents } from "../../../../app/service/expenditureApi";
import { Chart, registerables } from "chart.js";
import { createTableHeader } from "../../../common/components/table";
import { saveSignature } from "../../../service/dashboard";
Chart.register(...registerables);

export default function goToDashboard() {
  sessionStorage.setItem("tab", "dashboard");
  const homeRoot = document.querySelector("main");
  homeRoot.innerHTML = dashBoardHtml;
  console.log("D", dashBoardHtml);
  console.log(vendorRoute);

  // addSignature();
  showGraph();
  createDashBoardTable();
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

    // div = document.createElement("td");
    // div.innerHTML = event.status;
    // row.appendChild(div);

    tBody.appendChild(row);
  });

  table.appendChild(tBody);
};
