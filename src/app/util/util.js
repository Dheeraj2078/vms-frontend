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

export function validateToken() {
  const token = localStorage.getItem("token");
  if (token == null) return false;

  const info = decodeJwt(token);
  const { exp } = info.payload;
  if (Date.now() >= exp * 1000) {
    return false;
  } else {
    return true;
  }
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

export function fetchHtmlFile(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      callback(xhr.responseText);
    }
  };
  xhr.open("GET", url, true);
  xhr.send();
}

export function loadNavBar() {
  fetchHtmlFile("../common/navBar.html", function (htmlString) {
    const div = document.createElement("div");
    div.innerHTML = htmlString;
    const firstChild = document.body.firstChild;
    document.body.insertBefore(div, firstChild);
  });
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
