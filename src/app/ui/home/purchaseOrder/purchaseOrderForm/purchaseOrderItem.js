import purchaseOrderItemHtml from "./purchaseOrderItem.html";

export const handleAddNewRow = () => {
  console.log("clicked");
  const vendorFormOutput = document.getElementById("form-output");
  vendorFormOutput.innerHTML = purchaseOrderItemHtml;

  vendorFormOutput.classList.remove("hidden");
  // const vendorFormCross = document.getElementById("form-cross");
  // vendorFormCross.addEventListener("click", (e) => {
  //   handleCross();
  // });

  // const vendorFormCancel = document.getElementsByClassName("form-cancel")[0];
  // vendorFormCancel.addEventListener("click", (e) => {
  //   handleCross();
  // });

  handleMultipleDropdownForItem();

  changeBackgroundOnModal();
};

let type_ = "";
let name_ = "";
let unit_ = "";
let sacOrHsn_ = "";
let taxPreference_ = "";
let sellingPrice_ = "";
let sAccount_ = "";
let sDescription_ = "";
let constPrice_ = "";
let cAccount_ = "";
let cDescription_ = "";
let intaTax_ = "";
let interTax_ = "";

const handleMultipleDropdownForItem = () => {
  const sacOrHsn = document.getElementsByClassName("sacOrHsn")[0];
  const serviceOrGoods = document.getElementsByClassName("serviceOrGoods");
  const serviceOrGoodsArr = [...serviceOrGoods];
  serviceOrGoodsArr.map((s) => {
    s.addEventListener("click", (e) => {
      if (e.target.value == "goods") {
        sacOrHsn.innerHTML = "HSN Code";
      } else {
        sacOrHsn.innerHTML = "SAC";
      }
    });
  });

  handleDataChange();
};

const handleDataChange = () => {};

export const changeBackgroundOnModal = () => {
  const mainContainer = document.getElementsByClassName("main-container")[0];
  mainContainer.classList.add("blur-background");
  document.body.classList.add("overflow-hidden");
};
