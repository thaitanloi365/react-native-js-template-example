import Network from "./Network";

/**
 * @param {string} email
 * @param {string} password
 * @returns {Promise<T>}
 * @template T
 */
function login(email, password) {
  const body = { email, password };
  return new Promise((resolve, reject) => {
    Network.unAuthorizedRequest("/app/api/login", "POST", body)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
}

/**
 * @returns {Promise<T>}
 * @template T
 */
function getUserProfile() {
  return new Promise((resolve, reject) => {
    /**
     * @template T
     */
    Network.authorizedRequest("/app/api/login", "GET")
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export default {
  login,
  getUserProfile
};
