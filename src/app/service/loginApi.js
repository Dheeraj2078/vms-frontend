import { makeRequest } from "../util/util.js";
import { httpMethods, apiUrl } from "../util/constants.js";

const baseUrl = apiUrl;

/**
 * Login the user.
 * @function
 * @param {Object} loginData - Object of email and password of user.
 */
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

    return response;
  } catch (error) {
    console.log(error);
    throw Error;
  }
};

/**
 * Validate the token before allowing user to log in
 * @function
 * @param {string} userToken - token for changing password.
 */
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

    return response;
  } catch (error) {
    console.log(error);
    throw Error;
  }
};

/**
 * Generate a link for change password.
 * @function
 * @param {Object} forgotPasswordData - Object of email of user and base redirect link.
 */
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

    return response;
  } catch (error) {
    throw Error;
  }
};

/**
 * Update the password through generated link.
 * @function
 * @param {string} userToken - token for verifying user
 * @param {Object} loginData - Object of email and updated password of user.
 */
export const updatePassword = async (userToken, loginData) => {
  try {
    const encodedToken = encodeURIComponent(userToken);

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
  } catch (error) {
    console.log(error);
    throw Error;
  }
};
