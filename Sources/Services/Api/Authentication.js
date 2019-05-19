import Api from "../Api/Api";
import Network from "./Network";
import { UserToken } from "@Models";
import { UserTokenActions, getStore, UserProfileActions } from "@ReduxManager";

/**
 * @returns {Promise<boolean>}
 */
function logout() {
  return new Promise((resolve, reject) => {
    UserTokenActions.deleteUserToken();
    resolve(true);
  });
}

/**
 * @param {string} email
 * @param {string} password
 * @returns {Promise<boolean>}
 */
function loginAndCreateSession(email, password) {
  return new Promise((resolve, reject) => {
    Api.login(email, password)
      .then(response => {
        /**
         * @type {UserToken}
         */
        const { access_token } = response;
        Network.setToken(access_token);
        UserTokenActions.saveUserToken(response);
        const promises = Promise.all([Api.getUserProfile()]);

        return promises;
      })
      .then(values => {
        const [userProfile] = values;

        UserProfileActions.saveUserProfile(userProfile);

        resolve(true);
      })
      .catch(error => {
        reject(error);
      });
  });
}

/**
 * @returns {Promise<boolean>}
 */
function createSession() {
  return new Promise((resolve, reject) => {
    const store = getStore();
    const { userToken } = store.getState();
    if (userToken) {
      /**
       * @type {UserToken}
       */
      const { access_token } = userToken;
      Network.setToken(access_token);

      Promise.all([Api.getProfile()])
        .then(values => {
          const [userProfile] = values;
          UserProfileActions.saveUserProfile(userProfile);
          resolve(true);
        })
        .catch(error => {
          reject(error);
        });
    } else {
      reject("User not logged");
    }
  });
}

export default {
  logout,
  loginAndCreateSession,
  createSession
};
