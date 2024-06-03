import { getCurrentUserToken, makeRequest } from "../util/util.js";
import {
  httpMethods,
  apiUrl,
  apiUrlLocal,
  currentUrl,
} from "../util/constants.js";

const baseUrl = apiUrlLocal;
const token = getCurrentUserToken();

export const postEvent = async (eventData) => {
  const body = eventData;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const response = await makeRequest(
    baseUrl + "/event/create-event",
    httpMethods.POST,
    headers,
    body
  );

  return response;
};

export const postExpenditure = async (expenditureData) => {
  const body = expenditureData;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const response = await makeRequest(
    baseUrl + "/expenditure/create-expenditure",
    httpMethods.POST,
    headers,
    body
  );

  return response;
};

export const getAllEvents = async (cursor, size, next, filter) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const url = filter
    ? `/event/get-events?cursor=${cursor}&size=${size}&next=${next}&filter=${filter}`
    : `/event/get-events?cursor=${cursor}&size=${size}&next=${next}`;
  const response = await makeRequest(baseUrl + url, httpMethods.GET, headers);

  return response;
};

export const getAllExpenditure = async (cursor, size, next, filter) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const url = filter
    ? `/expenditure/get-expenditures?cursor=${cursor}&size=${size}&next=${next}&filter=${filter}`
    : `/expenditure/get-expenditures?cursor=${cursor}&size=${size}&next=${next}`;
  const response = await makeRequest(baseUrl + url, httpMethods.GET, headers);

  return response;
};

export const getTopExpenditure = async (count) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const response = await makeRequest(
    baseUrl + `/expenditure/get-top-expenditures/${count}`,
    httpMethods.GET,
    headers
  );

  return response;
};
