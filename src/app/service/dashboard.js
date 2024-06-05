import { makeRequest, getCurrentUserToken } from "../util/util";
import { currentUrl, httpMethods, apiUrlLocal } from "../util/constants";

const baseUrl = currentUrl;

export const saveSignature = async (signature) => {
  const token = getCurrentUserToken();
  const body = signature;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const response = await makeRequest(
    `${baseUrl}/utility/save-signature`,
    httpMethods.POST,
    headers,
    body
  );
  return response;
};

export const getDashboardData = async () => {
  const token = getCurrentUserToken();
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const response = await makeRequest(
    `${baseUrl}/utility/dashboard`,
    httpMethods.GET,
    headers
  );
  return response;
};
