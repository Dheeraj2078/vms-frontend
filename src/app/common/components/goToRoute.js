export const goToRoute = (pageHtml, formHtml, handleCross, handleAddBtn) => {
  const homeRoot = document.getElementById("home-root");
  homeRoot.innerHTML = pageHtml;

  const vendorFormOutput = document.getElementById("form-output");
  vendorFormOutput.innerHTML = formHtml;

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

  const addVendorBtn = document.getElementById("add-to-db");
  addVendorBtn.addEventListener("click", handleAddBtn);
};

export const changeBackgroundOnModal = () => {
  const mainContainer = document.getElementById("main-container");
  mainContainer.classList.add("blur-background");
  document.body.classList.add("overflow-hidden");
};
