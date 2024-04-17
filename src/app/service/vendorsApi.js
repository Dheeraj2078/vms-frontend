import { makeRequest } from "../util/util.js";
import { httpMethods, apiUrl, apiUrlLocal } from "../util/constants.js";

const baseUrl = apiUrlLocal;

export const addVendor = async (vendorData) => {
  const body = vendorData;
  const headers = {
    "Content-Type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImRoZWVyYWoiLCJlbWFpbCI6ImRoZ3VwdGFAZXgyaW5kaWEuY29tIiwicm9sZSI6ImFkbWluIiwibmJmIjoxNzEzMTY2NDAxLCJleHAiOjE3MTM1MTIwMDEsImlhdCI6MTcxMzE2NjQwMSwiaXNzIjoiVGVzdElzc3VlciIsImF1ZCI6IlRlc3RBdWRpZW5jZSJ9.MsaVHPUUl0Z2cXCVimncZ6Blib4KIh6BGTkAGajFjUg",
  };
  const response = await makeRequest(
    baseUrl + "/vendor/create-vendor",
    httpMethods.POST,
    headers,
    body
  );

  return response;
};

export const getVendorFormDropdown = async () => {
  const headers = {
    "Content-Type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IkRoZWVyYWoiLCJlbWFpbCI6ImRoZ3VwdGFAZXgyaW5kaWEuY29tIiwicm9sZSI6ImFkbWluIiwibmJmIjoxNzEzMjYyMDk2LCJleHAiOjE3MTM2MDc2OTYsImlhdCI6MTcxMzI2MjA5NiwiaXNzIjoiVGVzdElzc3VlciIsImF1ZCI6IlRlc3RBdWRpZW5jZSJ9.yQaGSlDt3TGXO3VFu3yBZefhDwUH-QzX4nug_n0hb60",
  };
  const response = await makeRequest(
    baseUrl + "/vendor/get-form-creation-data",
    httpMethods.GET,
    headers
  );

  return response;
};
