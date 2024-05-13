import { formDetails } from "../../../../common/components/formDetails";
import { handleCross } from "../vendorFrom/vendorForm";
import { getVendorsById } from "../../../../service/vendorsApi";

const getVendorInfo = async (vendorId) => {
  try {
    const vendorInfo = await getVendorsById(vendorId);
    const info = vendorInfo.data;

    const data = {
      "Vendor Organization Name": info.organizationName,
      "Vendor Organization Address": info.address,
      "Vendor Type": info.vendorTypeId,
      "Relationship Duration": info.relationshipDuration,
      "Contact Person Name": info.contactPersonName,
      "Contact Person Phone": info.contactPersonNumber,
      "Contact Person Email": info.contactPersonEmail,
    };

    console.log("info", info);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const vendorDetails = async (e) => {
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

  const mainContainer =document.getElementsByClassName("main-container")[0];
  mainContainer.classList.add("blur-background");
  document.body.style.overflow = "hidden";
};
