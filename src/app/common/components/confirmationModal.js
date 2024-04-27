import { changeBackgroundOnModal } from "./goToRoute";
import confirmationModalHtml from "./confirmationModal.html";
import { successModal } from "./successModal";

export const confirmationModal = (
  message,
  action,
  handleCross,
  showError,
  successModalMessage = "Category Deleted"
) => {
  changeBackgroundOnModal();
  const vendorFormOutput = document.getElementById("form-output");
  vendorFormOutput.innerHTML = confirmationModalHtml;
  vendorFormOutput.classList.remove("hidden");

  const confirmationMessage = document.getElementById("confirmation-message");
  confirmationMessage.innerHTML = message;

  const yes = document.getElementById("yes");
  const no = document.getElementById("no");

  yes.addEventListener("click", async (e) => {
    try {
      const res = await action();
      console.log("res", res);
      if (res.error == null) {
        successModal(successModalMessage, handleCross);
      }
    } catch (error) {
      showError();

      console.log(error);
    }
  });
  no.addEventListener("click", (e) => {
    handleCross();
  });
};

export const confirmationModalWithoutApi = (message, action, handleCross) => {
  console.log("fn", handleCross);

  const vendorFormOutput = document.getElementById("form-output");
  vendorFormOutput.innerHTML = confirmationModalHtml;
  vendorFormOutput.classList.remove("hidden");

  const confirmationMessage = document.getElementById("confirmation-message");
  confirmationMessage.innerHTML = message;

  const yes = document.getElementById("yes");
  const no = document.getElementById("no");

  yes.addEventListener("click", async (e) => {
    action();
  });
  no.addEventListener("click", handleCross());

  changeBackgroundOnModal();
};
