import { formDetails } from "../../../../common/components/formDetails";
import { handleCross } from "../vendorForm/vendorForm";
import { getVendorsById } from "../../../../service/vendorsApi";
import { handleCrossWithoutReload } from "../../../../util/util";

const getVendorInfo = async (vendorId) => {
  try {
    const vendorInfo = await getVendorsById(vendorId);

    const info = vendorInfo.data;
    console.log("INFO", info);

    const data = {
      "Vendor Company Name": info.companyName ? info.companyName : "-",
      "Vendor Company Address":
        info.billingAddress.addressLine1 +
        ", " +
        info.billingAddress.addressLine2,
      "Vendor Type": info.type,
      GST: info.gstin,
      "Contact Person Name": info.primaryContact
        ? info.primaryContact.firstName
        : "-",
      "Contact Person Phone": info.primaryContact
        ? info.primaryContact.mobilePhone
        : "-",
      "Contact Person Email": info.primaryContact
        ? info.primaryContact.email
        : "-",
    };

    console.log("info", info);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const vendorDetails = async (e) => {
  const id = e.currentTarget.id;
  console.log("id =>", id);

  const vendorInfo = await getVendorInfo(id);

  const vendorFormOutput = document.getElementById("form-output");
  const formStructure = formDetails("Vendor Details", vendorInfo);

  vendorFormOutput.innerHTML = "";
  vendorFormOutput.appendChild(formStructure);

  vendorFormOutput.classList.remove("hidden");
  const vendorFormCross = document.getElementById("form-cross");
  vendorFormCross.addEventListener("click", (e) => {
    // handleCross();
    handleCrossWithoutReload();
  });

  const vendorFormCancel = document.getElementsByClassName("form-cancel")[0];
  vendorFormCancel.addEventListener("click", (e) => {
    // handleCross();
    handleCrossWithoutReload();
  });

  const mainContainer = document.getElementsByClassName("main-container")[0];
  mainContainer.classList.add("blur-background");
  // document.body.classList.add("overflow-hidden");
};
