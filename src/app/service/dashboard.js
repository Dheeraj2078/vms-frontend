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
    `${apiUrlLocal}/utility/save-signature`,
    httpMethods.POST,
    headers,
    body
  );
  return response;
};
