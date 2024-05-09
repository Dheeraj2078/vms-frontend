import { getCurrentUserToken, makeRequest } from "../util/util.js";
import { httpMethods, apiUrl, apiUrlLocal } from "../util/constants.js";

const baseUrl = apiUrlLocal;

export const getAdmins = async (cursor, size, next, filter) => {
  const token = getCurrentUserToken();

  const url = filter
    ? `/user/get-users?cursor=${cursor}&size=${size}&next=${next}&filter=${filter}`
    : `/user/get-users?cursor=${cursor}&size=${size}&next=${next}`;

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const response = await makeRequest(baseUrl + url, httpMethods.GET, headers);

  return response;
};
