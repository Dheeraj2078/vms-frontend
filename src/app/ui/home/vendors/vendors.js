import vendorHtml from "../vendors/vendors.html";

export default function goToVendor() {
  const vendorRoute = document.getElementById("vendorRoute");
  const homeRoot = document.getElementById("home-root");
  homeRoot.innerHTML = vendorHtml;

  console.log(vendorHtml);
  console.log(vendorRoute);

  const addVendorsButton = document.getElementById("add-vendors-button");
  addVendorsButton.addEventListener("click", (e) => {
    console.log("adding vendors...");
  });
}
