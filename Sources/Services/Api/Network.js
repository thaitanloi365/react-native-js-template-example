import axios from "axios";

const BASE_URL = "http://cms.jelly.city";

/**
 * @typedef {"POST" | "GET" | "PUT" | "DELETE" | "PATCH"} RequestMethod
 */

class Network {
  static instance = new Network();
  _token = "";
  constructor() {
    if (Network.instance) {
      throw new Error("Error: Instantiation failed: Use Network.getInstance() instead of new.");
    }
    Network.instance = this;
  }
  static getInstance() {
    return Network.instance;
  }

  getBaseUrl() {
    return BASE_URL;
  }

  /**
   * @param {string} token
   */
  setToken(token) {
    this.token = token;
  }

  getToken() {
    return this.token;
  }

  /**
   * @param {string} url
   * @param {RequestMethod} method
   * @param {object} [data]
   * @param {object} [header]
   * @param {object} [params]
   * * @template T
   */
  unAuthorizedRequest(url, method = "GET", data, params, header) {
    /**
     * @type {import("axios").AxiosPromise<T>}
     */
    const response = axios({
      method: method,
      url: url,
      baseURL: BASE_URL,
      data: data,
      timeout: 60000,
      params: params,
      headers: {
        ...header,
        "Content-Type": "application/json"
      }
    });
    return response;
  }

  /**
   * @param {string} url
   * @param {RequestMethod} method
   * @param {object} [data]
   * @param {object} [header]
   * @param {object} [params]
   * @template T
   */
  authorizedRequest(url, method = "GET", data, params, header) {
    /**
     * @type {import("axios").AxiosPromise<T>}
     */
    const response = axios({
      method: method,
      url: url,
      baseURL: BASE_URL,
      data: data,
      timeout: 60000,
      params,
      headers: {
        ...header,
        "Content-Type": "application/json",
        access_token: this.token
      }
    });
    return response;
  }
}

const ErrorCodeMaps = {
  200: "Success",
  404: "Page not found",
  422: "Invalid request",
  500: "Internal errror"
};

function getError(errorCode, fallback = "Unknown Error") {
  let _fallback = "Unknown Error";
  if (fallback && fallback !== "") {
    _fallback = fallback;
  }

  const errorMessage = ErrorCodeMaps[errorCode] || _fallback;

  return {
    errorCode,
    errorMessage
  };
}

axios.interceptors.request.use(
  function(config) {
    if (__DEV__) {
      const { url, method, data, params, baseURL } = config;
      const message = `👉👉👉
Request Info: ${baseURL}${url}
  - Method : ${method}
  - Data   : ${JSON.stringify(data)}
  - Params : ${params}

  `;
      console.log(message);
    }

    return config;
  },
  function(error) {
    if (__DEV__) {
      console.log("❌❌❌ Request Error: ", error);
    }
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function(response) {
    if (__DEV__) {
      const { data: responseData, config } = response;
      const { url, method, data, params } = config;
      const message = `👉👉👉
Response info: ${url}
  - Method : ${method}
  - Data   : ${JSON.stringify(responseData)}
  - Params : ${params}
  - Response Data: ${data}
  `;
      console.log(message);
    }

    return response.data;
  },
  function(error) {
    if (__DEV__) {
      console.log("❌❌❌ Response error: ", error.response);
    }
    let status = -1;
    let message = "";

    if (error.response) {
      status = error.response.status || -1;
      message = error.response.statusText || "";

      if (error.response.data) {
        const { message: errorMessage, status: errorCode } = error.response.data;
        const errorObject = getError(errorCode, errorMessage);

        status = errorObject.errorCode;
        message = errorObject.errorMessage;
      }
    }
    const detailMessage = `Error ${status}: ${message}`;
    return Promise.reject({ code: status, message: detailMessage });
  }
);

export default Network.getInstance();
