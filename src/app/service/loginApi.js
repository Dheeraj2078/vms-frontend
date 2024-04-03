import { makeRequest } from "../util/util.js";
import { httpMethods, apiUrl, headers } from "../util/constants.js";

const baseUrl = apiUrl;

export const login = async (loginData) => {
  try {
    const body = loginData;
    const headers = { "Content-Type": "application/json" };
    const response = makeRequest(
      baseUrl + "/user/login",
      httpMethods.POST,
      headers,
      body
    );

    console.log("resp", response);
    return response;
  } catch (error) {
    console.log(error);
    throw Error;
  }
};

// create user
export const createUser = async (userData) => {
  try {
    const token = localStorage.getItem("token");
    if (token == null) {
      window.location.href = "./login.html";
    }

    const body = userData;
    const headers = {
      "Content-Type": headers.contentTypeJSON,
      Authorization: `Bearer ${token}`,
    };
    const response = makeRequest(
      baseUrl + "/user/create-user",
      httpMethods.POST,
      headers,
      body
    );
    console.log("resp", response);
    return response;
  } catch (error) {
    console.log(error);
    throw Error;
  }
};

export const validateNewuserToken = async (userToken) => {
  try {
    const encodedToken = encodeURIComponent(userToken);
    const headers = {
      "Content-Type": "application/json",
    };
    const response = makeRequest(
      baseUrl + `/user/validate-newuser-token/${encodedToken}`,
      httpMethods.GET,
      headers
    );

    console.log("token resp", response);

    return response;
  } catch (error) {
    console.log(error);
    throw Error;
  }
};

export const updatePassword = async (userToken, loginData) => {
  console.log("update password", userToken);
  try {
    console.log(userToken);
    const encodedToken = encodeURIComponent(userToken);
    console.log("encoded:", encodedToken);

    const body = loginData;
    const headers = {
      "Content-Type": "application/json",
    };
    const response = makeRequest(
      baseUrl + `/user/update-password/${encodedToken}`,
      httpMethods.POST,
      headers,
      body
    );
    console.log(response);
  } catch (error) {
    console.log(error);
    throw Error;
  }
};

export const forgotPassword = async (forgotPasswordData) => {
  try {
    const body = forgotPasswordData;
    const headers = {
      "Content-Type": "application/json",
    };
    const response = await makeRequest(
      baseUrl + `/user/forget-password/`,
      httpMethods.POST,
      headers,
      body
    );

    const resu = response;
    console.log("RES", resu);
  } catch (error) {
    console.log("ERR", error);
    throw Error;
  }
};
