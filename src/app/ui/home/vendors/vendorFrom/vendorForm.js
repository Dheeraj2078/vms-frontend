export function handleCross() {
  const vendorFormOutput = document.getElementById("vendor-form-output");
  vendorFormOutput.classList.add("hidden");

  const mainContainer = document.getElementById("main-container");
  mainContainer.classList.remove("blur-background");
}
