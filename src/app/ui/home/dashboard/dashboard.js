import dashBoardHtml from "../dashboard/dashboard.html";

export default function goToDashboard() {
  const homeRoot = document.getElementsByClassName("container")[0];
  homeRoot.innerHTML = dashBoardHtml;
  console.log("D", dashBoardHtml);
  console.log(vendorRoute);
}
