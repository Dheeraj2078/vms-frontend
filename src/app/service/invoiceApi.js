import { makeRequest, getCurrentUserToken } from "../util/util.js";
import {
  httpMethods,
  apiUrlLocal,
  apiUrl,
  currentUrl,
} from "../util/constants.js";
import { successModal } from "../common/components/successModal.js";
import { handleCross } from "../ui/home/invoice/invoiceForm/invoiceForm.js";

const baseUrl = currentUrl;
const token = getCurrentUserToken();

export const addInvoice = async (formData) => {
  await fetch(baseUrl + "/invoice/create-invoice", {
    method: httpMethods.POST,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    })
    .then((data) => {
      console.log("data 1", data);

      if (data.error == null) {
        successModal("Invoice added", handleCross);
      }
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

export const getAllInvoice = async (cursor, size, next, filter) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const url = filter
    ? `/invoice/get-invoices?cursor=${cursor}&size=${size}&next=${next}&filter=${filter}`
    : `/invoice/get-invoices?cursor=${cursor}&size=${size}&next=${next}`;
  const response = await makeRequest(baseUrl + url, httpMethods.GET, headers);

  return response;
};

export const getInvoiceStats = async () => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const response = await fetch(baseUrl + `/utility/get-count/invoice`, {
    method: httpMethods.GET,
    headers: headers,
  });

  const res = await response.json();
  return res;
};

// SALES INVOICE
export const getSalesInvoiceFormData = async () => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const response = await makeRequest(
    apiUrlLocal + "/sales-invoice/form-details",
    httpMethods.GET,
    headers
  );

  return response;
};

export const postSalesInvoice = async (data) => {
  const body = data;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const response = await makeRequest(
    apiUrlLocal + "/sales-invoice/add-invoices",
    httpMethods.POST,
    headers,
    body
  );

  return response;
};

export const sendSalesInvoiceMail = async (data) => {
  const body = data;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const response = await makeRequest(
    apiUrlLocal + "/sales-invoice/send-email",
    httpMethods.POST,
    headers,
    body
  );

  return response;
};
