import { makeRequest, getCurrentUserToken } from "../util/util.js";
import { httpMethods, apiUrlLocal, apiUrl } from "../util/constants.js";

const baseUrl = apiUrlLocal;
const token = getCurrentUserToken();

export const getPurchaseOrderFormData = async () => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const response = await makeRequest(
    baseUrl + "/form-details",
    httpMethods.GET,
    headers
  );

  return response;
};
