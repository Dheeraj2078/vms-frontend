import successModalHtml from "./successModal.html";

export const successModal = (main, handleCross) => {
  const vendorFormOutput = document.getElementById("form-output");
  vendorFormOutput.innerHTML = successModalHtml;

  const message = document.getElementById("success-message");
  message.innerHTML = `${main} successfully`;

  const successModelCloseCross = document.getElementsByClassName(
    "success-model-close"
  )[0];
  const successModelCloseOk = document.getElementsByClassName(
    "success-model-close"
  )[1];
  successModelCloseCross.addEventListener("click", handleCross);
  successModelCloseOk.addEventListener("click", handleCross);
};
