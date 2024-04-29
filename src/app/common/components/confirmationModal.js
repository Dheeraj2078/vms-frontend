import { changeBackgroundOnModal } from "./goToRoute";
import confirmationModalHtml from "./confirmationModal.html";
import { successModal } from "./successModal";

export const confirmationModal = (message, action, handleCross, showError) => {
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
        successModal("Category Deleted", handleCross);
      }
    } catch (error) {
      showError();
      console.log("This category is already the part of some vendor");
    }
  });
  no.addEventListener("click", (e) => {
    handleCross();
  });
};
