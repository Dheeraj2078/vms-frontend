export const baseUrl = "http://vms.exitest.com/";

export const baseUrlLogin = baseUrl + "dist";

export const apiUrl = "http://vms-api.exitest.com";
export const apiUrlAzure = "https://vms-be-api.azurewebsites.net";
export const apiUrlLocal = "https://localhost:7118";
export const currentUrl = apiUrlAzure;

export const httpMethods = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
  PATCH: "PATCH",
};

export const localStorageKeys = {
  token: "token",
  unique_name: "unique_name",
  role: "role",
  email: "email",
  rememberMe: "rememberMe",
};

export const role = {
  superadmin: "superadmin",
  admin: "admin",
};

export const headers = {
  contentTypeJSON: "application/json",
  authorization: "Bearer auth-token",
};

export const redirectUrl = baseUrl + "changePassword.html#/";
