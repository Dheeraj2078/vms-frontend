import { changeBackgroundOnModal } from "./goToRoute";
import confirmationModalHtml from "./confirmationModal.html";
import { successModal } from "./successModal";
import { defaultRoute } from "../navbar";

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

const handleCrossGeneral = () => {
  console.log("handle genral");
  const vendorFormOutput = document.getElementById("form-output");
  vendorFormOutput.classList.add("hidden");

  const mainContainer = document.getElementsByClassName("main-container")[0];
  mainContainer.classList.remove("blur-background");
  document.body.classList.remove("overflow-hidden");

  defaultRoute();
};

export const confirmationModalWithoutApi = (message, action) => {
  console.log(message);
  const vendorFormOutput = document.getElementById("form-output");
  vendorFormOutput.innerHTML = confirmationModalHtml;
  vendorFormOutput.classList.remove("hidden");

  const confirmationMessage = document.getElementById("confirmation-message");
  confirmationMessage.innerHTML = message;

  const yes = document.getElementById("yes");
  const no = document.getElementById("no");
  console.log("no", no);

  yes.addEventListener("click", async (e) => {
    action();
  });
  no.addEventListener("click", () => handleCrossGeneral());

  changeBackgroundOnModal();
};
