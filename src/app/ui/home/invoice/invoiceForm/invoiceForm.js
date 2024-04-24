import goToInvoice from "../invoice";

export function handleCross() {
  const vendorFormOutput = document.getElementById("form-output");
  vendorFormOutput.classList.add("hidden");

  const mainContainer = document.getElementById("main-container");
  mainContainer.classList.remove("blur-background");
  document.body.classList.remove("overflow-hidden");

  goToInvoice();
}

export function handleAddInvoice() {}
