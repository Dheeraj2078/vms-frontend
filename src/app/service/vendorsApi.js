import { makeRequest, getCurrentUserToken } from "../util/util.js";
import { httpMethods, apiUrl, apiUrlLocal } from "../util/constants.js";

const baseUrl = apiUrlLocal;
const token = getCurrentUserToken();

export const addVendor = async (vendorData) => {
  const body = vendorData;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const response = await makeRequest(
    baseUrl + "/vendor/create-vendor",
    httpMethods.POST,
    headers,
    body
  );

  return response;
};

export const getVendorFormDropdown = async () => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const response = await makeRequest(
    baseUrl + "/vendor/get-form-creation-data",
    httpMethods.GET,
    headers
  );

  return response;
};
