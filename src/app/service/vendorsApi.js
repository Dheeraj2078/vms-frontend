import { makeRequest, getCurrentUserToken } from "../util/util.js";
import { httpMethods, apiUrlLocal, apiUrl } from "../util/constants.js";

const baseUrl = apiUrl;
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

export const updateVendor = async (id, vendorData) => {
  const body = vendorData;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const response = await makeRequest(
    `${baseUrl}/vendor/update-vendor/${id}`,
    httpMethods.PATCH,
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

export const getAllVendors = async () => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const response = await makeRequest(
    `${baseUrl}/vendor/get-vendors?page=1&size=10`,
    httpMethods.GET,
    headers
  );

  return response;
};

export const getVendorsById = async (vendorId) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const response = await makeRequest(
    `${baseUrl}/vendor/get-vendor/${vendorId}`,
    httpMethods.GET,
    headers
  );

  return response;
};

export const toggleVendorStatus = async (vendorId) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const response = await makeRequest(
    `${baseUrl}/vendor/update-vendor-status/${vendorId}`,
    httpMethods.POST,
    headers
  );

  return response;
};
