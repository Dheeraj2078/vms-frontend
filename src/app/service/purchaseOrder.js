import { makeRequest, getCurrentUserToken } from "../util/util.js";
import {
  httpMethods,
  apiUrlLocal,
  apiUrl,
  currentUrl,
} from "../util/constants.js";

const baseUrl = currentUrl;
const token = getCurrentUserToken();

export const getPoFormData = async () => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const response = await makeRequest(
    baseUrl + "/purchase-order/form-details",
    httpMethods.GET,
    headers
  );

  return response;
};

export const getVendorAddress = async (id) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const response = await makeRequest(
    baseUrl + `/purchase-order/address/${id}`,
    httpMethods.GET,
    headers
  );

  return response;
};

export const getNewItemFormData = async () => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const response = await makeRequest(
    baseUrl + `/item/form-data`,
    httpMethods.GET,
    headers
  );

  return response;
};

export const getFormPreviousItems = async () => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const response = await makeRequest(
    baseUrl + `/item/get-items`,
    httpMethods.GET,
    headers
  );

  return response;
};

export const postPurchaseOrder = async (data) => {
  const body = data;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const response = await makeRequest(
    baseUrl + "/purchase-order/add-pos",
    httpMethods.POST,
    headers,
    body
  );

  return response;
};

export const sendPurchaseOrderMail = async (data) => {
  const body = data;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const response = await makeRequest(
    "https://localhost:7118" + "/purchase-order/send-purchaseorder-email",
    httpMethods.POST,
    headers,
    body
  );

  return response;
};

export const getPurchaseOrders = async (cursor, size, next, filter) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const url = filter
    ? `/purchase-order/get-pos?cursor=${cursor}&size=${size}&next=${next}&filter=${filter}`
    : `/purchase-order/get-pos?cursor=${cursor}&size=${size}&next=${next}`;
  const response = await makeRequest(baseUrl + url, httpMethods.GET, headers);

  return response;
};

export const postItem = async (data) => {
  const body = data;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const response = await makeRequest(
    baseUrl + "/item/create-item",
    httpMethods.POST,
    headers,
    body
  );

  return response;
};
