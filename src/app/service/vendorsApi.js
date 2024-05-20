import { makeRequest, getCurrentUserToken } from "../util/util.js";
import {
  httpMethods,
  apiUrlLocal,
  apiUrl,
  currentUrl,
} from "../util/constants.js";

const baseUrl = currentUrl;
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

export const getAllVendors = async (cursor, size, next, filter) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const url = filter
    ? `/vendor/get-vendors?cursor=${cursor}&size=${size}&next=${next}&filter=${filter}`
    : `/vendor/get-vendors?cursor=${cursor}&size=${size}&next=${next}`;
  const response = await makeRequest(
    `${baseUrl}${url}`,
    httpMethods.GET,
    headers
  );
  console.log("SAHIL", response);
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

export const getVendorStats = async () => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const response = await fetch(baseUrl + `/utility/get-count/vendor`, {
    method: httpMethods.GET,
    headers: headers,
  });

  const res = await response.json();
  return res;
};
