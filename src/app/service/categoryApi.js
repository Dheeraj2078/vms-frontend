import { makeRequest } from "../util/util.js";
import { httpMethods, apiUrl, apiUrlLocal } from "../util/constants.js";

const baseUrl = apiUrlLocal;

export const getAllCategories = async () => {
  const headers = {
    "Content-Type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImRoZWVyYWoiLCJlbWFpbCI6ImRoZ3VwdGFAZXgyaW5kaWEuY29tIiwicm9sZSI6ImFkbWluIiwibmJmIjoxNzEzMTY2NDAxLCJleHAiOjE3MTM1MTIwMDEsImlhdCI6MTcxMzE2NjQwMSwiaXNzIjoiVGVzdElzc3VlciIsImF1ZCI6IlRlc3RBdWRpZW5jZSJ9.MsaVHPUUl0Z2cXCVimncZ6Blib4KIh6BGTkAGajFjUg",
  };
  const response = await makeRequest(
    baseUrl + "/category/get-all-categories",
    httpMethods.GET,
    headers
  );

  return response;
};
