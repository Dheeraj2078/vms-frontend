import { getCurrentUserToken, makeRequest } from "../util/util.js";
import {
  httpMethods,
  apiUrl,
  apiUrlLocal,
  currentUrl,
} from "../util/constants.js";

const baseUrl = currentUrl;
const token = getCurrentUserToken();

export const getAllCategories = async (cursor, size, next, filter) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const url = !filter
    ? `/category/get-categories?cursor=${cursor}&size=${size}&next=${next}`
    : `/category/get-categories?cursor=${cursor}&size=${size}&next=${next}&filter=${filter}`;
  const response = await makeRequest(baseUrl + url, httpMethods.GET, headers);

  return response;
};

export const postCategory = async (categoryData) => {
  const body = categoryData;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const response = await makeRequest(
    baseUrl + "/category/create-category",
    httpMethods.POST,
    headers,
    body
  );

  return response;
};

export const deleteCategoryById = async (id) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const response = await makeRequest(
    `${baseUrl}/category/delete/${id}`,
    httpMethods.DELETE,
    headers
  );

  return response;
};
