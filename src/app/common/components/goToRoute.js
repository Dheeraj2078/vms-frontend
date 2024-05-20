export const goToRoute = (pageHtml, formHtml, handleCross, handleAddBtn) => {
  const homeRoot = document.querySelector("main");
  console.log(homeRoot);
  homeRoot.innerHTML = pageHtml;
  // const div = document.createElement("div");
  // div.innerHTML = pageHtml;
  // homeRoot.appendChild(div);

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
  const mainContainer = document.getElementsByClassName("main-container")[0];
  mainContainer.classList.add("blur-background");
  // document.body.classList.add("overflow-hidden");
};

export const goToPurchaseOrderUtil = (pageHtml) => {
  const homeRoot = document.querySelector("main");
  console.log(homeRoot);
  homeRoot.innerHTML = pageHtml;
  // const div = document.createElement("div");
  // div.innerHTML = pageHtml;
  // homeRoot.appendChild(div);

  // const vendorFormOutput = document.getElementById("form-output");
  // vendorFormOutput.innerHTML = formHtml;

  // const addVendorsButton = document.getElementById("add-button");
  // addVendorsButton.addEventListener("click", (e) => {
  //   vendorFormOutput.classList.remove("hidden");
  //   const vendorFormCross = document.getElementById("form-cross");
  //   vendorFormCross.addEventListener("click", (e) => {
  //     handleCross();
  //   });

  //   const vendorFormCancel = document.getElementsByClassName("form-cancel")[0];
  //   vendorFormCancel.addEventListener("click", (e) => {
  //     handleCross();
  //   });

  //   changeBackgroundOnModal();
  // });

  // const addVendorBtn = document.getElementById("add-to-db");
  // addVendorBtn.addEventListener("click", handleAddBtn);
};
