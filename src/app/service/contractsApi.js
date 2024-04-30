import { makeRequest, getCurrentUserToken } from "../util/util.js";
import { httpMethods, apiUrlLocal, apiUrl } from "../util/constants.js";
import { successModal } from "../common/components/successModal.js";
import { handleCross } from "../ui/home/contract/contractForm/contractForm.js";

const baseUrl = apiUrlLocal;
const token = getCurrentUserToken();

// export const addContract = async (vendorData) => {
//   const body = vendorData;

//   const boundary = `-----${Date.now().toString(16)}`;

//   const headers = {
//     "Content-Type": `multipart/form-data; boundary=${boundary}`,
//     // "Content-Type": "multipart/form-data; boundary=abcdef",
//     Authorization: `Bearer ${token}`,
//   };
//   const response = await makeRequest(
//     baseUrl + "/contracts/add-contract",
//     httpMethods.POST,
//     headers,
//     body
//   );

//   return response;
// };

export const addContract = async (formData) => {
  await fetch(baseUrl + "/contracts/add-contract", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    })
    .then((data) => {
      console.log("data 1", data);

      if (data.error == null) {
        successModal("Contract Added", handleCross);
      }
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

export const getAllContracts = async (lastId, pageSize) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const response = await makeRequest(
    baseUrl + `/contracts/get-contracts?lastId=${lastId}&pageSize=${pageSize}`,
    httpMethods.GET,
    headers
  );

  return response;
};

export const downloadContract = async (fileName) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const response = await fetch(
    baseUrl + `/contracts/download?fileName=${fileName}`,
    {
      method: httpMethods.GET,
      headers: headers,
    }
  );

  const res = await response.blob();
  return res;
};

export const getContractFormData = async () => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const response = await makeRequest(
    baseUrl + "/contracts/form/getdata",
    httpMethods.GET,
    headers
  );

  return response;
};

export const getContractCategory = async (id) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const response = await makeRequest(
    baseUrl + `/contracts/form/categories/${id}`,
    httpMethods.GET,
    headers
  );

  return response;
};

export const addContracts = async (postContractData) => {
  const body = postContractData;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const response = await makeRequest(
    baseUrl + `/contracts/add-contract`,
    httpMethods.POST,
    headers,
    body
  );

  return response;
};

export const searchContract = async (filter, lastId, pageSize) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const response = await makeRequest(
    baseUrl +
      `/contracts/search?filter=${filter}&lastId=${lastId}&pageSize=${pageSize}`,
    httpMethods.GET,
    headers
  );
  return response;
};
