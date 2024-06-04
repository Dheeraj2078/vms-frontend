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

  addSignature();
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

export const addSignature = () => {
  console.log("addSignature: called");
  const signatureBtn = document.getElementById("signature-btn");
  console.log("signatureBtn:", signatureBtn);

  signatureBtn.addEventListener("click", (e) => {
    console.log("Signature button clicked");
    const vendorFormOutput = document.getElementById("form-output");
    vendorFormOutput.classList.remove("hidden");
    vendorFormOutput.innerHTML = signatureHtml;
    takeSignature();
    changeBackgroundOnModal();

    const vendorFormCross = document.getElementById("form-cross");
    vendorFormCross.addEventListener("click", (e) => {
      handleCross();
    });
  });
};

const takeSignature = () => {
  console.log("takeSignature: called");
  const canvas = document.getElementById("signature-pad");
  const ctx = canvas ? canvas.getContext("2d") : null;
  console.log("ctx", ctx);

  if (!canvas || !ctx) {
    console.error("Canvas or context not found");
    return;
  }

  let drawing = false;

  // Function to resize the canvas to be fully responsive
  function resizeCanvas() {
    console.log("Resizing canvas");
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    ctx.putImageData(data, 0, 0);
  }

  // Resize canvas on window resize
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  // Get the correct mouse position
  function getMousePos(canvas, event) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  }

  // Draw on the canvas
  canvas.addEventListener("mousedown", (event) => {
    console.log("mousedown event");
    drawing = true;
    ctx.beginPath();
    const pos = getMousePos(canvas, event);
    ctx.moveTo(pos.x, pos.y);
  });

  canvas.addEventListener("mouseup", () => {
    drawing = false;
  });

  canvas.addEventListener("mousemove", (event) => {
    if (drawing) {
      console.log("mousemove event");
      const pos = getMousePos(canvas, event);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    }
  });

  // Save the signature
  document
    .getElementById("save-signature")
    .addEventListener("click", async () => {
      console.log("Save signature button clicked");
      const dataURL = canvas.toDataURL();
      // document.getElementById("saved-signature").src = dataURL;
      // document.getElementById("saved-signature").style.display = "block";
      // localStorage.setItem("userSignature", dataURL);
      const res = await saveSignature(dataURL);
      console.log("save signature", res);

      // POST API CALL;
      handleCross();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

  // Clear the signature
  document.getElementById("clear-signature").addEventListener("click", () => {
    console.log("Clear signature button clicked");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  });
};

export const changeBackgroundOnModal = () => {
  const mainContainer = document.getElementsByClassName("main-container")[0];
  mainContainer.classList.add("blur-background");
  // document.body.classList.add("overflow-hidden");
};

const handleCross = () => {
  const vendorFormOutput = document.getElementById("form-output");
  vendorFormOutput.classList.add("hidden");

  const mainContainer = document.getElementsByClassName("main-container")[0];
  mainContainer.classList.remove("blur-background");
  document.body.classList.remove("overflow-hidden");
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
