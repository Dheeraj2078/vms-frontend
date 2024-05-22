import { formDetails } from "../../../../common/components/formDetails";
import { handleCross } from "../vendorForm/vendorForm";
import { getVendorsById } from "../../../../service/vendorsApi";

const getVendorInfo = async (vendorId) => {
  try {
    const vendorInfo = await getVendorsById(vendorId);

    const info = vendorInfo.data;

    const data = {
      "Vendor Company Name": info.companyName,
      "Vendor Company Address":
        info.billingAddress.addressLine1 +
        ", " +
        info.billingAddress.addressLine2,
      "Vendor Type": info.type,
      GST: info.gstin,
      "Contact Person Name": info.primaryContact.firstName,
      "Contact Person Phone": info.primaryContact.mobilePhone,
      "Contact Person Email": info.primaryContact.email,
    };

    console.log("info", info);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const vendorDetails = async (e) => {
  console.log("SSSSSSSSSSSSSS");
  console.log("_______", e.currentTarget);
  const id = e.currentTarget.id;
  console.log("ID", id);
  const vendorInfo = await getVendorInfo(id);
  console.log(vendorInfo);
  const vendorFormOutput = document.getElementById("form-output");
  const formStructure = formDetails("Vendor Details", vendorInfo);
  console.log(formStructure);
  vendorFormOutput.innerHTML = "";
  vendorFormOutput.appendChild(formStructure);

  vendorFormOutput.classList.remove("hidden");
  const vendorFormCross = document.getElementById("form-cross");
  vendorFormCross.addEventListener("click", (e) => {
    handleCross();
  });

  const vendorFormCancel = document.getElementsByClassName("form-cancel")[0];
  vendorFormCancel.addEventListener("click", (e) => {
    handleCross();
  });

  const mainContainer = document.getElementsByClassName("main-container")[0];
  mainContainer.classList.add("blur-background");
  // document.body.classList.add("overflow-hidden");
};
