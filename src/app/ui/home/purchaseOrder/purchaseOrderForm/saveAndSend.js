import {
  postPurchaseOrder,
  sendPurchaseOrderMail,
} from "../../../../service/purchaseOrder";
import goToPurchaseOrder from "../purchaseOrder";
import { checkFieldValuesForPo } from "./purchaseOrderForm";
import purchaseOrderFormPreviewHtml from "./purchaseOrderFormPreview.html";

export const createWord = () => {
  const boldBtn = document.getElementById("bold-btn");
  const italicBtn = document.getElementById("italic-btn");
  const underlineBtn = document.getElementById("underline-btn");
  const strikethroughBtn = document.getElementById("strikethrough-btn");
  boldBtn.addEventListener("click", (e) => {
    formatText("bold");
  });
  italicBtn.addEventListener("click", (e) => {
    formatText("italic");
  });
  underlineBtn.addEventListener("click", (e) => {
    formatText("underline");
  });
  strikethroughBtn.addEventListener("click", (e) => {
    formatText("strikethrough");
  });

  console.log("RRR");
  function formatText(command) {
    document.execCommand(command, false, null);
    updateActiveButtons();
  }

  function updateActiveButtons() {
    document
      .getElementById("bold-btn")
      .classList.toggle("active", document.queryCommandState("bold"));
    document
      .getElementById("italic-btn")
      .classList.toggle("active", document.queryCommandState("italic"));
    document
      .getElementById("underline-btn")
      .classList.toggle("active", document.queryCommandState("underline"));
    document
      .getElementById("strikethrough-btn")
      .classList.toggle("active", document.queryCommandState("strikethrough"));
  }

  document
    .querySelector(".editor")
    .addEventListener("keyup", updateActiveButtons);
  document
    .querySelector(".editor")
    .addEventListener("mouseup", updateActiveButtons);
};

export const showPdfPreview = () => {
  const emailPdf = document.getElementsByClassName("email-pdf")[0];
  emailPdf.addEventListener("click", () => {
    const formOutput = document.getElementById("form-output");
    formOutput.innerHTML = purchaseOrderFormPreviewHtml;
    formOutput.classList.remove("hidden");
    formOutput.classList.add("form-scroll");
    changeBackgroundOnModal();

    const formCancel = document.getElementsByClassName("form-cancel")[0];
    formCancel.addEventListener("click", (e) => {
      // handleCross();
      formOutput.classList.add("hidden");
      formOutput.classList.remove("form-scroll");

      const mainContainer =
        document.getElementsByClassName("main-container")[0];
      mainContainer.classList.remove("blur-background");
      document.body.classList.remove("overflow-hidden");
    });

    handleAddingRowsToTable();
  });
};

export const changeBackgroundOnModal = () => {
  const mainContainer = document.getElementsByClassName("main-container")[0];
  mainContainer.classList.add("blur-background");
  // document.body.classList.add("overflow-hidden");
};

export const handleAddingRowsToTable = () => {
  let tableData = JSON.parse(localStorage.getItem("poTableData")) || [];
  const table = document.querySelector("table");
  const tBody = document.createElement("tbody");
  tBody.classList.add("table-body");
  tableData.map((item) => {
    const tr = document.createElement("tr");

    let td = document.createElement("td");
    const itemDetails = item[0];
    td.innerHTML = itemDetails;
    tr.appendChild(td);

    td = document.createElement("td");
    const itemAccount = item[1];
    td.innerHTML = itemAccount;
    tr.appendChild(td);

    td = document.createElement("td");
    const itemQuantity = item[2];
    td.innerHTML = itemQuantity;
    tr.appendChild(td);

    td = document.createElement("td");
    const itemRate = item[3];
    td.innerHTML = itemRate;
    tr.appendChild(td);

    td = document.createElement("td");
    const itemTax = item[4];
    td.innerHTML = itemTax;
    tr.appendChild(td);

    td = document.createElement("td");
    const itemAmont = itemQuantity * itemRate;
    td.innerHTML = itemAmont;
    tr.appendChild(td);

    tBody.appendChild(tr);
  });

  table.appendChild(tBody);
  console.log("tBody", tBody);
};

// export const handlePostPurchaseOrder = (data) => {
//   const postPo = document.getElementById("post-po");
//   postPo.addEventListener("click", async (e) => {
//     const res = await postPurchaseOrder(data);
//     console.log("post pos", res);
//   });
// };

// export const sendMail = (data) => {
//   const postPo = document.getElementById("post-po");
//   postPo.addEventListener("click", async (e) => {
//     const res = await sendPurchaseOrderMail(data);
//     console.log("send email", res);
//   });
// };

export const handlePreviewDataFill = (
  vendorAddressDiv,
  deliveryAdressDiv,
  branchDiv
) => {
  console.log("v. ", vendorAddressDiv);
  console.log("d. ", deliveryAdressDiv);
  console.log("d. ", branchDiv);
};

export const handleMailOrDraftPo = (data, mailData) => {
  console.log(mailData);
  const postPo = document.getElementById("post-po");
  postPo.addEventListener("click", () =>
    preparePostData(data, mailData, "Issued")
  );

  const saveDraftPo = document.getElementById("save-draft-po");
  saveDraftPo.addEventListener("click", () =>
    preparePostData(data, mailData, "Draft")
  );
};

export const preparePostData = async (data, mailData, status) => {
  data["purchaseStatus"] = status;

  if (status == "Issued") {
    // sendPurchaseOrderMail
    const emailSubject = document.getElementsByClassName("email-subject")[0];
    mailData.emailSubject = emailSubject.value;

    const editor = document.getElementsByClassName("editor")[0];
    const bodyString = editor.outerHTML;

    console.log(bodyString);
    mailData.emailBody = bodyString;

    const res = await sendPurchaseOrderMail(mailData);
    console.log("mail send", res);
  }

  try {
    const res = await postPurchaseOrder(data);
    console.log("res", res);
    location.reload();
  } catch (error) {
    console.log("error", error);
  }

  // goToPurchaseOrder();
  // location.reload();
};
