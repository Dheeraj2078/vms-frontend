import contractHtml from "../contract/contract.html";
import contractFormHtml from "../../home/contract/contractForm/contractForm.html";
import {
  handleCross,
  handleAddContract,
  handleMultipleDropdown,
} from "./contractForm/contractForm";
// import { getAdmins } from "../../../service/admins";
import { createTableHeader } from "../../../common/components/table";
import { noDataAdded } from "../../../common/components/emptyData";
import { goToRoute } from "../../../common/components/goToRoute";
import {
  downloadContract,
  getAllContracts,
  searchContract,
} from "../../../service/contractsApi";

const getContractData = async () => {
  try {
    const res = await getAllContracts(0, 10);
    if (res.data.pagenationData.length == 0) {
      const next = await getAllContracts(1, 10);
      if (next.data.pagenationData.length == 0) {
        return res.data;
      } else {
        return next.data;
      }
    }
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export default async function goToContract() {
  goToRoute(contractHtml, contractFormHtml, handleCross, handleAddContract);

  const search = document.getElementById("contract-search");
  search.addEventListener("input", handleSearch);

  console.log("handle Multiple dropdown....");
  handleMultipleDropdown();

  const allContracts = await getContractData();
  console.log("AA", allContracts);
  if (allContracts == null || allContracts.pagenationData.length == 0) {
    const addBtn = document.getElementById("add-button");
    const div = noDataAdded("Contracts", addBtn);
    const homeRoot = document.getElementsByClassName("container")[0];
    homeRoot.innerHTML = "";
    homeRoot.appendChild(div);
  } else {
    createContractTable(allContracts.pagenationData);
  }
}

const handleSearch = async (e) => {
  const value = e.target.value;
  if (value.length === 0) {
    const allContracts = await getContractData();
    if (allContracts == null || allContracts.pagenationData.length == 0) {
      const contactTable = document.getElementsByClassName("contract-table")[0];
      contactTable.innerHTML = `<h4>No Result Found for "${value}"`;
    } else {
      const contracts = allContracts.pagenationData;
      createContractTable(contracts);
    }
  }
  if (value.length >= 2) {
    const contractsData = await searchContract(value, 0, 10);

    if (
      contractsData.data == null ||
      contractsData.data.pagenationData.length == 0
    ) {
      // showEmptyPage();
      const contactTable = document.getElementsByClassName("contract-table")[0];
      contactTable.innerHTML = `<h4>No Result Found for "${value}"`;
    } else {
      const contracts = contractsData.data.pagenationData;
      console.log(contracts);
      createContractTable(contracts);
    }
  }
};

export const handleFileDownload = async (fileName) => {
  console.log("downloading... ", fileName);

  try {
    const binaryData = await downloadContract(fileName);

    const blobUrl = window.URL.createObjectURL(binaryData);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = blobUrl;
    a.download = fileName;

    document.body.appendChild(a);
    a.click();

    window.URL.revokeObjectURL(blobUrl);
    document.body.removeChild(a);
  } catch (error) {
    console.log(error);
  }
};

const createContractTable = async (contracts) => {
  console.log(contracts);
  const contactTable = document.getElementsByClassName("contract-table")[0];
  contactTable.innerHTML = "";

  const table = createTableHeader([
    "Vendor Name",
    "Person Name",
    "Category",
    "Email",
    "Amount",
    "Start Date",
    "End Date",
    "Payment Mode",
    "Status",
    "Contract Document",
  ]);

  contactTable.appendChild(table);

  // console.log(",,,", contracts);

  contracts.map((contract) => {
    const row = document.createElement("tr");

    let div = document.createElement("td");
    div.innerHTML = contract.organizationName;
    row.appendChild(div);

    div = document.createElement("td");
    div.innerHTML = contract.contactPersonName;
    row.appendChild(div);

    div = document.createElement("td");
    div.innerHTML = contract.categoryName;
    row.appendChild(div);

    div = document.createElement("td");
    div.innerHTML = contract.contactPersonEmail;
    row.appendChild(div);

    div = document.createElement("td");
    div.innerHTML = contract.amount;
    row.appendChild(div);

    div = document.createElement("td");
    div.innerHTML = contract.startDate;
    row.appendChild(div);

    div = document.createElement("td");
    div.innerHTML = contract.endDate;
    row.appendChild(div);

    div = document.createElement("td");
    div.innerHTML = contract.paymentMode;
    row.appendChild(div);

    div = document.createElement("td");
    div.innerHTML = contract.status;
    row.appendChild(div);

    div = document.createElement("td");
    div.addEventListener("click", () => handleFileDownload(contract.fileName));

    const imageUrl = "/68688e7f23a16971620c.png"; // TEMP
    div.innerHTML = `<img class="height-20" src=${imageUrl} />`;
    row.appendChild(div);

    table.appendChild(row);
  });
};
