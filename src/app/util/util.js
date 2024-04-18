import navBarHtml from "../common/navbar.html";
import { localStorageKeys } from "./constants.js";

function base64urlDecode(str) {
  str = str.replace(/-/g, "+").replace(/_/g, "/");

  while (str.length % 4 !== 0) {
    str += "=";
  }

  return atob(str);
}

/**
 * Decode the JWT token.
 * @constructor
 * @param {string} token - JWT token.
 */
export function decodeJwt(token) {
  const [headerEncoded, payloadEncoded, signature] = token.split(".");
  const header = JSON.parse(base64urlDecode(headerEncoded));
  const payload = JSON.parse(base64urlDecode(payloadEncoded));
  return { header, payload, signature };
}

export function getCurrentUserToken() {
  const token = localStorage.getItem(localStorageKeys.token);
  console.log("TOKEN", token);
  return token;
}

export function validateToken() {
  const token = getCurrentUserToken();
  if (token == null) return false;

  const info = decodeJwt(token);
  const { exp } = info.payload;
  if (Date.now() >= exp * 1000) {
    return false;
  } else {
    return true;
  }
}

export function getCurrentUserInfo() {
  const token = getCurrentUserToken();
  const info = decodeJwt(token);
  return info.payload;
}

export async function makeRequest(
  url,
  method = "GET",
  headers = { "Content-Type": "application/json" },
  body = null
) {
  try {
    console.log("makeRequest", url, method, headers, body);
    const response = await fetch(url, {
      method: method,
      headers: headers,
      body: body ? JSON.stringify(body) : null,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export function loadNavBar() {
  const div = document.createElement("div");
  div.innerHTML = navBarHtml;
  const firstChild = document.getElementById("main-container");
  firstChild.appendChild(div);
}

export function addScript(src) {
  console.log("adding ", src);
  var script = document.createElement("script");
  script.defer = true;
  script.src = src;
  script.type = "module";
  script.async = true;

  document.body.appendChild(script);
}

export function addStyles(href) {
  var link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = href;
  document.head.appendChild(link);
}
