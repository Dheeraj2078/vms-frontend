import { makeRequest, getCurrentUserToken } from "../util/util.js";
import {
  httpMethods,
  apiUrlLocal,
  apiUrl,
  currentUrl,
} from "../util/constants.js";
import { successModal } from "../common/components/successModal.js";
import { handleCross } from "../ui/home/contract/contractForm/contractForm.js";

const baseUrl = currentUrl;
const token = getCurrentUserToken();

// Search Admins on the basis of name and email
export const searchUser = async (filter) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const response = await makeRequest(
    baseUrl + `/user/search?filter=${filter}`,
    httpMethods.GET,
    headers
  );
  return response;
};

// Search Categories
export const searchCategories = async (filter) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const response = await makeRequest(
    baseUrl + `/category/search?filter=${filter}`,
    httpMethods.GET,
    headers
  );
  return response;
};

// Search Invoices
export const searchInvoices = async (filter) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const response = await makeRequest(
    baseUrl + `/invoice/get-invoices/${filter}`,
    httpMethods.GET,
    headers
  );
  return response;
};

export const searchVendors = async (filter) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const response = await makeRequest(
    baseUrl + `/vendor/get-vendors/${filter}`,
    httpMethods.GET,
    headers
  );
  return response;
};
