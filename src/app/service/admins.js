import { getCurrentUserToken, makeRequest } from "../util/util.js";
import { httpMethods, apiUrl, apiUrlLocal } from "../util/constants.js";

const baseUrl = apiUrlLocal;

export const getAdmins = async () => {
  const token = getCurrentUserToken();

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const response = await makeRequest(
    baseUrl + "/user/get-users",
    httpMethods.GET,
    headers
  );

  return response;
};
