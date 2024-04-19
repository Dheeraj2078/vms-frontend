import { getCurrentUserToken, makeRequest } from "../util/util.js";
import { httpMethods, apiUrl, apiUrlLocal } from "../util/constants.js";

const baseUrl = apiUrl;
const token = getCurrentUserToken();

export const getAllCategories = async () => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const response = await makeRequest(
    baseUrl + "/category/get-all-categories",
    httpMethods.GET,
    headers
  );

  return response;
};
