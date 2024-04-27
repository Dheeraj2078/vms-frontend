import { makeRequest, getCurrentUserToken } from "../util/util.js";
import { httpMethods, apiUrlLocal, apiUrl } from "../util/constants.js";

const baseUrl = apiUrlLocal;
const token = getCurrentUserToken();

export const addContract = async (vendorData) => {
  const body = vendorData;

  const boundary = `-----${Date.now().toString(16)}`;

  const headers = {
    "Content-Type": `multipart/form-data; boundary=${boundary}`,
    // "Content-Type": "multipart/form-data; boundary=abcdef",
    Authorization: `Bearer ${token}`,
  };
  const response = await makeRequest(
    baseUrl + "/contracts/add-contract",
    httpMethods.POST,
    headers,
    body
  );

  return response;
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
