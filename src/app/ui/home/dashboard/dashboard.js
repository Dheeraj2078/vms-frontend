import dashBoardHtml from "../dashboard/dashboard.html";

export default function goToDashboard() {
  const homeRoot = document.querySelector("main");
  homeRoot.innerHTML = dashBoardHtml;
  console.log("D", dashBoardHtml);
  console.log(vendorRoute);
}
